"use client";

import { useState } from "react";
import { BellRing, Plus, Search, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { PostNoticeModal } from "../../../components/admin/PostNoticeModal";

const MOCK_NOTICES = [
  { id: "N001", title: "Water Supply Disruption on Saturday", category: "Maintenance", priority: "High", date: "Apr 4, 2025", sendTo: "All Students", active: true },
  { id: "N002", title: "Monthly Rent Due - April 2025", category: "Payment", priority: "High", date: "Apr 1, 2025", sendTo: "All Students", active: true },
  { id: "N003", title: "Cultural Fest Registration Open", category: "Event", priority: "Normal", date: "Mar 28, 2025", sendTo: "All Students", active: true },
  { id: "N004", title: "New Visitor Policy Effective April 15", category: "Rule", priority: "Normal", date: "Mar 25, 2025", sendTo: "All Students", active: false },
  { id: "N005", title: "Hostel Day Celebration — April 20", category: "Event", priority: "Low", date: "Mar 20, 2025", sendTo: "All Students", active: false },
];

const CATEGORY_COLORS = {
  General: "bg-gray-100 text-gray-600",
  Urgent: "bg-red-100 text-red-600",
  Event: "bg-purple-100 text-purple-700",
  Maintenance: "bg-orange-100 text-orange-700",
  Payment: "bg-green-100 text-green-700",
  Rule: "bg-blue-100 text-blue-700",
};

const PRIORITY_COLORS = {
  High: "text-red-500",
  Normal: "text-blue-500",
  Low: "text-gray-400",
};

export default function AdminNotices() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [notices, setNotices] = useState(MOCK_NOTICES);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = notices.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePost = (data) => {
    const newNotice = {
      id: `N00${notices.length + 1}`,
      title: data.title,
      category: data.category,
      priority: data.priority,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      sendTo: data.sendTo,
      active: true,
    };
    setNotices((prev) => [newNotice, ...prev]);
  };

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 sm:px-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-nesthub-primary tracking-tight">
            Notice Board
          </h1>
          <p className="text-gray-400 font-medium text-sm mt-1">
            Broadcast announcements to students and staff.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="flex-1 sm:flex-none bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center gap-3 px-5 py-3.5 group focus-within:ring-2 focus-within:ring-nesthub-primary/10">
            <Search size={16} className="text-gray-300 group-focus-within:text-nesthub-primary transition-colors shrink-0" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-300 font-medium min-w-0"
            />
          </div>
          {/* Post Notice Button */}
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="shrink-0 bg-nesthub-primary text-white px-6 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-xl shadow-nesthub-primary/20 flex items-center gap-2.5 hover:bg-[#204a35] transition-all active:scale-95"
          >
            <Plus size={16} strokeWidth={2.5} />
            Post Notice
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Notices", value: notices.length, icon: BellRing, color: "text-nesthub-primary bg-nesthub-primary/10" },
          { label: "Active", value: notices.filter(n => n.active).length, icon: CheckCircle, color: "text-green-600 bg-green-50" },
          { label: "High Priority", value: notices.filter(n => n.priority === "High").length, icon: AlertTriangle, color: "text-red-500 bg-red-50" },
          { label: "Sent Today", value: 2, icon: Info, color: "text-blue-500 bg-blue-50" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all">
            <div className={`p-3 rounded-2xl ${color}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
              <p className="font-heading font-black text-2xl text-nesthub-primary tracking-tight">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Notice List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[40px] border border-dashed border-gray-200 p-20 flex flex-col items-center justify-center text-center">
            <div className="bg-gray-50 p-6 rounded-3xl text-gray-200 mb-4">
              <BellRing size={48} strokeWidth={1} />
            </div>
            <p className="text-gray-500 font-bold">No notices found</p>
            <p className="text-gray-400 text-sm mt-1">Post a new notice using the button above.</p>
          </div>
        ) : (
          filtered.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all group"
            >
              {/* Icon */}
              <div className={`p-3 rounded-2xl shrink-0 ${CATEGORY_COLORS[notice.category] || "bg-gray-100 text-gray-500"}`}>
                <BellRing size={20} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <h3 className="font-bold text-sm text-nesthub-primary truncate">{notice.title}</h3>
                  {notice.active && (
                    <span className="px-2.5 py-0.5 bg-green-50 text-green-600 border border-green-100 rounded-full text-[9px] font-black uppercase tracking-wider shrink-0">
                      Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-wider text-gray-400 flex-wrap">
                  <span className={PRIORITY_COLORS[notice.priority]}>{notice.priority} Priority</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full" />
                  <span>{notice.category}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full" />
                  <span>{notice.sendTo}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full" />
                  <span>{notice.date}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-gray-100 rounded-xl hover:text-nesthub-primary hover:bg-gray-50 transition-all">
                  Edit
                </button>
                <button className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-red-400 border border-red-50 rounded-xl hover:bg-red-50 transition-all">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Post Notice Modal */}
      <PostNoticeModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={(data) => {
          handlePost(data);
        }}
      />
    </div>
  );
}
