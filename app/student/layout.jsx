"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard, Bell, User } from "lucide-react";

export default function StudentLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: Home, href: "/student" },
    { label: "Pay", icon: CreditCard, href: "/student/payments" },
    { label: "Notices", icon: Bell, href: "/student/notices" },
    { label: "Profile", icon: User, href: "/student/profile" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-nesthub-bg font-sans">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-100 px-6 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-50">
        <ul className="flex justify-between items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative ${
                    isActive ? "text-nesthub-primary -translate-y-1" : "text-gray-300 hover:text-gray-400"
                  }`}
                >
                  <div className={`p-2 rounded-2xl transition-all duration-500 ${isActive ? "bg-nesthub-primary/5 shadow-inner" : ""}`}>
                    <Icon
                      size={22}
                      strokeWidth={isActive ? 3 : 2}
                    />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? "opacity-100" : "opacity-0 translate-y-2"} transition-all duration-300`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-2 w-1 h-1 bg-nesthub-accent rounded-full animate-bounce"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
