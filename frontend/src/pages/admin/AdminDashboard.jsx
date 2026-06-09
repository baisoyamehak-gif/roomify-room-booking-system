import { useEffect, useState } from 'react';
import { Clock, CheckCircle, DoorOpen, Users, RefreshCw } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { bookingAPI, roomAPI, userAPI } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    pendingRequests: 0,
    approvedBookings: 0,
    activeRooms: 0,
    totalUsers: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [bookingsRes, roomsRes, usersRes] = await Promise.all([
        bookingAPI.getAll(),
        roomAPI.getAll(),
        userAPI.getAll(),
      ]);

      const allBookings = bookingsRes.data.data.bookings;
      const rooms = roomsRes.data.data.rooms;
      const users = usersRes.data.data.users;

      setStats({
        pendingRequests: allBookings.filter(b => b.status === 'pending').length,
        approvedBookings: allBookings.filter(b => b.status === 'approved').length,
        activeRooms: rooms.filter(r => r.status === 'available').length,
        totalUsers: users.length,
      });

      setRecentBookings(allBookings.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
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
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage users and view all bookings</p>
        </div>
        <Button variant="outline" onClick={fetchData} disabled={isLoading} className="w-full sm:w-auto">
          <RefreshCw size={18} className="mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <StatCard
          title="Pending Requests"
          value={stats.pendingRequests}
          icon={Clock}
          iconBg="#FEF3C7"
        />
        <StatCard
          title="Approved Bookings"
          value={stats.approvedBookings}
          icon={CheckCircle}
          iconBg="#D1FAE5"
        />
        <StatCard
          title="Active Rooms"
          value={stats.activeRooms}
          icon={DoorOpen}
          iconBg="#DBEAFE"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          iconBg="#EDE9FE"
        />
      </div>

      {/* Recent Booking Requests */}
      <div className="bg-white rounded-xl border p-4 md:p-5" style={{ borderColor: '#E5E7EB' }}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Booking Requests</h2>

        <div className="space-y-3">
          {recentBookings.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No booking requests yet</p>
          ) : (
            recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg"
                style={{ background: '#F9FAFB' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0"
                    style={{ background: '#2563EB' }}
                  >
                    {booking.userId?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800">{booking.userId?.name || 'Unknown User'}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {booking.roomId?.name} • {new Date(booking.date).toLocaleDateString()} • {booking.startTime} - {booking.endTime}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{booking.purpose}</p>
                  </div>
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

export default AdminDashboard;
