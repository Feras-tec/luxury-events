interface BadgeProps {
  children: React.ReactNode;
  color?: "primary" | "success" | "ghost" | "neutral" | "warning" | "info";
}

export const Badge = ({ children, color = "neutral" }: BadgeProps) => {
  return <div className={`badge badge-${color} badge-sm`}>{children}</div>;
};
