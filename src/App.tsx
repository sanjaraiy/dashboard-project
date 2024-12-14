import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from './redux/userActions';
import { fetchAnalyticsData } from './redux/analyticsActions';
import UserTable from './components/UserManagement/UserTable';
import AnalyticsOverview from './components/Analytics/AnalyticsOverview';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Dynamic Dashboard</h1>
        
        {/* User Management Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Management</h2>
          <UserTable />
        </div>

        {/* Analytics Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Analytics</h2>
          <AnalyticsOverview />
        </div>
      </div>
    </div>
  );
};

export default App;
