// DashBoardPage.tsx
import DashboardHeader from "../../components/dashboard/DashBoardHeader";
import OverdueBorrowers from "../../components/dashboard/OverdueBorrowers";
import PieChart from "../../components/dashboard/PieChart";
import StatsCard from "../../components/dashboard/StatsCard";
import TotalBooksCount from "../../assets/TotalBooks.svg";
import TotalStudentsCount from "../../assets/TotalStudents.svg";
import TotalTransactions from "../../assets/Transactions.svg";
import Navbar from "../../components/Navbar";
import { useDashboardData } from "../../hooks/useDashboardData"; // ✅ New custom hook

const DashBoardPage: React.FC = () => {
  const { dashboardData, overdueBorrowers, error, loading } = useDashboardData();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error || !dashboardData) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error || "No data available"}</div>;
  }

  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div className="ml-[222px] pt-[65px] w-full">
        <DashboardHeader username="Kapil Dev Thakur" />
        <div className="bg-[#F2F2F2] p-5">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full lg:w-1/2 px-3">
              <PieChart totalBorrowedBooks={dashboardData.totalBooksBorrowed} totalReturnedBooks={dashboardData.totalBooksReturned} />
            </div>
            <div className="w-full lg:w-1/2 px-3">
              <StatsCard icon={<img src={TotalStudentsCount} alt="Total Students" className="w-10 h-10" />} count={dashboardData.totalStudents} label="Total Student" />
              <StatsCard icon={<img src={TotalBooksCount} alt="Total Books" className="w-10 h-10" />} count={dashboardData.totalBook} label="Total Book Count" />
              <StatsCard icon={<img src={TotalTransactions} alt="Total Transactions" className="w-10 h-10" />} count={dashboardData.totalTransaction} label="Transactions Count" />
              <OverdueBorrowers borrowers={overdueBorrowers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
