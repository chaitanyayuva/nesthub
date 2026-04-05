"use client";

import { useState } from "react";
import { useVisitors } from "../../../hooks/useVisitors";
import { VisitorRequests, VisitorLogs } from "../../../components/admin/VisitorLogs";
import { ApproveVisitorModal } from "../../../components/admin/ApproveVisitorModal";
import { Search, History, UserSquare2, ChevronRight, Settings2 } from "lucide-react";

export default function AdminVisitors() {
  const { pendingApprovals, historicalLogs, searchTerm, setSearchTerm, activeInside } = useVisitors();
  const [selectedRequest, setSelectedRequest] = useState(null);

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 sm:px-0">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
         <div className="w-full md:w-auto">
            <div className="flex items-center gap-3 mb-4">
               <div className="bg-nesthub-accent w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-nesthub-accent/20">
                  <UserSquare2 size={26} strokeWidth={2.5} />
               </div>
               <h1 className="font-heading text-3xl md:text-4xl font-bold text-nesthub-primary tracking-tight">Visitor Management</h1>
            </div>
            <p className="text-gray-400 font-medium text-sm">Review access requests and monitor onsite visitor logs.</p>
         </div>
         
         <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center flex-1 md:flex-initial">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Currently Onsite</p>
               <h4 className="font-heading text-2xl font-black text-nesthub-primary leading-none tracking-tight">{activeInside} <span className="text-[10px] text-nesthub-accent uppercase tracking-widest ml-1 font-black">Visitors</span></h4>
            </div>
            <button className="p-4 bg-nesthub-primary text-white rounded-2xl shadow-xl shadow-nesthub-primary/20 hover:bg-[#204a35] transition-all active:scale-95 border border-white/10">
               <Settings2 size={24} strokeWidth={2.5} />
            </button>
         </div>
      </div>

      {/* Section 1: Pending Approvals */}
      <div className="mb-14">
         <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-nesthub-accent rounded-full shadow-sm shadow-nesthub-accent/50"></div>
            <h2 className="font-heading font-black text-xs uppercase tracking-widest text-nesthub-primary flex items-center gap-3">
               Awaiting Approval 
               <span className="bg-nesthub-primary/5 text-nesthub-primary px-2.5 py-0.5 rounded-lg text-[10px] font-black border border-nesthub-primary/10">{pendingApprovals.length}</span>
            </h2>
         </div>
         <div className="overflow-x-auto scrollbar-none pb-2">
            <VisitorRequests 
              requests={pendingApprovals}
              onReview={(req) => setSelectedRequest(req)}
            />
         </div>
      </div>

      {/* Section 2: Visitor Logs */}
      <div>
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-6 bg-gray-200 rounded-full"></div>
               <h2 className="font-heading font-black text-xs uppercase tracking-widest text-nesthub-primary">Historical Log History</h2>
            </div>
            <div className="bg-white px-5 py-3.5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 w-full sm:max-w-sm group focus-within:ring-2 focus-within:ring-nesthub-primary/5 transition-all">
               <Search size={18} className="text-gray-300 group-focus-within:text-nesthub-primary transition-colors" strokeWidth={2.5} />
               <input 
                 type="text" 
                 placeholder="Search log history by guest name..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-300 font-medium" 
               />
            </div>
         </div>
         <div className="min-h-[300px]">
            <VisitorLogs logs={historicalLogs} />
         </div>
      </div>

      {/* Footer Info */}
      <div className="mt-14 bg-gray-50/50 p-8 md:p-10 rounded-[48px] border border-gray-100 flex flex-col lg:flex-row items-center justify-between transition-all hover:bg-white hover:shadow-xl hover:shadow-nesthub-primary/5 group gap-10">
         <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left w-full lg:w-auto">
            <div className="w-20 h-20 rounded-[32px] bg-nesthub-primary/5 flex items-center justify-center text-nesthub-primary group-hover:bg-nesthub-primary group-hover:text-white transition-all duration-700 shadow-sm">
               <History size={36} strokeWidth={1.5} />
            </div>
            <div>
               <h4 className="font-heading text-xl font-bold text-nesthub-primary mb-2">Weekly Visitor Analytics</h4>
               <p className="text-sm text-gray-500 max-w-md leading-relaxed font-medium">Detailed report on visitor patterns, peak entry hours, and institutional visit frequency charts.</p>
            </div>
         </div>
         <button className="w-full lg:w-auto px-12 py-5 bg-white border border-gray-100 rounded-3xl font-black text-[10px] uppercase tracking-widest text-nesthub-primary hover:bg-gray-50 transition-all flex items-center justify-center gap-4 group-hover:border-nesthub-accent group-hover:shadow-lg transition-all active:scale-95 shadow-sm">
            Access Full Analytics
            <ChevronRight size={18} className="text-nesthub-accent group-hover:translate-x-1 transition-transform" strokeWidth={3} />
         </button>
      </div>

      {/* Approve Visitor Modal */}
      <ApproveVisitorModal
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        request={selectedRequest}
        onApprove={(data) => {
          console.log("Approved:", data);
          setSelectedRequest(null);
        }}
        onReject={(data) => {
          console.log("Rejected:", data);
          setSelectedRequest(null);
        }}
      />
    </div>
  );
}
