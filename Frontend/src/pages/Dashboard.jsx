import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileCard from '../components/UserProfileCard';
import { getAllUserProfiles } from '../store/slices/dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profiles, loading, error, totalUsers, filters } = useSelector((state) => state.dashboard);
  useEffect(() => {
    // Load user profiles on component mount
    dispatch(getAllUserProfiles());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600">
                Discover talented professionals and their interview performance metrics.
              </p>
            </div>
          </div>
        </div>
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg mb-6 flex items-center">
            <span className="text-lg mr-2">⚠️</span>
            {error}
          </div>
        )}

        {/* User Profiles Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              User Profiles
            </h2>
          </div>

          {profiles.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No profiles found</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {profiles.map((profile, index) => (
                <UserProfileCard
                  key={profile.id}
                  profile={profile}
                  rank={index + 1}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;