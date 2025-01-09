import React from "react";
import { DashNav } from "../../components/DashboardNav/DashNav";
import { Applications } from "../../components/Applications/Applications";

export const Dashboard = () => {
  return (
    <div>
      <DashNav />
      <Applications />
    </div>
  );
};
