import React, { useState } from "react";
import "./css/FeePage.css";

const FeePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  // Sample data - in a real app, this would come from an API
  const studentInfo = {
    name: "Emily Johnson",
    id: "STU-2023-789",
    program: "Computer Science",
    semester: "Fall 2023",
  };

  const feeDetails = {
    tuition: 4500,
    libraryFee: 200,
    labFee: 350,
    sportsFee: 150,
    technologyFee: 250,
    lateFee: 0,
    discount: 300,
    total: 5150,
    paid: 3000,
    due: 2150,
    dueDate: "2023-10-15",
  };

  const paymentHistory = [
    {
      id: "PAY-001",
      date: "2023-09-15",
      amount: 1500,
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: "PAY-002",
      date: "2023-08-20",
      amount: 1500,
      method: "Bank Transfer",
      status: "Completed",
    },
    {
      id: "PAY-003",
      date: "2023-07-05",
      amount: 1000,
      method: "Debit Card",
      status: "Completed",
    },
  ];

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert("Payment processing would be implemented here");
  };

  return (
    <div className="fee-page">
      <header className="fee-header">
        <h1>Student Fee Portal</h1>
        <div className="student-info">
          <h2>{studentInfo.name}</h2>
          <p>
            ID: {studentInfo.id} | {studentInfo.program} |{" "}
            {studentInfo.semester}
          </p>
        </div>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Fee Overview
        </button>
        <button
          className={activeTab === "payment" ? "active" : ""}
          onClick={() => setActiveTab("payment")}
        >
          Make Payment
        </button>
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          Payment History
        </button>
      </nav>

      <main className="fee-content">
        {activeTab === "overview" && (
          <div className="overview">
            <div className="fee-summary">
              <h3>Fee Summary</h3>
              <div className="summary-card">
                <div className="summary-item">
                  <span>Total Fees:</span>
                  <span>Rs {feeDetails.total}</span>
                </div>
                <div className="summary-item">
                  <span>Paid Amount:</span>
                  <span>Rs {feeDetails.paid}</span>
                </div>
                <div className="summary-item highlight">
                  <span>Due Amount:</span>
                  <span>Rs {feeDetails.due}</span>
                </div>
                <div className="summary-item">
                  <span>Due Date:</span>
                  <span>{feeDetails.dueDate}</span>
                </div>
              </div>
            </div>

            <div className="fee-breakdown">
              <h3>Fee Breakdown</h3>
              <div className="breakdown-list">
                <div className="breakdown-item">
                  <span>Tuition Fee</span>
                  <span>Rs {feeDetails.tuition}</span>
                </div>
                <div className="breakdown-item">
                  <span>Library Fee</span>
                  <span>Rs {feeDetails.libraryFee}</span>
                </div>
                <div className="breakdown-item">
                  <span>Lab Fee</span>
                  <span>Rs {feeDetails.labFee}</span>
                </div>
                <div className="breakdown-item">
                  <span>Sports Fee</span>
                  <span>Rs {feeDetails.sportsFee}</span>
                </div>
                <div className="breakdown-item">
                  <span>Technology Fee</span>
                  <span>Rs {feeDetails.technologyFee}</span>
                </div>
                <div className="breakdown-item">
                  <span>Late Fee</span>
                  <span>Rs {feeDetails.lateFee}</span>
                </div>
                <div className="breakdown-item discount">
                  <span>Discount</span>
                  <span>-Rs {feeDetails.discount}</span>
                </div>
                <div className="breakdown-item total">
                  <span>Total</span>
                  <span>Rs {feeDetails.total}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="payment">
            <h3>Make a Payment</h3>
            <div className="payment-card">
              <div className="payment-due">
                <h4>Amount Due: Rs {feeDetails.due}</h4>
                <p>Due by: {feeDetails.dueDate}</p>
              </div>

              <form onSubmit={handlePaymentSubmit} className="payment-form">
                <div className="form-group">
                  <label>Payment Amount (Rs)</label>
                  <input
                    type="number"
                    min="1"
                    max={feeDetails.due}
                    defaultValue={feeDetails.due}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Payment Method</label>
                  <div className="payment-methods">
                    <label
                      className={
                        paymentMethod === "creditCard" ? "selected" : ""
                      }
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        checked={paymentMethod === "creditCard"}
                        onChange={() => setPaymentMethod("creditCard")}
                      />
                      <i className="fas fa-credit-card"></i>
                      Credit Card
                    </label>
                    <label
                      className={
                        paymentMethod === "debitCard" ? "selected" : ""
                      }
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="debitCard"
                        checked={paymentMethod === "debitCard"}
                        onChange={() => setPaymentMethod("debitCard")}
                      />
                      <i className="fas fa-credit-card"></i>
                      Debit Card
                    </label>
                    <label
                      className={
                        paymentMethod === "bankTransfer" ? "selected" : ""
                      }
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bankTransfer"
                        checked={paymentMethod === "bankTransfer"}
                        onChange={() => setPaymentMethod("bankTransfer")}
                      />
                      <i className="fas fa-university"></i>
                      Bank Transfer
                    </label>
                  </div>
                </div>

                {paymentMethod.includes("Card") && (
                  <>
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" required />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input type="text" placeholder="John Doe" required />
                    </div>
                  </>
                )}

                {paymentMethod === "bankTransfer" && (
                  <div className="bank-details">
                    <p>Please transfer the amount to the following account:</p>
                    <div className="bank-info">
                      <p>
                        <strong>Bank Name:</strong> University Federal Bank
                      </p>
                      <p>
                        <strong>Account Number:</strong> 1234567890
                      </p>
                      <p>
                        <strong>Routing Number:</strong> 021000021
                      </p>
                      <p>
                        <strong>Reference:</strong> Student ID -{" "}
                        {studentInfo.id}
                      </p>
                    </div>
                  </div>
                )}

                <button type="submit" className="pay-now-btn">
                  Pay Now
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="history">
            <h3>Payment History</h3>
            <div className="history-table">
              <div className="table-header">
                <span>Payment ID</span>
                <span>Date</span>
                <span>Amount</span>
                <span>Method</span>
                <span>Status</span>
              </div>
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="table-row">
                  <span>{payment.id}</span>
                  <span>{payment.date}</span>
                  <span>${payment.amount}</span>
                  <span>{payment.method}</span>
                  <span className={`status ${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="fee-footer">
        <p>
          Need help? Contact the Bursar's Office at Prime@university.edu or
          (555) 123-4567
        </p>
      </footer>
    </div>
  );
};

export default FeePage;
