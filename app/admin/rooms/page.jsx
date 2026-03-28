"use client";

import { useRooms } from "../../../hooks/useRooms";
import { RoomGrid } from "../../../components/admin/RoomGrid";
import { Info, Plus, LayoutGrid } from "lucide-react";

export default function AdminRooms() {
  const { rooms, floors, selectedFloor, setSelectedFloor, statuses } = useRooms();

  const getStatusColor = (status) => {
    switch(status) {
      case "Occupied": return "bg-blue-500 shadow-blue-500/20";
      case "Partial": return "bg-orange-800 shadow-orange-900/20";
      case "Available": return "bg-green-500 shadow-green-500/20";
      case "Maintenance": return "bg-red-500 shadow-red-500/20";
      default: return "bg-gray-200";
    }
  };

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 sm:px-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-6">
         <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-nesthub-primary tracking-tight">Room Inventory</h1>
            <p className="text-gray-400 font-medium text-sm mt-1">Monitor occupancy and manage room allocations.</p>
         </div>
         <button className="w-full sm:w-auto bg-nesthub-primary text-white px-6 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-xl shadow-nesthub-primary/20 flex items-center justify-center gap-2 hover:bg-[#204a35] transition-all active:scale-95">
            <Plus size={16} strokeWidth={2.5} />
            Bulk Import
         </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
         {/* Room Grid Main Area */}
         <div className="flex-1 space-y-8 w-full order-2 lg:order-1">
            {/* Floor Tabs */}
            <div className="bg-white p-2 rounded-[28px] border border-gray-100 shadow-sm flex items-center overflow-x-auto scrollbar-none gap-1">
               {floors.map((floor) => (
                 <button
                   key={floor.id}
                   onClick={() => setSelectedFloor(floor.id)}
                   className={`whitespace-nowrap px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shrink-0 ${
                     selectedFloor === floor.id 
                       ? "bg-nesthub-primary text-white shadow-lg shadow-nesthub-primary/20 scale-105" 
                       : "text-gray-400 hover:text-nesthub-primary hover:bg-gray-50 border border-transparent"
                   }`}
                 >
                   {floor.name}
                 </button>
               ))}
            </div>

            {/* Grid */}
            <div className="min-h-[400px]">
               <RoomGrid rooms={rooms} getStatusColor={getStatusColor} />
            </div>
            
            {/* Add Room Button (Simplified for responsive flow) */}
            <button className="w-full sm:w-max px-12 rounded-[32px] border-2 border-dashed border-gray-100 p-8 flex flex-col items-center justify-center text-gray-300 hover:border-nesthub-primary/30 hover:bg-white hover:text-nesthub-primary transition-all group min-h-[140px] bg-gray-50/30 active:scale-95">
               <div className="p-3 bg-white rounded-2xl mb-3 shadow-sm group-hover:bg-nesthub-primary/5 transition-colors ring-1 ring-gray-100">
                  <Plus size={24} strokeWidth={2.5} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-center">Add New Room Unit</span>
            </button>
         </div>

         {/* Sidebar / Legend Area */}
         <div className="w-full lg:w-80 space-y-6 order-1 lg:order-2">
            <div className="bg-white p-6 sm:p-8 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden relative">
               <div className="absolute top-0 right-0 p-4 opacity-5 text-nesthub-primary">
                  <LayoutGrid size={80} />
               </div>
               <h3 className="font-heading text-xl font-bold text-nesthub-primary tracking-tight mb-8 relative z-10">Legend</h3>
               <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 gap-5">
                  {statuses.map((s, idx) => (
                    <div key={idx} className="flex gap-4 items-center group cursor-default">
                       <div className={`w-11 h-11 rounded-2xl ${s.color} shrink-0 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform flex items-center justify-center text-white/20`}>
                          <LayoutGrid size={16} />
                       </div>
                       <div className="min-w-0">
                          <p className="text-xs font-bold text-nesthub-primary leading-tight line-clamp-1">{s.label}</p>
                          <p className="text-[9px] text-gray-400 font-medium tracking-tight whitespace-nowrap truncate">{s.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-nesthub-primary p-8 rounded-[40px] border border-white/5 shadow-2xl shadow-nesthub-primary/20 text-white relative overflow-hidden hidden sm:block">
               <div className="absolute -bottom-6 -right-6 text-white opacity-5 rotate-12">
                  <LayoutGrid size={140} />
               </div>
               
               <div className="relative z-10">
                  <div className="w-10 h-10 bg-nesthub-accent rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-black/20">
                     <Info size={18} className="text-white" strokeWidth={3} />
                  </div>
                  <h4 className="font-heading text-lg font-bold mb-2 tracking-tight">Pro Tip</h4>
                  <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                     You can easily reassign residents by clicking on a room card and selecting the <span className="text-nesthub-accent font-bold">"Reallocate"</span> option in the management quick-menu.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
