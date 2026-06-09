import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { bookingAPI } from '../../services/api';

const RequesterDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await bookingAPI.getMy();
      const bookings = response.data.data.bookings;

      setStats({
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        approved: bookings.filter(b => b.status === 'approved').length,
        rejected: bookings.filter(b => b.status === 'rejected').length,
      });

      setRecentBookings(bookings.slice(0, 4));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Here's an overview of your booking requests.</p>
        </div>
        <Button variant="outline" onClick={fetchData} disabled={isLoading} className="w-full sm:w-auto">
          <RefreshCw size={18} className="mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <StatCard
          title="Total Requests"
          value={stats.total}
          icon={BookOpen}
          iconBg="#E5E7EB"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          iconBg="#FEF9C3"
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          icon={CheckCircle}
          iconBg="#DCFCE7"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={XCircle}
          iconBg="#FEE2E2"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border p-4 md:p-5" style={{ borderColor: '#E5E7EB' }}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/requester/search')}
            className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-white font-medium transition-all duration-200 hover:opacity-90"
            style={{ background: '#2563EB' }}
          >
            <Search size={20} />
            Search & Book Rooms
          </button>
          <button
            onClick={() => navigate('/requester/bookings')}
            className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50"
            style={{ background: 'white', border: '1px solid #E5E7EB', color: '#374151' }}
          >
            <BookOpen size={20} />
            View My Bookings
          </button>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl border p-4 md:p-5" style={{ borderColor: '#E5E7EB' }}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h2>

        <div className="space-y-3">
          {recentBookings.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No bookings yet. Start by searching for rooms!</p>
          ) : (
            recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border"
                style={{ background: '#F9FAFB', borderColor: '#E5E7EB' }}
              >
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800">{booking.roomId?.name || 'Unknown Room'}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(booking.date).toLocaleDateString()} • {booking.startTime} - {booking.endTime}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 truncate">{booking.purpose}</p>
                </div>
                <div className="flex-shrink-0 ml-auto sm:ml-0">
                  <StatusBadge status={booking.status} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RequesterDashboard;
