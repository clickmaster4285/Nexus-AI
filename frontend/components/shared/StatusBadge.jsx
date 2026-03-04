import { cn } from "@/lib/utils";

const statusColors = {
  available: "bg-green-500 text-white",
  busy: "bg-yellow-500 text-white",
  acw: "bg-blue-500 text-white",
  hold: "bg-blue-400 text-white",
  break: "bg-orange-500 text-white",
  training: "bg-purple-500 text-white",
  offline: "bg-gray-500 text-white",
  active: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-white",
  critical: "bg-red-500 text-white",
  error: "bg-red-500 text-white",
  pending: "bg-gray-400 text-white",
  success: "bg-green-500 text-white",
};

export default function StatusBadge({ status, children, className }) {
  const colorClass = statusColors[status?.toLowerCase()] || statusColors.pending;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        colorClass,
        className
      )}
    >
      {children || status}
    </span>
  );
}
