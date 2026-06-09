import { useState, useEffect } from 'react';
import ScheduleCalendar from '../../components/common/ScheduleCalendar';
import { bookingAPI } from '../../services/api';

const RequesterScheduleView = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await bookingAPI.getAll();
      setBookings(response.data.data.bookings.filter(b => b.status === 'approved'));
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <ScheduleCalendar
      bookings={bookings}
      isLoading={isLoading}
      onRefresh={fetchBookings}
      title="Room Availability"
      subtitle="View all approved bookings to check room availability"
    />
  );
};

export default RequesterScheduleView;
