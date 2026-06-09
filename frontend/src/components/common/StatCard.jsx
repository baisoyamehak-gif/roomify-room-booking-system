const StatCard = ({ title, value, icon: Icon, iconBg = '#E5E7EB' }) => {
  return (
    <div
      className="bg-white rounded-xl p-4 md:p-5 border transition-all duration-200 hover:shadow-md"
      style={{ borderColor: '#E5E7EB' }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="text-2xl md:text-3xl font-bold mt-1 text-gray-900">{value}</p>
        </div>
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          <Icon size={18} className="md:hidden" style={{ color: '#374151' }} />
          <Icon size={22} className="hidden md:block" style={{ color: '#374151' }} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
