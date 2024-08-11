import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardTable from "@/components/dashboard/DashboardTable";
import React from "react";

export default function index() {
  return (
    <DashboardLayout>
      <DashboardTable />
    </DashboardLayout>
  );
}
