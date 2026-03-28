"use client";

import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import { usePayments } from "../../hooks/usePayments";
import { useNotices } from "../../hooks/useNotices";
import { CreditCard, AlertCircle, UserPlus, FileBadge2, ChevronRight, Speaker } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { totalAmount } = usePayments();
  const { allNotices } = useNotices();
  
  const latestNotice = allNotices[0];

  return (
    <div className="p-6 pb-6 max-w-lg mx-auto w-full transition-all duration-300">
      {/* Header section */}
      <header className="mb-8 flex justify-between items-center animate-fade-in px-2">
        <div>
          <p className="text-gray-400 font-semibold uppercase tracking-widest text-[10px] mb-1">Welcome back,</p>
          <h1 className="font-heading text-3xl font-bold text-nesthub-primary tracking-tight">{user.name}</h1>
        </div>
        <div className="w-14 h-14 bg-white rounded-2xl overflow-hidden border-2 border-white shadow-xl shadow-nesthub-primary/10 shrink-0 transform hover:rotate-3 transition-transform">
          <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Rent Due Card */}
      <div className="bg-gradient-to-br from-nesthub-primary to-[#2a5a42] rounded-[40px] p-8 mb-10 text-white shadow-2xl shadow-nesthub-primary/20 relative overflow-hidden animate-slide-up">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-8 translate-x-8"></div>
        <div className="absolute bottom-0 right-12 w-16 h-16 bg-white opacity-10 rounded-full translate-y-6"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-white/60 font-bold uppercase tracking-widest text-[10px] mb-2">Total Rent Due</p>
            <h2 className="text-5xl font-bold font-heading mb-2 tracking-tight">₹{totalAmount.toLocaleString()}</h2>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest bg-black/10 w-fit px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-nesthub-accent animate-pulse"></span>
              Due: 5th March
            </div>
          </div>
          <Link href="/student/payments" className="w-full md:w-auto bg-nesthub-accent hover:bg-[#E59734] text-white px-8 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-wider shadow-xl shadow-nesthub-accent/30 transition-all active:scale-95 flex items-center justify-center gap-2">
            Pay Now
            <ChevronRight size={16} strokeWidth={3} />
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 mb-6 px-2">Quick Commands</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionCard href="/student/profile" icon={FileBadge2} label="My ID" color="bg-blue-50 text-blue-600" />
          <ActionCard href="/student/payments" icon={CreditCard} label="Payment" color="bg-green-50 text-green-600" />
          <ActionCard href="/student/complaints" icon={AlertCircle} label="Ticket" color="bg-red-50 text-red-600" />
          <ActionCard href="/student/visitors" icon={UserPlus} label="Visitor" color="bg-purple-50 text-purple-600" />
        </div>
      </div>

      {/* Recent Notice */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-between items-center mb-6 px-2">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400">Bulletin</h3>
          <Link href="/student/notices" className="text-nesthub-accent text-[10px] font-bold uppercase tracking-wider flex items-center hover:underline gap-1">
            Browse All <ChevronRight size={14} strokeWidth={3} />
          </Link>
        </div>
        
        {latestNotice && (
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex gap-5 items-start hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all cursor-default">
            <div className={`p-3.5 rounded-2xl shrink-0 ${latestNotice.color}`}>
              <Speaker size={20} />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-nesthub-primary text-sm mb-1 truncate">{latestNotice.title}</h4>
              <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed font-medium">{latestNotice.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionCard({ href, icon: Icon, label, color }) {
  return (
    <Link href={href} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-4 hover:shadow-xl hover:shadow-nesthub-primary/5 hover:-translate-y-1 transition-all active:scale-95 duration-300 group">
      <div className={`p-4 rounded-2xl transition-all group-hover:scale-110 ${color}`}>
        <Icon size={24} />
      </div>
      <span className="font-heading font-bold text-[10px] uppercase tracking-widest text-nesthub-primary">{label}</span>
    </Link>
  );
}
