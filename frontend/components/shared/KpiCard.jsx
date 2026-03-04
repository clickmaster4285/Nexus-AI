import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function KpiCard({ title, value, trend, trendValue, icon: Icon, alert }) {
  const isPositive = trend === "up";

  return (
    <div className={cn(
      "p-4 bg-card rounded-lg border",
      alert && "border-red-500"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </div>

      {trendValue && (
        <div className="flex items-center gap-1 mt-2">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span className={cn(
            "text-xs",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
}
