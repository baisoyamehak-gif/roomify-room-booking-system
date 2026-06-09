const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-4 py-2.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base';

  const variants = {
    primary: 'text-white hover:opacity-90 focus:ring-blue-500',
    secondary: 'text-white hover:opacity-90 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    danger: 'text-white hover:opacity-90 focus:ring-red-500',
    success: 'text-white hover:opacity-90 focus:ring-green-500',
  };

  const customStyles = {
    primary: { background: '#2563EB' },
    secondary: { background: '#6B7280' },
    outline: { background: 'transparent', borderColor: '#E5E7EB' },
    danger: { background: '#EF4444' },
    success: { background: '#22C55E' },
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={customStyles[variant]}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
