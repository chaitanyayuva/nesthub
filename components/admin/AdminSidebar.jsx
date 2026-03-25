"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  BedDouble, 
  CreditCard, 
  AlertCircle,
  LogOut 
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Rooms", href: "/admin/rooms", icon: BedDouble },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Complaints", href: "/admin/complaints", icon: AlertCircle },
  ];

  return (
    <aside className="fixed left-0 top-0 w-[200px] h-screen bg-nesthub-surface border-r border-nesthub-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-nesthub-border">
        <h1
          className="text-xl font-bold text-nesthub-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          NestHub
        </h1>
        <p className="text-[10px] text-nesthub-text-muted mt-1 uppercase tracking-wider">
          Admin Portal
        </p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                isActive
                  ? "bg-nesthub-primary text-white shadow-md shadow-nesthub-primary/20"
                  : "text-nesthub-text-secondary hover:bg-nesthub-bg hover:text-nesthub-text-primary"
              }`}
            >
              <Icon size={16} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-nesthub-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={16} />
          Sign out
        </Link>
      </div>
    </aside>
  );
}
