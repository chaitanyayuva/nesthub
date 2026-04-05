"use client";

import { useState } from "react";
import { useVisitors } from "../../../hooks/useVisitors";
import { RequestVisitorPassModal } from "../../../components/student/RequestVisitorPassModal";
import { UserPlus, UserCircle, Clock, QrCode, ShieldCheck, ChevronRight, Calendar, PlusCircle } from "lucide-react";

export default function StudentVisitors() {
  const { pendingApprovals, historicalLogs } = useVisitors();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  
  // Filter for current student "Rahul Kumar"
  const activePasses = pendingApprovals.filter(p => p.resident === "Rahul Kumar");

  return (
    <div className="p-6 pb-6 max-w-lg mx-auto w-full animate-fade-in transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-end mb-10 px-2">
        <div>
          <h1 className="font-heading text-3xl font-bold text-nesthub-primary tracking-tight">Visitor Pass</h1>
          <p className="text-gray-400 font-medium text-sm mt-2">Manage your guest entries securely.</p>
        </div>
        <button
          onClick={() => setIsRequestModalOpen(true)}
          className="bg-nesthub-primary text-white p-4 rounded-[22px] shadow-2xl shadow-nesthub-primary/20 hover:scale-110 active:scale-95 transition-all group"
        >
          <UserPlus size={24} className="group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Hero section if no active passes or to highlight active one */}
      <h2 className="font-heading font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6 px-2">Active Authorization</h2>
      
      {activePasses.length > 0 ? (
        activePasses.map((pass) => (
          <div key={pass.id} className="bg-white rounded-[48px] overflow-hidden shadow-2xl shadow-nesthub-primary/5 border border-gray-100 flex flex-col mb-12 animate-slide-up group hover:shadow-nesthub-primary/10 transition-all duration-500">
            {/* Card Header Top */}
            <div className="bg-nesthub-primary p-8 pb-10 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                     <ShieldCheck size={16} className="text-nesthub-accent" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-nesthub-accent">Secure Gateway Pass</span>
                  </div>
                  <h3 className="text-2xl font-heading font-black leading-tight mb-1">{pass.visitor}</h3>
                  <p className="text-xs text-white/50 font-bold uppercase tracking-widest">{pass.relation}</p>
               </div>
               
               {/* Abstract Background */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
            </div>

            {/* Card Main Info */}
            <div className="px-8 pb-10 -mt-6 relative z-20 bg-white rounded-t-[40px] pt-10 flex flex-col items-center">
               <div className="w-full flex justify-between gap-6 mb-10">
                  <div className="flex-1 bg-gray-50/50 p-5 rounded-3xl flex flex-col items-center justify-center gap-2 border border-gray-100 transition-all hover:bg-white hover:shadow-lg">
                     <Calendar size={20} className="text-nesthub-accent" />
                     <span className="text-xs text-nesthub-primary font-black uppercase tracking-tight">{pass.expected.split(',')[0]}</span>
                  </div>
                  <div className="flex-1 bg-gray-50/50 p-5 rounded-3xl flex flex-col items-center justify-center gap-2 border border-gray-100 transition-all hover:bg-white hover:shadow-lg">
                     <Clock size={20} className="text-nesthub-accent" />
                     <span className="text-xs text-nesthub-primary font-black uppercase tracking-tight">{pass.expected.split(',')[1]}</span>
                  </div>
               </div>

               {/* Large QR for scanning */}
               <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-xl shadow-nesthub-primary/5 mb-6 group-hover:scale-105 transition-transform duration-500 cursor-none">
                  <QrCode size={160} className="text-nesthub-primary opacity-90" strokeWidth={1} />
               </div>
               
               <p className="font-mono text-[9px] text-gray-400 font-black tracking-[0.4em] uppercase mb-8">Access Token: {pass.id}</p>
               
               <button className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:text-red-600 transition-colors px-6 py-3 bg-red-50/50 rounded-full">
                 Revoke Authorization
               </button>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-[48px] p-16 flex flex-col items-center justify-center text-center gap-4 mb-12">
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 text-gray-200">
               <UserCircle size={48} strokeWidth={1} />
            </div>
            <div>
               <p className="text-gray-500 font-bold text-sm">No Active Passes</p>
               <p className="text-gray-400 text-[10px] mt-1 font-bold uppercase tracking-wider">Your next guest will appear here</p>
            </div>
            <button
              onClick={() => setIsRequestModalOpen(true)}
              className="mt-4 flex items-center gap-2 text-nesthub-primary font-black text-[10px] uppercase tracking-widest hover:text-nesthub-accent transition-colors"
            >
               <PlusCircle size={14} />
               Request New
            </button>
        </div>
      )}

      {/* Past Visitors History */}
      <div className="px-2">
        <h2 className="font-heading font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">Historical Access</h2>
        <div className="space-y-4">
          {historicalLogs.slice(0, 3).map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-2xl hover:shadow-nesthub-primary/5 transition-all group active:scale-[0.98] cursor-pointer"
            >
              <div className="bg-gray-50 text-gray-400 p-3.5 rounded-2xl group-hover:bg-nesthub-primary group-hover:text-white transition-all duration-300 shrink-0">
                 <UserCircle size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-nesthub-primary truncate group-hover:text-nesthub-accent transition-colors">{item.visitor}</h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-black tracking-widest uppercase mt-1">
                  <span>{item.status || "Completed"}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                  <span>{item.date.split(',')[0]}</span>
                </div>
              </div>
              <div className="bg-gray-50/50 p-2 rounded-xl group-hover:bg-nesthub-primary/5">
                <ChevronRight size={16} className="text-gray-300 group-hover:text-nesthub-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Visitor Pass Modal */}
      <RequestVisitorPassModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={(data) => {
          console.log("Visitor pass request:", data);
        }}
      />
    </div>
  );
}
