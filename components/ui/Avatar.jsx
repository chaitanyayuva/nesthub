export function Avatar({ name, size = 36, className = "" }) {
  // Get initials (e.g., "Arjun Patel" -> "AP")
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div
      className={`rounded-full bg-nesthub-primary text-white flex items-center justify-center font-medium ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4, // Scale font size relative to avatar size
      }}
    >
      {initials}
    </div>
  );
}
