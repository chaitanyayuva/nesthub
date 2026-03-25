"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Avatar } from "../ui/Avatar";

export function AdminTopBar({ contextInfo, showNotificationDot }) {
  const pathname = usePathname();
  
  // Generate title dynamically from the path (e.g. '/admin/students' -> 'Students')
  const title = pathname === "/admin" 
    ? "Dashboard" 
    : pathname.split("/").pop().charAt(0).toUpperCase() + pathname.split("/").pop().slice(1);

  return (
    <header className="h-[72px] px-6 border-b border-nesthub-border flex items-center justify-between bg-nesthub-surface sticky top-0 z-10">
      
      {/* Title & Context */}
      <div>
        <h1 
          className="text-lg font-bold text-nesthub-text-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h1>
        {contextInfo && (
          <p className="text-[12px] text-nesthub-text-muted mt-0.5">
            {contextInfo}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:block w-64">
          <Search 
            size={16} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-nesthub-text-muted" 
          />
          <input
            type="text"
            placeholder="Search students, rooms..."
            className="w-full bg-nesthub-bg border border-nesthub-border rounded-lg pl-9 pr-4 py-2 text-[13px] outline-none focus:border-nesthub-primary transition-colors text-nesthub-text-primary placeholder:text-nesthub-text-muted"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-nesthub-text-secondary hover:bg-nesthub-bg rounded-lg transition-colors">
          <Bell size={20} />
          {showNotificationDot && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-nesthub-surface" />
          )}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-nesthub-border">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-medium text-nesthub-text-primary">
              Admin User
            </p>
            <p className="text-[11px] text-nesthub-text-muted">
              Warden
            </p>
          </div>
          <Avatar name="Admin User" size={36} />
        </div>
      </div>
    </header>
  );
}
