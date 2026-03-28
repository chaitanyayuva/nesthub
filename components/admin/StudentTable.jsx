"use client";

import { Users2, Mail, Phone, MoreHorizontal, ArrowUpRight } from "lucide-react";

export function StudentTable({ students }) {
  const getStatusBadge = (status) => {
    switch(status) {
      case "Paid": return "bg-green-50 text-green-600 ring-1 ring-green-100";
      case "Pending": return "bg-orange-50 text-orange-600 ring-1 ring-orange-100";
      case "Overdue": return "bg-red-50 text-red-600 ring-1 ring-red-100";
      default: return "bg-gray-50 text-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-gray-50">
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Resident</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Institution</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Room</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Rent Status</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Join Date</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr 
              key={student.id} 
              className={`group hover:bg-gray-50/50 transition-colors ${idx !== students.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-nesthub-primary/5 text-nesthub-primary flex items-center justify-center font-heading font-black border border-gray-100 group-hover:bg-nesthub-primary group-hover:text-white group-hover:scale-105 transition-all duration-300 uppercase">
                    {student.name.split(' ')[0][0]}{student.name.split(' ')[1]?.[0] || ""}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-nesthub-primary flex items-center gap-2">
                      {student.name}
                      <ArrowUpRight size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                    <p className="text-[10px] font-mono font-semibold text-gray-300 tracking-tight uppercase">{student.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-50 rounded-xl text-gray-400">
                    <Users2 size={16} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-medium text-gray-500 line-clamp-1">{student.institution}</span>
                </div>
              </td>
              <td className="px-8 py-6">
                <span className="text-sm font-black text-nesthub-primary bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 tracking-tighter">{student.room}</span>
              </td>
              <td className="px-8 py-6">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap ${getStatusBadge(student.rentStatus)}`}>
                  {student.rentStatus}
                </span>
              </td>
              <td className="px-8 py-6">
                <p className="text-xs font-bold text-gray-500 whitespace-nowrap">{student.joinDate}</p>
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="p-2.5 rounded-xl text-gray-400 hover:text-nesthub-primary hover:bg-nesthub-primary/5 transition-all">
                    <Mail size={18} />
                  </button>
                  <button className="p-2.5 rounded-xl text-gray-400 hover:text-nesthub-primary hover:bg-nesthub-primary/5 transition-all">
                    <Phone size={18} />
                  </button>
                  <button className="p-2.5 rounded-xl text-gray-400 hover:text-nesthub-primary hover:bg-gray-50 transition-all">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
