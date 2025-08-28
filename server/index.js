import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/collegePortal", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "teacher", "student"], default: "student" },
  faculty: String,
  subject: String,
  batch: String,
  college: String,
});
const User = mongoose.model("User", userSchema);

// Create default admin if none exists
const createDefaultAdmin = async () => {
  const adminEmail = "admin@demo.com";
  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Default Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Default admin created: admin@demo.com / admin123");
  }
};
createDefaultAdmin();

// Assignment and Submission models
const assignmentSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  faculty: { type: String, default: "" },
  batch: { type: String, default: "" },
  subject: String,
  description: String,
  dueDate: Date,
  createdAt: { type: Date, default: Date.now },
});
const Assignment = mongoose.model("Assignment", assignmentSchema);

const submissionSchema = new mongoose.Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filePath: String,
  originalName: String,
  submittedAt: { type: Date, default: Date.now },
  grade: { type: Number, default: null },
  feedback: { type: String, default: "" },
});
const Submission = mongoose.model("Submission", submissionSchema);

// Multer for file uploads (PDF-only)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const isPdf = file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf");
    if (!isPdf) return cb(new Error("Only PDF files are allowed"));
    cb(null, true);
  },
});

// Middleware: verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

// Middleware: role check
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

// Login route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// New route: Get current authenticated user
app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
});

// Admin: create user
app.post("/api/admin/create-user", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const { name, email, password, role, faculty, subject, batch, college } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      faculty,
      subject,
      batch,
      college,
    });

    await newUser.save();
    res.json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

// Student: submit assignment file for a specific assignment
app.post(
  "/api/assignments/:assignmentId/submit",
  authenticateToken,
  upload.single("assignment"),
  async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const found = await Assignment.findById(assignmentId);
      if (!found) return res.status(404).json({ message: "Assignment not found" });

      const submission = await Submission.create({
        assignment: assignmentId,
        student: req.user.userId,
        filePath: req.file?.path,
        originalName: req.file?.originalname,
      });

      res.json({ message: "Submission saved", submission });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Teacher: list submissions for an assignment
app.get("/api/assignments/:assignmentId/submissions", authenticateToken, async (req, res) => {
  if (req.user.role !== "teacher") return res.status(403).json({ message: "Access denied" });
  const { assignmentId } = req.params;
  const subs = await Submission.find({ assignment: assignmentId })
    .populate({ path: "student", select: "name email" })
    .sort({ submittedAt: -1 });
  res.json(subs);
});

// Teacher: grade a submission
app.post("/api/submissions/:submissionId/grade", authenticateToken, async (req, res) => {
  if (req.user.role !== "teacher") return res.status(403).json({ message: "Access denied" });
  const { submissionId } = req.params;
  const { grade, feedback } = req.body || {};
  const updated = await Submission.findByIdAndUpdate(submissionId, { grade, feedback }, { new: true });
  if (!updated) return res.status(404).json({ message: "Submission not found" });
  res.json({ message: "Submission graded", submission: updated });
});

// Teacher: create assignment (for all students)
app.post("/api/assignments", authenticateToken, async (req, res) => {
  if (req.user.role !== "teacher") return res.status(403).json({ message: "Access denied" });
  const { subject, description, dueDate } = req.body;
  
  console.log("Creating assignment with:", { subject, description, dueDate });
  
  const newAssignment = await Assignment.create({
    teacher: req.user.userId,
    faculty: "", // Empty for all faculties
    batch: "", // Empty for all batches
    subject,
    description,
    dueDate,
  });
  
  console.log("Created assignment:", { 
    id: newAssignment._id, 
    subject: newAssignment.subject 
  });
  
  res.json({ message: "Assignment created", assignment: newAssignment });
});

// List assignments (teacher sees own; students see all)
app.get("/api/assignments", authenticateToken, async (req, res) => {
  const currentUser = await User.findById(req.user.userId);
  console.log("Current user:", { 
    id: currentUser._id, 
    role: currentUser.role
  });
  
  let filter = {};
  if (currentUser?.role === "teacher") {
    filter = { teacher: req.user.userId };
    console.log("Teacher filter:", filter);
  } else {
    // Students see all assignments
    filter = {};
    console.log("Student filter: all assignments");
  }
  
  const assignments = await Assignment.find(filter).sort({ dueDate: 1 });
  console.log("Found assignments:", assignments.length);
  
  const submissions = await Submission.find({ student: req.user.userId });
  const submittedMap = new Set(submissions.map((s) => String(s.assignment)));
  const withStatus = assignments.map((a) => ({
    _id: a._id,
    teacher: a.teacher,
    faculty: a.faculty,
    batch: a.batch,
    subject: a.subject,
    description: a.description,
    dueDate: a.dueDate,
    createdAt: a.createdAt,
    submitted: submittedMap.has(String(a._id)),
  }));
  res.json(withStatus);
});

// Teacher: delete assignment
app.delete("/api/assignments/:assignmentId", authenticateToken, async (req, res) => {
  if (req.user.role !== "teacher") return res.status(403).json({ message: "Access denied" });
  const { assignmentId } = req.params;
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) return res.status(404).json({ message: "Assignment not found" });
  if (String(assignment.teacher) !== String(req.user.userId)) {
    return res.status(403).json({ message: "Not your assignment" });
  }
  await Submission.deleteMany({ assignment: assignmentId });
  await Assignment.findByIdAndDelete(assignmentId);
  res.json({ message: "Assignment deleted" });
});

// Admin: delete ALL teachers and students (with related data)
app.delete("/api/admin/purge-users", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("_id");
    const students = await User.find({ role: "student" }).select("_id");
    const teacherIds = teachers.map((u) => u._id);
    const studentIds = students.map((u) => u._id);

    const assignments = await Assignment.find({ teacher: { $in: teacherIds } }).select("_id");
    const assignmentIds = assignments.map((a) => a._id);

    const delSubsByStudents = await Submission.deleteMany({ student: { $in: studentIds } });
    const delSubsByAssignments = await Submission.deleteMany({ assignment: { $in: assignmentIds } });
    const delAssignments = await Assignment.deleteMany({ teacher: { $in: teacherIds } });
    const delTeachers = await User.deleteMany({ role: "teacher" });
    const delStudents = await User.deleteMany({ role: "student" });

    res.json({
      message: "Teachers, students, and related data deleted",
      deleted: {
        teachers: delTeachers.deletedCount || 0,
        students: delStudents.deletedCount || 0,
        assignments: delAssignments.deletedCount || 0,
        submissionsByStudents: delSubsByStudents.deletedCount || 0,
        submissionsForAssignments: delSubsByAssignments.deletedCount || 0,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Purge failed", error: err.message });
  }
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const message = err?.message || "Internal server error";
  const status = err?.status || 400;
  res.status(status).json({ message });
});

// Root test
app.get("/", (req, res) => {
  res.send("🚀 College Portal Backend Running...");
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
