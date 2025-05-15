// hooks/useDashboardData.ts
import { useState } from "react";
import { getDashboardData, getOverdueBorrowers } from "../services/dashboard/DashBoardService";
import { Dashboard, OverdueBorrower } from "../types/dashboard/dashboard";
import { toast } from "react-toastify";
import { useLoader } from "./useLoader"; // ✅ Uses the generic loader

export function useDashboardData() {
  const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);
  const [overdueBorrowers, setOverdueBorrowers] = useState<OverdueBorrower[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { loading,stopLoading } = useLoader(true);

  if (loading && !dashboardData && !error) {
    (async () => {
      try {
        const dashboardResponse = await getDashboardData();
        setDashboardData(dashboardResponse);

        const borrowersResponse = await getOverdueBorrowers();
        setOverdueBorrowers(borrowersResponse);

        toast.success("Dashboard data loaded successfully!");
      } catch (err) {
        setError("Failed to load dashboard data.");
        toast.error("Failed to load dashboard data");
        console.error(err);
      } finally {
        stopLoading();
      }
    })();
  }

  return { dashboardData, overdueBorrowers, error, loading };
}
