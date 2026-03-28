"use client";

import { 
  Clock, 
  User, 
  MapPin, 
  Wrench, 
  Zap, 
  Bed, 
  Trash2, 
  HelpCircle,
  UserCheck,
  Plus,
  CheckCircle2
} from "lucide-react";

export function ComplaintQueue({ complaints }) {
  const getPriorityColor = (p) => {
    switch(p) {
      case "P1": return "bg-red-50 text-red-600 ring-1 ring-red-100";
      case "P2": return "bg-orange-50 text-orange-600 ring-1 ring-orange-100";
      case "P3": return "bg-blue-50 text-blue-600 ring-1 ring-blue-100";
      default: return "bg-gray-50 text-gray-400";
    }
  };

  const getCategoryIcon = (cat) => {
    switch(cat) {
      case "Plumbing": return Wrench;
      case "Electrical": return Zap;
      case "Furniture": return Bed;
      case "Cleaning": return Trash2;
      default: return HelpCircle;
    }
  };

  if (complaints.length === 0) {
    return (
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-12 sm:p-20 flex flex-col items-center justify-center text-center">
         <div className="bg-gray-50 p-6 rounded-[32px] text-gray-200 mb-6">
            <CheckCircle2 size={64} strokeWidth={1} />
         </div>
         <h3 className="font-heading text-2xl font-bold text-nesthub-primary mb-2 tracking-tight">Wow! All Caught Up</h3>
         <p className="text-gray-400 font-medium text-sm">There are no maintenance tickets in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       {complaints.map((comp) => {
         const Icon = getCategoryIcon(comp.category);
         return (
           <div key={comp.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-6 sm:p-8 hover:shadow-2xl hover:shadow-nesthub-primary/5 transition-all duration-500 group flex flex-col">
              <div className="flex justify-between items-start mb-6 gap-2">
                 <div className="flex gap-4 items-center">
                    <div className="p-3 bg-gray-50 text-gray-400 rounded-2xl group-hover:bg-nesthub-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-nesthub-primary/20 transition-all duration-500 shrink-0">
                       <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                       <div className="flex flex-wrap items-center gap-2 mb-1">
                         <h3 className="font-heading text-lg font-semibold text-nesthub-primary truncate">{comp.category}</h3>
                         <span className="text-[10px] font-mono font-bold text-gray-300 tracking-tight uppercase shrink-0">{comp.id}</span>
                       </div>
                       <div className="flex items-center gap-1.5 text-gray-400">
                         <Clock size={12} />
                         <span className="text-[9px] font-black uppercase tracking-wider">{comp.time}</span>
                       </div>
                    </div>
                 </div>
                 <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider shrink-0 ${getPriorityColor(comp.priority)}`}>
                    {comp.priority}
                 </span>
              </div>

              <div className="bg-gray-50/50 p-6 rounded-[28px] mb-8 border border-gray-50 flex-1">
                 <h4 className="font-bold text-nesthub-primary mb-3 text-sm leading-tight">"{comp.subject}"</h4>
                 <div className="flex flex-wrap items-center gap-y-3 gap-x-6">
                    <div className="flex items-center gap-2">
                       <User size={14} className="text-gray-400" />
                       <span className="text-xs font-bold text-gray-500 whitespace-nowrap">{comp.student}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <MapPin size={14} className="text-gray-400" />
                       <span className="text-xs font-black text-nesthub-primary bg-white px-2 py-0.5 rounded-lg border border-gray-100">{comp.room}</span>
                    </div>
                 </div>
              </div>

              {comp.status === "In Progress" && (
                <div className="flex items-center gap-3 mb-8 px-2 py-2.5 bg-nesthub-accent/5 rounded-2xl border border-nesthub-accent/10">
                   <UserCheck size={18} className="text-nesthub-accent" />
                   <p className="text-[11px] font-semibold text-nesthub-accent uppercase tracking-wider truncate">Assigned to: {comp.assignedTo}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                 {comp.status === "Open" && (
                   <button className="flex-1 bg-nesthub-primary text-white py-4 rounded-2xl font-bold text-[10px] uppercase tracking-wider shadow-xl shadow-nesthub-primary/20 hover:bg-[#204a35] transition-all flex items-center justify-center gap-2">
                      <Plus size={16} />
                      Assign Staff
                   </button>
                 )}
                 {comp.status === "In Progress" && (
                   <button className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-bold text-[10px] uppercase tracking-wider shadow-xl shadow-green-500/20 hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} />
                      Mark Resolved
                   </button>
                 )}
                 <button className="px-6 bg-white text-gray-400 border border-gray-100 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-wider hover:bg-gray-50 hover:text-nesthub-primary transition-all">
                    Details
                 </button>
              </div>
           </div>
         );
       })}
    </div>
  );
}
