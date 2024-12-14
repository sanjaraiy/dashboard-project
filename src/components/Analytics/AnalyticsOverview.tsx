import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';  // Ensure the correct path for your store
import { fetchAnalyticsData } from '../../redux/analyticsActions';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AnalyticsOverview: React.FC = () => {
  const dispatch = useDispatch();
  const analyticsData = useSelector((state: RootState) => state.analytics);

  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [dateRange, setDateRange] = useState<{ start: string, end: string }>({ start: '', end: '' });

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  // Filter user trend data based on selected date range
  const filteredTrendData = analyticsData.userTrendData.filter(data => {
    const date = new Date(data.month);
    const start = dateRange.start ? new Date(dateRange.start) : new Date('2000-01-01');
    const end = dateRange.end ? new Date(dateRange.end) : new Date();
    return date >= start && date <= end;
  });

  // Filter region data
  const filteredRegionData = selectedRegion === 'All'
    ? analyticsData.userRegionData
    : analyticsData.userRegionData.filter(region => region.region === selectedRegion);

  return (
    <div className="space-y-8">
      {/* Filters Section */}
      <div className="flex justify-between mb-6">
        <div>
          <label htmlFor="region" className="text-lg mr-4">Select Region:</label>
          <select
            id="region"
            className="p-2 border rounded"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="All">All Regions</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
          </select>
        </div>

        <div>
          <label htmlFor="startDate" className="text-lg mr-4">Date Range:</label>
          <input
            type="date"
            id="startDate"
            className="p-2 border rounded mr-2"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          />
          <input
            type="date"
            id="endDate"
            className="p-2 border rounded"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          />
        </div>
      </div>

      {/* User Registration Trend - Line Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">User Registration Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="registrations" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Active vs Inactive Users - Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Active vs Inactive Users</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={analyticsData.userStatusData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Users by Region - Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Users by Region</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredRegionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
