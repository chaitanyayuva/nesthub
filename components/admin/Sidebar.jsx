"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users2,
  DoorOpen,
  CreditCard,
  MessageSquareWarning,
  UserSquare2,
  Settings,
  LogOut,
  ChevronRight,
  Wrench,
  X
} from "lucide-react";

export function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: BarChart3 },
    { name: "Rooms", href: "/admin/rooms", icon: DoorOpen },
    { name: "Students", href: "/admin/students", icon: Users2 },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Complaints", href: "/admin/complaints", icon: MessageSquareWarning },
    { name: "Maintenance", href: "/admin/maintenance", icon: Wrench },
    { name: "Visitors", href: "/admin/visitors", icon: UserSquare2 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Sidebar fixed for desktop, drawer for mobile */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-nesthub-primary text-white flex flex-col z-50 transition-transform duration-300 transform lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-8 pb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-nesthub-accent w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-black/20">
              <div className="w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            <span className="font-heading text-xl font-bold tracking-tight"> Obsidian <span className="text-nesthub-accent font-black">House</span></span>
          </div>

          {/* Close button for mobile */}
          <button onClick={onClose} className="lg:hidden p-2 text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) onClose(); }}
                className={`flex items-center gap-3.5 px-6 py-4 rounded-2xl font-bold text-sm transition-all group ${isActive
                  ? "bg-white/10 text-white border border-white/5 shadow-md"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon size={20} className={isActive ? "text-nesthub-accent" : "group-hover:text-white/80 transition-colors"} strokeWidth={isActive ? 2.5 : 2} />
                <span className="flex-1 text-sm tracking-wide uppercase font-black text-[10px]">{item.name}</span>
                {isActive && <ChevronRight size={14} className="text-nesthub-accent" strokeWidth={3} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-white/5 rounded-[24px] p-5 border border-white/5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-nesthub-accent/20 border-2 border-nesthub-accent flex items-center justify-center text-nesthub-accent font-black text-xs">AD</div>
              <div>
                <p className="text-xs font-bold leading-tight">Admin Portal</p>
                <p className="text-[10px] text-white/40 tracking-tight">Main Building</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase text-red-400 hover:text-red-300 transition-colors w-full">
              <LogOut size={16} />
              Sign Out
            </button>
          </div>

          <div className="flex items-center gap-2 text-white/30 text-[10px] font-medium tracking-tight px-4 pb-2">
            <Settings size={14} />
            <span>v1.0.4-stable</span>
          </div>
        </div>
      </aside>
    </>
  );
}
