
import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  TrendingUp,
} from "lucide-react";

const icons = {
  total: ClipboardList,
  progress: Clock3,
  completed: CheckCircle2,
  rate: TrendingUp,
};

function StatCard({ type, label, value, subtitle }) {
  const Icon = icons[type] || ClipboardList;

  return (
    <div className={`stat-card stat-${type}`}>
      <div className="stat-card-top">
        <span>{label}</span>
        <div className="stat-icon">
          <Icon size={20} />
        </div>
      </div>

      <div className="stat-value">{value}</div>
      <div className="stat-subtitle">{subtitle}</div>
    </div>
  );
}

export default StatCard;
