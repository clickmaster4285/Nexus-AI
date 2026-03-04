import { cn } from "@/lib/utils";

const sentimentColors = {
  positive: "bg-green-500 text-white",
  neutral: "bg-yellow-500 text-white",
  negative: "bg-red-500 text-white",
};

export default function SentimentBadge({ sentiment, score }) {
  const colorClass = sentimentColors[sentiment?.toLowerCase()] || sentimentColors.neutral;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        colorClass
      )}
    >
      {score && <span>{score}</span>}
      <span className="capitalize">{sentiment}</span>
    </span>
  );
}
