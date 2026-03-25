import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminTopBar } from "../../components/admin/AdminTopBar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-nesthub-bg">
      <AdminSidebar />
      <div className="flex-1 ml-[200px] flex flex-col min-h-screen">
        <AdminTopBar contextInfo="Sterling Heights Hostel" showNotificationDot />
        
        {/* Main Content Area */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
