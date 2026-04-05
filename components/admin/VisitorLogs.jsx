"use client";

import { CheckCircle, XCircle, Clock, User, ArrowRight } from "lucide-react";

export function VisitorRequests({ requests, onReview }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
       {requests.map((req) => (
         <div key={req.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-nesthub-accent/5 rounded-full -translate-y-8 translate-x-8 -z-0"></div>
            
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-center">
                     <img src={req.photo} alt={req.visitor} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-md" />
                     <div>
                        <h4 className="font-heading font-black text-nesthub-primary leading-tight">{req.visitor}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-nesthub-accent">{req.relation}</p>
                     </div>
                  </div>
                  <span className="text-[9px] font-mono font-black text-gray-300 tracking-tighter uppercase">{req.id}</span>
               </div>

               <div className="bg-gray-50/50 p-4 rounded-2xl mb-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                     <span className="text-gray-400 font-medium">Visiting</span>
                     <span className="text-nesthub-primary font-bold">{req.resident} ({req.room})</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                     <span className="text-gray-400 font-medium">Purpose</span>
                     <span className="text-nesthub-primary font-bold">{req.purpose}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                     <span className="text-gray-400 font-medium">Expected</span>
                     <div className="flex items-center gap-1.5 text-nesthub-primary font-bold">
                        <Clock size={12} className="text-nesthub-accent" />
                        {req.expected}
                     </div>
                  </div>
               </div>

               <div className="flex gap-3">
                  <button
                    onClick={() => onReview?.(req)}
                    className="flex-1 bg-nesthub-primary text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-nesthub-primary/20 hover:bg-[#204a35] transition-all flex items-center justify-center gap-2"
                  >
                     <CheckCircle size={14} /> Review & Approve
                  </button>
                  <button
                    onClick={() => onReview?.(req)}
                    className="p-3.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all border border-gray-100"
                  >
                     <XCircle size={18} />
                  </button>
               </div>
            </div>
         </div>
       ))}
    </div>
  );
}


export function VisitorLogs({ logs }) {
  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
       <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
             <tr className="border-b border-gray-50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Visitor</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Resident Info</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date & Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">In/Out</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Action</th>
             </tr>
          </thead>
          <tbody>
             {logs.map((log, idx) => (
               <tr 
                 key={idx} 
                 className={`group hover:bg-gray-50/50 transition-colors ${idx !== logs.length - 1 ? 'border-b border-gray-50' : ''}`}
               >
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-nesthub-primary group-hover:text-white transition-colors">
                           <User size={18} />
                        </div>
                        <span className="font-bold text-sm text-nesthub-primary">{log.visitor}</span>
                     </div>
                  </td>
                  <td className="px-8 py-6">
                     <p className="text-sm font-medium text-gray-500">{log.resident}</p>
                     <p className="text-[10px] font-black text-nesthub-accent uppercase tracking-tighter">Room {log.room}</p>
                  </td>
                  <td className="px-8 py-6">
                     <p className="text-[11px] font-bold text-gray-500 mb-1">{log.date}</p>
                     <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        log.status === 'Approved' ? 'bg-blue-50 text-blue-600' : 
                        log.status === 'Rejected' ? 'bg-red-50 text-red-600' : 
                        'bg-green-50 text-green-600'
                     }`}>
                        {log.status}
                     </span>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-4 text-[10px] font-bold">
                        <div className="text-nesthub-primary">
                           <p className="text-[9px] text-gray-300 uppercase mb-0.5">Checked In</p>
                           {log.in}
                        </div>
                        <ArrowRight size={12} className="text-gray-200" />
                        <div className="text-gray-400">
                           <p className="text-[9px] text-gray-300 uppercase mb-0.5">Checked Out</p>
                           {log.out}
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                     <button className="text-[10px] font-black uppercase tracking-widest text-nesthub-primary hover:text-nesthub-accent transition-colors">
                        View Log
                     </button>
                  </td>
               </tr>
             ))}
          </tbody>
       </table>
    </div>
  );
}
