import { TrendingUp, CreditCard, PieChartRow, AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function PaymentStats({ stats }) {
  const statCards = [
    { label: "Total Collected", value: stats.totalCollected, trend: "+8.2%", icon: TrendingUp, color: "bg-green-500", isPositive: true },
    { label: "Pending Amount", value: stats.pendingAmount, trend: "-2.1%", icon: CreditCard, color: "bg-orange-500", isPositive: false },
    { label: "Completion Rate", value: stats.completionRate, trend: "+4.5%", icon: ArrowUpRight, color: "bg-blue-500", isPositive: true },
    { label: "Overdue Accounts", value: stats.overdueAccounts, trend: "+1", icon: AlertCircle, color: "bg-red-500", isPositive: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg shadow-${stat.color.split('-')[1]}-500/20`}>
              <stat.icon size={20} strokeWidth={2.5} />
            </div>
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
              stat.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            }`}>
               {stat.trend}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-heading font-bold text-nesthub-primary tracking-tight">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
