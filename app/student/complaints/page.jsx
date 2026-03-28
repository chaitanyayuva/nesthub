"use client";

import { useState } from "react";
import { useComplaints } from "../../../hooks/useComplaints";
import { 
  Wrench, 
  Zap, 
  Bed, 
  Trash2, 
  HelpCircle, 
  Plus, 
  ChevronRight,
  AlertCircle,
  FileText,
  ShieldCheck
} from "lucide-react";

export default function StudentComplaints() {
  const { stats } = useComplaints();
  const [selectedCategory, setSelectedCategory] = useState("Plumbing");
  const [selectedPriority, setSelectedPriority] = useState("P2");

  const categories = [
    { id: "Plumbing", icon: Wrench, label: "Plumbing", color: "text-blue-500 bg-blue-50" },
    { id: "Electrical", icon: Zap, label: "Electrical", color: "text-yellow-500 bg-yellow-50" },
    { id: "Furniture", icon: Bed, label: "Furniture", color: "text-orange-500 bg-orange-50" },
    { id: "Cleaning", icon: Trash2, label: "Cleaning", color: "text-green-500 bg-green-50" },
    { id: "Other", icon: HelpCircle, label: "Other", color: "text-purple-500 bg-purple-50" },
  ];

  return (
    <div className="p-6 pb-6 max-w-lg mx-auto w-full animate-fade-in transition-all duration-300">
      {/* Header */}
      <div className="mb-10 px-2">
        <h1 className="font-heading text-3xl font-bold text-nesthub-primary tracking-tight">Support Ticket</h1>
        <p className="text-gray-400 font-medium text-sm mt-2">Report an issue and our team will resolve it quickly.</p>
      </div>

      {/* Select Category */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5 px-2">
           <label className="font-heading font-black text-[10px] uppercase tracking-widest text-gray-400">Issue Category</label>
           <span className="text-[10px] font-black text-nesthub-accent uppercase tracking-widest bg-nesthub-accent/5 px-2 py-0.5 rounded-lg">Required</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-none px-2 -mx-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-4 p-6 rounded-[32px] border transition-all duration-500 min-w-[120px] ${
                selectedCategory === cat.id
                  ? "bg-nesthub-primary border-nesthub-primary text-white shadow-2xl shadow-nesthub-primary/20 -translate-y-2"
                  : "bg-white border-gray-100 text-gray-400 hover:border-nesthub-primary/20 hover:shadow-xl hover:shadow-nesthub-primary/5"
              }`}
            >
              <div className={`p-3 rounded-2xl transition-colors ${selectedCategory === cat.id ? "bg-white/10" : cat.color}`}>
                <cat.icon size={24} strokeWidth={selectedCategory === cat.id ? 3 : 2} />
              </div>
              <span className="text-[11px] font-black tracking-[0.2em] uppercase">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Priority & Description */}
      <div className="bg-white rounded-[48px] p-8 border border-gray-100 shadow-sm mb-10 transition-all hover:shadow-2xl hover:shadow-nesthub-primary/5">
        <div className="mb-8">
           <label className="block font-heading font-black text-[10px] uppercase tracking-widest text-gray-400 mb-6">Urgency Level</label>
           <div className="grid grid-cols-3 gap-4">
             {["P1", "P2", "P3"].map((p) => (
               <button
                 key={p}
                 onClick={() => setSelectedPriority(p)}
                 className={`py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 border-2 ${
                   selectedPriority === p
                     ? "bg-nesthub-primary border-nesthub-primary text-white shadow-xl shadow-nesthub-primary/20"
                     : "bg-gray-50 border-transparent text-gray-300 hover:bg-gray-100"
                 }`}
               >
                 {p}
               </button>
             ))}
           </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-nesthub-primary">
             <FileText size={18} strokeWidth={2.5} />
             <label className="font-heading font-black text-xs uppercase tracking-widest">Problem Details</label>
          </div>
          <textarea
            placeholder="E.g. The tap in room 302B is leaking water..."
            className="w-full bg-gray-50 border-none rounded-[32px] p-6 text-sm focus:outline-none focus:ring-4 focus:ring-nesthub-primary/5 transition-all min-h-[160px] placeholder:text-gray-300 font-medium"
          />
        </div>

        <button className="w-full bg-nesthub-primary text-white py-5 rounded-[28px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-nesthub-primary/20 hover:bg-[#204a35] transition-all active:scale-95 flex items-center justify-center gap-3">
          Launch Live Ticket
          <ChevronRight size={18} strokeWidth={3} />
        </button>
      </div>

      {/* Metrics Card */}
      <div className="bg-nesthub-primary/5 p-8 rounded-[40px] border border-nesthub-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-nesthub-primary/5">
         <div className="flex items-start gap-4">
            <div className="bg-white p-3.5 rounded-2xl text-nesthub-primary shadow-sm">
               <ShieldCheck size={24} />
            </div>
            <div>
               <h4 className="font-heading font-black text-[10px] uppercase tracking-widest text-nesthub-primary mb-1">Queue Health</h4>
               <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Average response time is <span className="text-nesthub-accent font-black">{stats.avgResponse}</span></p>
            </div>
         </div>
         <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-4 border-gray-50 bg-gray-200 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=Staff+${i}&background=random`} alt="Staff" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-4 border-gray-50 bg-nesthub-accent flex items-center justify-center text-[10px] font-black text-white">
               +12
            </div>
         </div>
      </div>
    </div>
  );
}
