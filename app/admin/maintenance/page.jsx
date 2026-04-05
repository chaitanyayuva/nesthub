"use client";

import { useState } from "react";
import {
  Wrench, Zap, Bed, Trash2, HelpCircle, AlertCircle,
  CheckCircle2, Clock, User, MapPin, Plus, Search, Filter
} from "lucide-react";

const MOCK_MAINTENANCE = [
  { id: "MT001", category: "Plumbing", subject: "Pipe burst in Ground Floor bathroom", room: "102", technician: "Mohan Lal", status: "Scheduled", date: "Apr 5, 2025", priority: "High" },
  { id: "MT002", category: "Electrical", subject: "Short circuit in Block B corridor lights", room: "B-Corridor", technician: "Suresh Kumar", status: "In Progress", date: "Apr 4, 2025", priority: "Critical" },
  { id: "MT003", category: "Furniture", subject: "Broken study table in Room 301", room: "301", technician: "Ravi Singh", status: "Completed", date: "Apr 3, 2025", priority: "Normal" },
  { id: "MT004", category: "Cleaning", subject: "Deep cleaning request for common room", room: "Common Area", technician: "Geeta Devi", status: "Scheduled", date: "Apr 6, 2025", priority: "Low" },
  { id: "MT005", category: "Electrical", subject: "Fan not working in Room 302", room: "302", technician: "Suresh Kumar", status: "In Progress", date: "Apr 4, 2025", priority: "High" },
  { id: "MT006", category: "Plumbing", subject: "Water heater malfunction in Block A", room: "A-Block", technician: "Mohan Lal", status: "Completed", date: "Apr 2, 2025", priority: "High" },
];

const CATEGORY_ICONS = { Plumbing: Wrench, Electrical: Zap, Furniture: Bed, Cleaning: Trash2 };

const STATUS_STYLES = {
  Scheduled: "bg-blue-50 text-blue-600 border-blue-100",
  "In Progress": "bg-orange-50 text-orange-600 border-orange-100",
  Completed: "bg-green-50 text-green-600 border-green-100",
};

const PRIORITY_STYLES = {
  Critical: "bg-red-500 text-white",
  High: "bg-orange-500 text-white",
  Normal: "bg-nesthub-primary text-white",
  Low: "bg-gray-400 text-white",
};

export default function AdminMaintenance() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = MOCK_MAINTENANCE.filter((t) => {
    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.room.toLowerCase().includes(search.toLowerCase()) ||
      t.technician.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    scheduled: MOCK_MAINTENANCE.filter(t => t.status === "Scheduled").length,
    inProgress: MOCK_MAINTENANCE.filter(t => t.status === "In Progress").length,
    completed: MOCK_MAINTENANCE.filter(t => t.status === "Completed").length,
  };

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-nesthub-primary tracking-tight">Maintenance Tracker</h1>
          <p className="text-gray-400 font-medium text-sm mt-1">Track and schedule all property maintenance tasks.</p>
        </div>
        <button className="w-full sm:w-auto bg-nesthub-primary text-white px-6 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-xl shadow-nesthub-primary/20 flex items-center justify-center gap-2.5 hover:bg-[#204a35] transition-all active:scale-95">
          <Plus size={16} strokeWidth={2.5} />
          Schedule Task
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Scheduled", value: stats.scheduled, icon: Clock, color: "text-blue-600 bg-blue-50", bar: "bg-blue-500" },
          { label: "In Progress", value: stats.inProgress, icon: Wrench, color: "text-orange-600 bg-orange-50", bar: "bg-orange-500" },
          { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-green-600 bg-green-50", bar: "bg-green-500" },
        ].map(({ label, value, icon: Icon, color, bar }) => (
          <div key={label} className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 flex items-center gap-5 hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all">
            <div className={`p-3.5 rounded-2xl ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
              <p className="font-heading font-black text-3xl text-nesthub-primary tracking-tight">{value}</p>
            </div>
            <div className="ml-auto w-1.5 h-16 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`${bar} rounded-full transition-all duration-700`}
                style={{ height: `${(value / MOCK_MAINTENANCE.length) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 bg-white border border-gray-100 rounded-2xl flex items-center gap-3 px-5 py-3.5 shadow-sm group focus-within:ring-2 focus-within:ring-nesthub-primary/10">
          <Search size={16} className="text-gray-300 group-focus-within:text-nesthub-primary transition-colors shrink-0" />
          <input
            type="text"
            placeholder="Search by issue, room or technician..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-300 font-medium"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {["All", "Scheduled", "In Progress", "Completed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`whitespace-nowrap px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                statusFilter === s
                  ? "bg-nesthub-primary text-white border-nesthub-primary shadow-lg"
                  : "bg-white text-gray-400 border-gray-100 hover:border-nesthub-primary/30"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filtered.map((task) => {
          const Icon = CATEGORY_ICONS[task.category] || HelpCircle;
          return (
            <div
              key={task.id}
              className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all group"
            >
              <div className={`p-3.5 rounded-2xl shrink-0 ${task.category === "Plumbing" ? "bg-blue-50 text-blue-500" : task.category === "Electrical" ? "bg-yellow-50 text-yellow-500" : task.category === "Furniture" ? "bg-orange-50 text-orange-500" : "bg-green-50 text-green-500"}`}>
                <Icon size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-1.5">
                  <h3 className="font-bold text-sm text-nesthub-primary truncate">{task.subject}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shrink-0 ${PRIORITY_STYLES[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <span className="flex items-center gap-1.5"><MapPin size={11} />{task.room}</span>
                  <span className="flex items-center gap-1.5"><User size={11} />{task.technician}</span>
                  <span className="flex items-center gap-1.5"><Clock size={11} />{task.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${STATUS_STYLES[task.status]}`}>
                  {task.status}
                </span>
                <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-nesthub-primary transition-colors px-3 py-2 rounded-xl hover:bg-gray-50">
                  View
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white rounded-[40px] border border-dashed border-gray-200 p-20 flex flex-col items-center justify-center text-center">
            <div className="bg-gray-50 p-6 rounded-3xl text-gray-200 mb-4"><Wrench size={48} strokeWidth={1} /></div>
            <p className="text-gray-500 font-bold">No tasks found</p>
          </div>
        )}
      </div>

      {/* Footer Banner */}
      <div className="mt-12 bg-nesthub-primary/5 p-8 rounded-[40px] border border-nesthub-primary/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3.5 rounded-2xl text-nesthub-primary shadow-sm"><AlertCircle size={22} /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-nesthub-primary mb-1">Pending Response</p>
            <p className="text-xs text-gray-500 font-medium">{stats.scheduled} tasks are awaiting technician confirmation.</p>
          </div>
        </div>
        <button className="whitespace-nowrap bg-nesthub-primary text-white px-8 py-3.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#204a35] transition-all">
          Send Reminders
        </button>
      </div>
    </div>
  );
}
