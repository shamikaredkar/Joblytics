import React from "react";
import { DashNav } from "../../components/DashboardNav/DashNav";
import { Applications } from "../../components/Applications/Applications";
import { Keywords } from "../../components/Keywords/Keywords";
import { Score } from "../../components/Score/Score";

export const Dashboard = () => {
  return (
    <div className='bg-gray-50'>
      <DashNav />
      <Applications />
      <div className='max-w-screen-xl mx-auto'>
        <div className='flex justify-between items-start gap-4 p-4'>
          {/* Keywords Section */}
          <div className='flex-1 p-4 bg-white rounded-lg shadow-lg'>
            <Keywords />
          </div>
          {/* Score Section */}
          <div className='flex-1 p-4 bg-white rounded-lg shadow-lg'>
            <Score />
          </div>
        </div>
      </div>
    </div>
  );
};
