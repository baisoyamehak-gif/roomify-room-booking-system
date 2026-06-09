const StatusBadge = ({ status }) => {
  const styles = {
    pending: {
      background: '#FEF9C3',
      color: '#A16207',
    },
    approved: {
      background: '#DCFCE7',
      color: '#166534',
    },
    rejected: {
      background: '#FEE2E2',
      color: '#991B1B',
    },
    active: {
      background: '#DCFCE7',
      color: '#166534',
    },
    maintenance: {
      background: '#FEF9C3',
      color: '#A16207',
    },
    available: {
      background: '#DCFCE7',
      color: '#166534',
    },
    blocked: {
      background: '#FEE2E2',
      color: '#991B1B',
    },
  };

  const style = styles[status?.toLowerCase()] || {
    background: '#E5E7EB',
    color: '#374151',
  };

  return (
    <span
      className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full"
      style={{ background: style.background, color: style.color }}
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
};

export default StatusBadge;
