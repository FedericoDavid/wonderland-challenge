interface BadgeProps {
  children: React.ReactNode;
  color?: "yellow" | "blue" | "green";
}

export function Badge({ children, color = "blue" }: BadgeProps) {
  const colors = {
    yellow: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50",
    blue: "bg-blue-500/20 text-blue-300 border-blue-500/50",
    green: "bg-green-500/20 text-green-300 border-green-500/50",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${colors[color]}`}>
      {children}
    </span>
  );
}
