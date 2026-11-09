const Skeleton = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-2xl bg-white ${className}`}
    />
  );
};

export default Skeleton;
