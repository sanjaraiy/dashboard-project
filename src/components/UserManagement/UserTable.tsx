import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setPage } from '../../redux/userSlice';

const UserTable: React.FC = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const loading = useSelector((state: RootState) => state.user.loading);
  const currentPage = useSelector((state: RootState) => state.user.currentPage);
  const dispatch = useDispatch();

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <div className="overflow-x-auto shadow-md bg-white rounded-lg">
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Region</th>
            </tr>
          </thead>
          <tbody>
            {users.slice((currentPage - 1) * 5, currentPage * 5).map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{user.name}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{user.status}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{user.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * 5 >= users.length}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
