import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import RBBOOK from '../../assets/SideBook.svg';
import BorrowBOOK from '../../assets/Borrowed.svg';
import ReturnBOOK from '../../assets/Returned.svg';
import Line from '../../assets/Line.svg';
import { useTheme } from "../../context/Authorization/ThemeContext";

interface PieChartProps {
  totalBorrowedBooks: number;
  totalReturnedBooks: number;
}

const PieChart: React.FC<PieChartProps> = ({ totalBorrowedBooks, totalReturnedBooks }) => {
  const { theme } = useTheme();
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Total Borrowed Books', 'Total Returned Books'],
            datasets: [
              {
                data: [totalBorrowedBooks, totalReturnedBooks],
                backgroundColor: [theme.primaryColor, "#317FB1"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: { display: false },
            },
            layout: {
              padding: { top: 10, bottom: 10, left: 10, right: 10 },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [totalBorrowedBooks, totalReturnedBooks, theme.primaryColor]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <canvas ref={chartRef} style={{ maxWidth: "300px", maxHeight: "300px", width: "100%", height: "auto" }} />
      <div style={{ width: "400px", marginTop: "1rem", background: "#fff", borderRadius: "0.375rem", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: theme.shadow }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={RBBOOK} alt="Book Image" style={{ width: "4rem", height: "4rem", marginRight: "2rem" }} />
          <img src={Line} alt="line drawn side to Book" style={{ width: "0.03125rem", height: "5rem", marginRight: "2rem" }} />
          <div>
            <div style={{ display: "flex", alignItems: "center", color: theme.textColor }}>
              <img src={BorrowBOOK} alt="Borrow" style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }} />
              <span>Total Books Borrowed</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", color: theme.textColor }}>
              <img src={ReturnBOOK} alt="Return" style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }} />
              <span>Total Books Returned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;