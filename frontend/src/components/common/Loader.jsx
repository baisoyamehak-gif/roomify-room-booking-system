const Loader = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`${sizes[size]} border-4 border-secondary border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default Loader;