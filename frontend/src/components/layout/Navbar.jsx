import { useAuth } from '../../context/AuthContext';
import NotificationBell from '../common/NotificationBell';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  const roleLabels = {
    admin: 'Administrator',
    approver: 'Approver',
    requester: 'Requester',
  };

  return (
    <header
      className="fixed top-0 right-0 z-10 bg-white border-b md:border-b-0"
      style={{
        left: 0,
        height: '64px',
        borderColor: '#E5E7EB'
      }}
    >
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>

        {/* Spacer for mobile */}
        <div className="lg:hidden w-10" />

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3 ml-auto">
          <NotificationBell />
          <div className="flex items-center gap-2 pl-2 md:pl-3 border-l border-gray-200">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
              style={{ background: '#2563EB' }}
            >
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{roleLabels[user?.role]}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
