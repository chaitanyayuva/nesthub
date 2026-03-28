"use client";

import { DoorOpen, ChevronRight } from "lucide-react";

export function RoomGrid({ rooms, getStatusColor }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
       {rooms.map((room) => (
         <RoomCard key={room.id} room={room} getStatusColor={getStatusColor} />
       ))}
    </div>
  );
}

export function RoomCard({ room, getStatusColor }) {
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 group hover:shadow-2xl hover:shadow-nesthub-primary/5 transition-all duration-500 cursor-pointer">
       <div className="flex justify-between items-start mb-8">
          <div className={`w-12 h-12 rounded-2xl ${getStatusColor(room.status)} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
             <DoorOpen size={24} strokeWidth={2.5} />
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Room</p>
             <h4 className="text-2xl font-heading font-black text-nesthub-primary leading-none tracking-tight">{room.id}</h4>
          </div>
       </div>
       
       <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-gray-400">
             <span>Occupancy</span>
             <span className="text-nesthub-primary font-black">{room.occupied}/{room.beds} Beds</span>
          </div>
          
          <div className="h-2 bg-gray-50 rounded-full overflow-hidden flex gap-0.5">
             {Array.from({ length: room.beds }).map((_, i) => (
               <div 
                 key={i} 
                 className={`flex-1 transition-all duration-700 ${i < room.occupied ? getStatusColor(room.status).split(' ')[0] : 'bg-gray-200'}`}
               ></div>
             ))}
          </div>

          <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
             <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
               room.status === 'Available' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'
             }`}>
               {room.status}
             </span>
             <ChevronRight size={14} className="text-gray-300 group-hover:text-nesthub-primary group-hover:translate-x-1 transition-all" />
          </div>
       </div>
    </div>
  );
}
