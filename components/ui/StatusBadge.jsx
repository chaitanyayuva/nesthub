export function StatusBadge({ children, variant = "default", className = "" }) {
  const styles = {
    success: "bg-nesthub-success-bg text-nesthub-success-text border-nesthub-success-text/20",
    danger: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    info: "bg-nesthub-info-bg text-nesthub-info-text border-nesthub-info-text/20",
    default: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
