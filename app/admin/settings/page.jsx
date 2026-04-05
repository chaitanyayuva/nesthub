"use client";

import { useState } from "react";
import {
  Settings, Bell, Shield, Users, Building2, Wifi, Moon, Sun,
  ChevronRight, Save, ToggleLeft, ToggleRight, Mail, Phone, Globe, Lock
} from "lucide-react";

const SECTIONS = [
  { id: "hostel", label: "Hostel Profile", icon: Building2 },
  { id: "notifications", label: "Notification Rules", icon: Bell },
  { id: "access", label: "Access & Security", icon: Shield },
  { id: "roles", label: "Roles & Permissions", icon: Users },
];

export default function AdminSettings() {
  const [activeSection, setActiveSection] = useState("hostel");
  const [hostel, setHostel] = useState({
    name: "NestHub Hostel",
    address: "Plot 14, Sector 7, New Delhi - 110085",
    phone: "+91 9876543210",
    email: "admin@nesthub.in",
    website: "www.nesthub.in",
    totalRooms: "48",
    capacity: "192",
    warden: "Mr. Rajesh Kumar",
  });
  const [notifications, setNotifications] = useState({
    paymentDue: true,
    visitorApproval: true,
    complaintUpdate: true,
    systemAlerts: false,
    weeklyReport: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${value ? "bg-nesthub-primary" : "bg-gray-200"}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${value ? "right-1" : "left-1"}`} />
    </button>
  );

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-nesthub-primary tracking-tight">System Settings</h1>
          <p className="text-gray-400 font-medium text-sm mt-1">Configure hostel profile, notifications, and access controls.</p>
        </div>
        <button
          onClick={handleSave}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 ${
            saved
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : "bg-nesthub-primary text-white shadow-xl shadow-nesthub-primary/20 hover:bg-[#204a35]"
          }`}
        >
          <Save size={16} strokeWidth={2.5} />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-4 space-y-1">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all text-left ${
                  activeSection === id
                    ? "bg-nesthub-primary text-white shadow-lg shadow-nesthub-primary/20"
                    : "text-gray-400 hover:bg-gray-50 hover:text-nesthub-primary"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Panel */}
        <div className="flex-1">
          {/* Hostel Profile */}
          {activeSection === "hostel" && (
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-6">
              <h2 className="font-heading text-xl font-bold text-nesthub-primary">Hostel Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: "Hostel Name", key: "name", icon: Building2 },
                  { label: "Warden Name", key: "warden", icon: Users },
                  { label: "Email Address", key: "email", icon: Mail },
                  { label: "Phone Number", key: "phone", icon: Phone },
                  { label: "Website", key: "website", icon: Globe },
                  { label: "Total Rooms", key: "totalRooms", icon: Building2 },
                  { label: "Total Capacity", key: "capacity", icon: Users },
                ].map(({ label, key, icon: Icon }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                      <Icon size={13} className="text-nesthub-accent" />
                      {label}
                    </label>
                    <input
                      value={hostel[key]}
                      onChange={(e) => setHostel((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">Full Address</label>
                  <textarea
                    value={hostel.address}
                    onChange={(e) => setHostel((p) => ({ ...p, address: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notification Rules */}
          {activeSection === "notifications" && (
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-6">
              <h2 className="font-heading text-xl font-bold text-nesthub-primary">Notification Rules</h2>
              <div className="space-y-4">
                {[
                  { key: "paymentDue", label: "Payment Due Reminders", desc: "Send alerts to students 3 days before rent is due" },
                  { key: "visitorApproval", label: "Visitor Pass Requests", desc: "Notify admin when a new visitor pass is submitted" },
                  { key: "complaintUpdate", label: "Complaint Status Updates", desc: "Alert students when their ticket status changes" },
                  { key: "systemAlerts", label: "System Alerts", desc: "Critical infrastructure and server health alerts" },
                  { key: "weeklyReport", label: "Weekly Summary Report", desc: "Automated weekly digest of payments, complaints, and occupancy" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-100 gap-4">
                    <div>
                      <p className="text-sm font-bold text-nesthub-primary">{label}</p>
                      <p className="text-[11px] text-gray-400 font-medium mt-0.5">{desc}</p>
                    </div>
                    <Toggle
                      value={notifications[key]}
                      onChange={(v) => setNotifications((p) => ({ ...p, [key]: v }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Access & Security */}
          {activeSection === "access" && (
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-6">
              <h2 className="font-heading text-xl font-bold text-nesthub-primary">Access & Security</h2>
              <div className="space-y-4">
                <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Change Admin Password</p>
                  <div className="space-y-3">
                    {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                      <div key={label}>
                        <label className="block text-xs font-bold text-gray-500 mb-1">{label}</label>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all pr-10"
                          />
                          <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                        </div>
                      </div>
                    ))}
                    <button className="mt-2 bg-nesthub-primary text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#204a35] transition-all">Update Password</button>
                  </div>
                </div>

                <div className="p-5 bg-orange-50/50 rounded-2xl border border-orange-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-nesthub-primary">Two-Factor Authentication</p>
                      <p className="text-[11px] text-gray-400 font-medium mt-0.5">Add an extra layer of security to your account</p>
                    </div>
                    <span className="px-3 py-1.5 bg-orange-100 text-orange-600 text-[9px] font-black uppercase tracking-wider rounded-full">Not Enabled</span>
                  </div>
                  <button className="mt-4 bg-nesthub-accent text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#E59734] transition-all">Enable 2FA</button>
                </div>
              </div>
            </div>
          )}

          {/* Roles & Permissions */}
          {activeSection === "roles" && (
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 space-y-6">
              <h2 className="font-heading text-xl font-bold text-nesthub-primary">Roles & Permissions</h2>
              <div className="space-y-4">
                {[
                  { role: "Chief Warden", perms: ["Full Access", "User Management", "Financial Reports", "Settings"], color: "bg-nesthub-primary text-white" },
                  { role: "Hostel Manager", perms: ["Student Mgmt", "Complaints", "Visitors", "Notices"], color: "bg-blue-500 text-white" },
                  { role: "Accounts Staff", perms: ["Payment Records", "Financial Reports", "Invoicing"], color: "bg-nesthub-accent text-white" },
                  { role: "Maintenance Staff", perms: ["Complaints", "Maintenance Tasks"], color: "bg-gray-500 text-white" },
                ].map(({ role, perms, color }) => (
                  <div key={role} className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shrink-0 ${color}`}>{role}</span>
                    <div className="flex flex-wrap gap-2 flex-1">
                      {perms.map((p) => (
                        <span key={p} className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-wider">{p}</span>
                      ))}
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-wider text-nesthub-primary hover:text-nesthub-accent transition-colors shrink-0">Edit</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
