"use client";

import { useState } from "react";
import { Sidebar } from "../../components/admin/Sidebar";
import { Search, Bell, Menu } from "lucide-react";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F0F2F5] font-sans selection:bg-nesthub-accent selection:text-white overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full lg:ml-72 transition-all duration-300">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 px-4 lg:px-10 flex items-center justify-between shrink-0 sticky top-0 z-30">
           <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2.5 text-gray-400 hover:text-nesthub-primary hover:bg-gray-50 rounded-xl transition-all border border-transparent active:border-gray-100"
              >
                 <Menu size={24} />
              </button>
              
              <div className="hidden sm:flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-2.5 max-w-md w-full focus-within:ring-2 focus-within:ring-nesthub-primary/5 focus-within:border-nesthub-primary/20 transition-all group">
                 <Search size={18} className="text-gray-300 group-focus-within:text-nesthub-primary transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Quick search students, rooms..." 
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-300 font-medium" 
                 />
              </div>
           </div>
           
           <div className="flex items-center gap-3 lg:gap-6">
              <button className="relative p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:text-nesthub-primary hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
              </button>
              
              <div className="hidden xs:block h-10 w-px bg-gray-100"></div>

              <div className="flex items-center gap-3 group cursor-pointer active:scale-95 transition-transform">
                 <div className="hidden sm:block text-right">
                    <p className="text-xs font-bold text-nesthub-primary leading-tight">Mr. Admin</p>
                    <p className="text-[10px] text-gray-400 font-medium tracking-tight">Chief Warden</p>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-nesthub-primary text-white flex items-center justify-center font-heading font-black border border-white/10 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-nesthub-primary/10">
                    A
                 </div>
              </div>
           </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 scrollbar-none">
            <div className="max-w-[1400px] mx-auto pb-10">
               {children}
            </div>
        </main>
      </div>
    </div>
  );
}
