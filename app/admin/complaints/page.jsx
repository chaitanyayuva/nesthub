"use client";

import { useComplaints } from "../../../hooks/useComplaints";
import { ComplaintQueue } from "../../../components/admin/ComplaintQueue";
import { 
  Filter, 
  FastForward, 
  MessageSquareWarning 
} from "lucide-react";

export default function AdminComplaints() {
  const { complaints, activeTab, setActiveTab, stats } = useComplaints();

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 sm:px-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-6">
         <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-nesthub-primary tracking-tight">Maintenance Queue</h1>
            <p className="text-gray-400 font-medium text-sm mt-1">Review and manage maintenance complaints from residents.</p>
         </div>
         <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 w-full sm:w-auto justify-center hover:bg-gray-50 transition-colors cursor-pointer group">
            <Filter size={16} className="text-nesthub-accent group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-[10px] font-black font-heading text-nesthub-primary uppercase tracking-widest">Advanced Filter</span>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-10 bg-gray-50/50 p-2 rounded-[28px] border border-gray-100/50 w-full overflow-x-auto scrollbar-none">
         {["Open", "In Progress", "Resolved"].map((tab) => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`flex-1 min-w-[120px] sm:min-w-0 sm:flex-initial px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 relative overflow-hidden shrink-0 ${
               activeTab === tab 
                 ? "bg-white text-nesthub-primary shadow-xl shadow-nesthub-primary/5 border border-gray-100 scale-[1.02]" 
                 : "text-gray-400 hover:text-nesthub-primary hover:bg-white/50"
             }`}
           >
             <span className="relative z-10">{tab}</span>
             {activeTab === tab && (
               <div className="absolute bottom-0 left-0 w-full h-1 bg-nesthub-accent/30"></div>
             )}
             <span className={`ml-2 px-2.5 py-0.5 rounded-full text-[9px] relative z-10 ${
               activeTab === tab ? 'bg-nesthub-primary text-white shadow-sm' : 'bg-gray-100 text-gray-400'
             }`}>
               {tab === "Open" ? stats.open : tab === "In Progress" ? stats.inProgress : stats.resolved}
             </span>
           </button>
         ))}
      </div>

      {/* Grid of Complaints */}
      <div className="min-h-[400px]">
         <ComplaintQueue complaints={complaints} />
      </div>

      {/* Summary Footer */}
      <div className="mt-12 bg-nesthub-primary p-8 sm:p-10 rounded-[40px] text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden gap-10">
         <div className="relative z-10 flex flex-col sm:flex-row gap-8 sm:gap-16 w-full md:w-auto text-center sm:text-left">
            <div className="group cursor-default">
               <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 group-hover:text-nesthub-accent transition-colors">Average Response</p>
               <h4 className="text-4xl font-heading font-black tracking-tight">{stats.avgResponse} <span className="text-xs text-nesthub-accent uppercase tracking-widest ml-1">Hours</span></h4>
            </div>
            <div className="group cursor-default">
               <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 group-hover:text-nesthub-accent transition-colors">Weekly Completion</p>
               <h4 className="text-4xl font-heading font-black tracking-tight">{stats.completionRate}</h4>
            </div>
         </div>
         <button className="relative z-10 bg-white/10 hover:bg-white/20 w-full md:w-auto px-10 py-4.5 rounded-[24px] font-black text-[10px] uppercase tracking-widest text-nesthub-accent backdrop-blur-md transition-all flex items-center justify-center gap-3 border border-white/5 shadow-2xl active:scale-95">
            Generate Performance Report
            <FastForward size={16} strokeWidth={3} className="animate-pulse" />
         </button>
         
         <MessageSquareWarning size={180} className="absolute -bottom-10 -right-10 text-white/5 opacity-40 rotate-12 hidden lg:block pointer-events-none" />
      </div>
    </div>
  );
}
