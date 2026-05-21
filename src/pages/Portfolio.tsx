import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import StatsCards from '../components/portfolio/StatsCards';
import OverviewChart from '../components/portfolio/OverviewChart';
import TrendingPosts from '../components/portfolio/TrendingPosts';
import PotentialMembers from '../components/portfolio/PotentialMembers';
import Watchlist from '../components/portfolio/Watchlist';
import Revenue from '../components/portfolio/Revenue';
import TrendingNews from '../components/portfolio/TrendingNews';

const Portfolio: React.FC = () => {
  return (
    <DashboardLayout title="My Portfolio">
      <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-8">
        {/* Two-column layout: Main Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Main content column (Left side) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <StatsCards />
            <OverviewChart />
            <TrendingPosts />
            <PotentialMembers />
          </div>

          {/* Sidebar column (Right side) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Watchlist />
            <Revenue />
            <TrendingNews />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Portfolio;
