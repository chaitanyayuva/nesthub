import { TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { Avatar } from '../../components/ui/Avatar';
import { StatusBadge } from '../../components/ui/StatusBadge';

const stats = [
  { label: 'Occupancy', value: '18/20', trend: '+2', trendUp: true },
  { label: 'Revenue (This month)', value: '₹96,400', trend: '+8.2%', trendUp: true },
  { label: 'Pending rent', value: '5', trend: '-2', trendUp: false },
  { label: 'Open complaints', value: '3', trend: '0', trendUp: false },
];

const recentCheckIns = [
  { name: 'Arjun Patel', college: 'IIT Madras', room: 'A-101', status: 'active', date: 'Mar 22' },
  { name: 'Sneha Reddy', college: 'VIT Chennai', room: 'B-205', status: 'active', date: 'Mar 21' },
  { name: 'Karthik M', college: 'SRM University', room: 'A-103', status: 'active', date: 'Mar 20' },
];

const pendingRent = [
  { name: 'Rahul Kumar', amount: 6000, daysOverdue: 3 },
  { name: 'Priya Singh', amount: 5500, daysOverdue: 1 },
  { name: 'Amit Shah', amount: 5850, daysOverdue: 5 },
];

export default function AdminDashboard() {
  return (
    <>
      {/* Back to Home Link */}
      <div className="px-6 pt-4">
          <Link href="/home" className="text-[11px] text-nesthub-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
        
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="bg-nesthub-surface border border-nesthub-border rounded-xl p-4"
              >
                <p className="text-[11px] text-nesthub-text-muted mb-1">{stat.label}</p>
                <p className="text-[20px] font-medium text-nesthub-text-primary mb-1">{stat.value}</p>
                <div className="flex items-center gap-1">
                  {stat.trendUp ? (
                    <TrendingUp size={12} className="text-nesthub-success-text" />
                  ) : (
                    <TrendingDown size={12} className="text-nesthub-danger-text" />
                  )}
                  <span className={`text-[11px] ${stat.trendUp ? 'text-nesthub-success-text' : 'text-nesthub-danger-text'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-6">
            {/* Recent Check-ins */}
            <div className="bg-nesthub-surface border border-nesthub-border rounded-xl p-5">
              <h2 className="text-[14px] font-medium mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Recent check-ins
              </h2>
              
              <div className="space-y-3">
                {recentCheckIns.map((student) => (
                  <div key={student.name} className="flex items-center gap-3">
                    <Avatar name={student.name} size={36} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-nesthub-text-primary truncate">
                        {student.name}
                      </p>
                      <p className="text-[11px] text-nesthub-text-muted truncate">
                        {student.college}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-medium text-nesthub-text-primary" style={{ fontFamily: 'var(--font-mono)' }}>
                        {student.room}
                      </p>
                      <p className="text-[10px] text-nesthub-text-muted">
                        {student.date}
                      </p>
                    </div>
                    <StatusBadge variant="success">Active</StatusBadge>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pending Rent */}
            <div className="bg-nesthub-surface border border-nesthub-border rounded-xl p-5">
              <h2 className="text-[14px] font-medium mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Pending rent
              </h2>
              
              <div className="space-y-3">
                {pendingRent.map((student) => (
                  <div key={student.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar name={student.name} size={36} />
                      <p className="text-[12px] font-medium text-nesthub-text-primary">
                        {student.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-medium text-nesthub-text-primary">
                        ₹{student.amount.toLocaleString()}
                      </p>
                      <StatusBadge variant="danger" className="mt-1">
                        {student.daysOverdue}d overdue
                      </StatusBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
