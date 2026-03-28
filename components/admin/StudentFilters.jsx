"use client";

import { Search, ChevronDown, Filter } from "lucide-react";

export function StudentFilters({ searchTerm, onSearchChange }) {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-[32px] border border-gray-100 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
       <div className="flex items-center gap-4 px-5 w-full max-w-lg bg-gray-50/50 rounded-2xl py-3.5 md:py-3 md:bg-transparent transition-all focus-within:ring-2 focus-within:ring-nesthub-primary/5">
          <Search size={20} className="text-gray-300 shrink-0" strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="Search by name, ID or institution..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-300 font-medium" 
          />
       </div>
       
       <div className="flex items-center gap-6 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8 overflow-x-auto scrollbar-none pb-2 md:pb-0">
          <div className="flex items-center gap-8 shrink-0">
             <div className="flex flex-col min-w-[80px]">
                <span className="text-[9px] font-black font-heading text-gray-300 uppercase tracking-widest mb-1">Status</span>
                <button className="flex items-center gap-2 text-xs font-bold text-nesthub-primary group whitespace-nowrap active:scale-95 transition-transform">
                   All Residents <ChevronDown size={14} className="text-nesthub-accent group-hover:translate-y-0.5 transition-transform" strokeWidth={3} />
                </button>
             </div>
             <div className="flex flex-col min-w-[80px]">
                <span className="text-[9px] font-black font-heading text-gray-300 uppercase tracking-widest mb-1">Floor</span>
                <button className="flex items-center gap-2 text-xs font-bold text-nesthub-primary group whitespace-nowrap active:scale-95 transition-transform">
                   All Floors <ChevronDown size={14} className="text-nesthub-accent group-hover:translate-y-0.5 transition-transform" strokeWidth={3} />
                </button>
             </div>
          </div>
          
          <button className="p-3.5 bg-gray-50 rounded-2xl text-nesthub-primary hover:bg-nesthub-primary hover:text-white transition-all ml-auto md:ml-4 shadow-sm active:scale-90 shrink-0 border border-gray-100/50">
             <Filter size={18} strokeWidth={2.5} />
          </button>
       </div>
    </div>
  );
}
