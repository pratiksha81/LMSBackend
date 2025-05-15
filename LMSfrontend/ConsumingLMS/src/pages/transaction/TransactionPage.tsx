// src/pages/transaction/TransactionPage.tsx
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/TransactionHead.svg";
import { Transaction } from "../../types/transaction/Transaction";
import { fetchTransactions } from "../../services/transaction/TransactionService";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import { useTheme } from "../../context/Authorization/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authorization/AuthContext";
import { useReactToPrint } from "react-to-print";
import receipt from "../../assets/Kalobook.svg";

const TransactionPage: React.FC = () => {
  const { theme } = useTheme();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tokens } = useAuth();
  const navigate = useNavigate();

  // To print in PDF
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: selectedTransaction ? `Transaction_${selectedTransaction.transactionId}` : "Transaction",
    onAfterPrint: () => setSelectedTransaction(null),
  });

  useEffect(() => {
    if (!tokens) {
      navigate("/login");
    } else {
      loadTransactions();
    }
  }, [tokens, navigate]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const transactionData = await fetchTransactions();
      setTransactions(transactionData);
      toast.success("Transactions loaded successfully!");
    } catch (err) {
      setError("Failed to fetch transactions.");
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

 

  // To handle print
  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setTimeout(() => {
      if (contentRef.current) {
        handlePrint();
      }
    }, 100); // Small delay to ensure component renders
  };

  // Printable component
  const PrintableTransaction = ({ transaction }: { transaction: Transaction }) => (
    <>
      {/* Embedded print-specific styles */}
      <style>
        {`
          @media print {
            .printable-receipt {
              box-shadow: none !important;
              margin: 0 !important;
              padding: 20px !important;
              max-width: 100% !important;
              border: none !important;
            }
            .printable-receipt .border {
              background: #ffffff !important;
              border: 1px solid #000000 !important;
            }
            .printable-receipt h2,
            .printable-receipt h3,
            .printable-receipt strong,
            .printable-receipt span,
            .printable-receipt p {
              color: #000000 !important;
            }
            .printable-receipt .border-b {
              border-bottom: 1px solid #000000 !important;
            }
            body {
              background: #ffffff !important;
            }
          }
        `}
      </style>

      <div
        ref={contentRef}
        className="printable-receipt p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg print:shadow-none print:p-5 print:max-w-full print:border-none"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6 border-b-2 border-gray-200 pb-4 print:border-b print:border-black">
          <img src={receipt} alt="LMS Logo" className="h-20 w-20 mb-2" />
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 print:text-black">HSMSS Library</h2>
            <h3 className="text-xl font-semibold text-gray-600 mt-2 print:text-black">Book Issuing Receipt</h3>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 print:bg-white print:border-black">
          <div className="space-y-3">
            <div className="flex items-center">
              <strong className="text-gray-700 w-40 font-semibold print:text-black">Transaction ID:</strong>
              <span className="text-gray-900 print:text-black">{transaction.transactionId}</span>
            </div>
            <div className="flex items-center">
              <strong className="text-gray-700 w-40 font-semibold print:text-black">Student Name:</strong>
              <span className="text-gray-900 print:text-black">{transaction.studentName}</span>
            </div>
            {/* <div className="flex items-center">
              <strong className="text-gray-700 w-40 font-semibold print:text-black">User ID:</strong>
              <span className="text-gray-900 print:text-black">{transaction.userId}</span>
            </div> */}
            <div className="flex items-center">
              <strong className="text-gray-700 w-40 font-semibold print:text-black">Librarian:</strong>
              <span className="text-gray-900 print:text-black">{transaction.username}</span>
            </div>
            <div className="flex items-center">
              <strong className="text-gray-700 w-40 font-semibold print:text-black">Book Title:</strong>
              <span className="text-gray-900 print:text-black">{transaction.bookTitle}</span>
            </div>
            <div className="flex items-center">
              <strong className="text-gray-700 w-40 font-semibold print:text-black">Type:</strong>
              <span className="text-gray-900 print:text-black">{transaction.transactionType}</span>
            </div>
            <div className="flex items-center">
              <strong className="text-gray-700 w-40 font-semibold print:text-black">Date:</strong>
              <span className="text-gray-900 print:text-black">{new Date(transaction.date).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-12">
          {/* Librarian Signature (Right Side, Above Centered Messages) */}
          <div className="flex justify-end mb-10">
            <div className="flex flex-col items-end">
              <div className="w-64 border-t-2 border-gray-400 pt-1 print:border-black">
                <p className="text-sm text-gray-600 font-semibold print:text-black">Librarian Signature</p>
              </div>
            </div>
          </div>

          {/* Centered Messages */}
          <div className="text-center">
            <p className="text-sm text-gray-500 print:text-black">Printed on: {new Date().toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2 print:text-black">Thank you for using HSMSS Library Services!</p>
            <p className="text-xs text-gray-500 mt-1 print:text-black">Authorized by HSMSS Library</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ marginLeft: "222px", width: "100%" }}>
        <div
          style={{
            height: "65px",
            background: theme.cardBackground,
            boxShadow: theme.shadow,
            display: "flex",
            alignItems: "center",
            padding: "0 1.25rem",
          }}
        >
          <img src={logo} alt="Logo" style={{ width: "2rem", height: "2rem", marginRight: "0.5rem" }} />
          <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: theme.textColor }}>Transaction Details</h2>
        </div>
        <div
          style={{
            background: theme.background,
            padding: "1.25rem",
            height: "calc(100vh - 65px)",
            overflowY: "auto",
          }}
        >
          {error && (
            <div style={{ background: "#fee2e2", color: "#b91c1c", padding: "0.75rem", marginBottom: "1rem" }}>
              {error}
            </div>
          )}
          {loading ? (
            <div style={{ textAlign: "center", color: theme.textColor }}>Loading...</div>
          ) : (
            <div style={{ background: theme.cardBackground, padding: "1.5rem", borderRadius: "0.5rem", boxShadow: theme.shadow }}>
              <h3 style={{ fontWeight: "600", fontSize: "1.125rem", color: theme.textColor, marginBottom: "0.75rem" }}>
                Transaction List
              </h3>
              <div className="overflow-x-auto">
                <table style={{ width: "100%", background: "#fff", borderRadius: "0.5rem", boxShadow: theme.shadow }}>
                  <thead style={{ background: theme.tableHeaderBg, color: theme.buttonTextColor }}>
                    <tr>
                      <th style={{ padding: "0.75rem", textAlign: "center" }}>Transaction ID</th>
                      <th style={{ padding: "0.75rem", textAlign: "center" }}>Student ID</th>
                      <th style={{ padding: "0.75rem", textAlign: "center" }}>Student Name</th>
                      <th style={{ padding: "0.75rem", textAlign: "center" }}>User ID</th>
                      <th style={{ padding: "0.75rem", textAlign: "center" }}>Username</th>
                      <th style={{ padding: "0.75rem", textAlign: "center" }}>Book ID</th>
                      <th style={{ padding: "0.75rem", textAlign: "center" }}>Book Title</th>
                      <th style={{ padding: "0.75rem", textAlign: "center" }}>Type</th>
                      <th style={{ padding: "0.75rem", textAlign: "center" }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((txn) => (
                        <tr
                          key={txn.transactionId}
                          style={{ borderBottom: "1px solid #e5e7eb" }}
                          className="last:border-none hover:bg-[var(--tableRowHover)] cursor-pointer"
                          onClick={() => handleTransactionClick(txn)}
                        >
                          <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{txn.transactionId}</td>
                          <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{txn.studentId}</td>
                          <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{txn.studentName}</td>
                          <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{txn.userId}</td>
                          <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{txn.username}</td>
                          <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{txn.bookId}</td>
                          <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{txn.bookTitle}</td>
                          <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>{txn.transactionType}</td>
                          <td style={{ padding: "0.75rem", textAlign: "center", color: theme.textColor }}>
                            {new Date(txn.date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} style={{ textAlign: "center", padding: "1.25rem", color: "#6b7280" }}>
                          No transactions available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedTransaction && (
        <div style={{ display: "none" }}>
          <PrintableTransaction transaction={selectedTransaction} />
        </div>
      )}
    </div>
  );
};

export default TransactionPage;