import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, RefreshCw, XCircle } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import { bookingAPI } from '../../services/api';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await bookingAPI.getMy();
      setBookings(response.data.data.bookings);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter(b => b.status === activeTab);

  const getTabCount = (status) => {
    if (status === 'all') return bookings.length;
    return bookings.filter(b => b.status === status).length;
  };

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage all your booking requests</p>
        </div>
        <Button variant="outline" onClick={fetchBookings} className="w-full sm:w-auto">
          <RefreshCw size={18} className="mr-2" />
          Refresh
        </Button>
      </div>

      {/* Tabs - Horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              background: activeTab === tab.id ? '#2563EB' : 'transparent',
            }}
          >
            {tab.label} ({getTabCount(tab.id)})
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-xl border p-12 text-center" style={{ borderColor: '#E5E7EB' }}>
            <p className="text-gray-500">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl border p-12 text-center" style={{ borderColor: '#E5E7EB' }}>
            <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No bookings found</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl border p-4 md:p-5 transition-all duration-200 hover:shadow-md"
              style={{ borderColor: '#E5E7EB' }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ background: '#2563EB' }}
                  >
                    {booking.roomId?.name?.charAt(0) || 'R'}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Booking ID: {booking.bookingId || 'N/A'}</p>
                    <h3 className="font-semibold text-gray-800 text-base md:text-lg">{booking.roomId?.name || 'Unknown Room'}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={14} />
                      {booking.roomId?.location || booking.roomId?.building || 'Main Building'} - {booking.roomId?.floor || 'Floor 1'}
                    </p>
                  </div>
                </div>
                <StatusBadge status={booking.status} />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} className="text-gray-400" />
                  <span>{booking.startTime} - {booking.endTime}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Purpose:</span> <span className="truncate">{booking.purpose}</span>
                </div>
              </div>

              {/* Rejection Remarks */}
              {booking.status === 'rejected' && booking.remarks && (
                <div
                  className="p-4 rounded-xl flex items-start gap-3"
                  style={{ background: '#FEF2F2' }}
                >
                  <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Admin Remarks</p>
                    <p className="text-sm text-red-600 mt-1">{booking.remarks}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
