const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 ${className}`}>
      {children}
    </div>
  );
};

export default Card;