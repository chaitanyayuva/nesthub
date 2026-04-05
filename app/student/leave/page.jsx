"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Calendar, Clock, FileText, ArrowLeft, Send, 
  ChevronRight, AlertTriangle, Home, Plane, Stethoscope, Users2 
} from "lucide-react";

const REASONS = [
  { id: "home", icon: Home, label: "Home Visit", color: "bg-green-50 text-green-600" },
  { id: "medical", icon: Stethoscope, label: "Medical", color: "bg-red-50 text-red-600" },
  { id: "travel", icon: Plane, label: "Travel / Trip", color: "bg-blue-50 text-blue-600" },
  { id: "family", icon: Users2, label: "Family Event", color: "bg-purple-50 text-purple-600" },
];

const MOCK_LEAVE_HISTORY = [
  { id: "LV001", reason: "Home Visit", from: "Apr 1", to: "Apr 3", days: 3, status: "Approved" },
  { id: "LV002", reason: "Medical", from: "Mar 20", to: "Mar 21", days: 2, status: "Approved" },
  { id: "LV003", reason: "Travel / Trip", from: "Mar 5", to: "Mar 8", days: 4, status: "Rejected" },
];

const STATUS_COLORS = {
  Approved: "bg-green-50 text-green-600 border-green-100",
  Rejected: "bg-red-50 text-red-600 border-red-100",
  Pending: "bg-orange-50 text-orange-600 border-orange-100",
};

export default function StudentLeave() {
  const [reason, setReason] = useState("home");
  const [form, setForm] = useState({ fromDate: "", toDate: "", details: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const calcDays = () => {
    if (!form.fromDate || !form.toDate) return 0;
    const diff = new Date(form.toDate) - new Date(form.fromDate);
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-6 pb-6 max-w-lg mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="mb-10 px-2">
        <h1 className="font-heading text-3xl font-bold text-nesthub-primary tracking-tight">Leave Request</h1>
        <p className="text-gray-400 font-medium text-sm mt-2">Apply for hostel leave with all necessary details.</p>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="mb-6 bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3 animate-slide-up">
          <div className="bg-green-500 p-2 rounded-xl text-white"><Send size={16} /></div>
          <div>
            <p className="font-bold text-sm text-green-700">Request Submitted!</p>
            <p className="text-xs text-green-600">Your leave application is pending admin approval.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Reason Selection */}
        <div>
          <label className="block font-heading font-black text-[10px] uppercase tracking-widest text-gray-400 mb-5 px-2">
            Reason for Leave
          </label>
          <div className="grid grid-cols-2 gap-4">
            {REASONS.map(({ id, icon: Icon, label, color }) => (
              <button
                key={id}
                type="button"
                onClick={() => setReason(id)}
                className={`flex flex-col items-center gap-3.5 p-6 rounded-[28px] border-2 transition-all duration-300 ${
                  reason === id
                    ? "bg-nesthub-primary border-nesthub-primary text-white shadow-2xl shadow-nesthub-primary/20 -translate-y-1"
                    : "bg-white border-gray-100 text-gray-400 hover:border-nesthub-primary/20 hover:shadow-lg"
                }`}
              >
                <div className={`p-3 rounded-2xl ${reason === id ? "bg-white/10" : color}`}>
                  <Icon size={22} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-7 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Calendar size={13} className="text-nesthub-accent" /> From Date
              </label>
              <input
                type="date"
                name="fromDate"
                value={form.fromDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Calendar size={13} className="text-nesthub-accent" /> To Date
              </label>
              <input
                type="date"
                name="toDate"
                value={form.toDate}
                onChange={handleChange}
                required
                min={form.fromDate}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
              />
            </div>
          </div>

          {calcDays() > 0 && (
            <div className="bg-nesthub-primary/5 rounded-2xl p-4 flex items-center gap-3 border border-nesthub-primary/10">
              <Clock size={18} className="text-nesthub-primary" />
              <p className="text-sm font-bold text-nesthub-primary">
                Duration: <span className="text-nesthub-accent">{calcDays()} day{calcDays() !== 1 ? "s" : ""}</span>
              </p>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
              <FileText size={13} className="text-nesthub-accent" /> Additional Details
            </label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              rows={3}
              placeholder="Provide any additional context for your leave request..."
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all resize-none"
            />
          </div>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex gap-3 items-start">
          <AlertTriangle size={18} className="text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-800 font-medium leading-relaxed">
            Leave requests must be submitted <strong>at least 24 hours in advance</strong>. Emergency leaves require warden approval in person.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-nesthub-primary text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-nesthub-primary/20 hover:bg-[#204a35] transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          Submit Leave Request
          <ChevronRight size={18} strokeWidth={3} />
        </button>
      </form>

      {/* Past Leave History */}
      <div className="mt-12 px-2">
        <h2 className="font-heading font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">Past Applications</h2>
        <div className="space-y-4">
          {MOCK_LEAVE_HISTORY.map((leave) => (
            <div
              key={leave.id}
              className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-5 flex items-center justify-between hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all"
            >
              <div>
                <p className="font-bold text-sm text-nesthub-primary">{leave.reason}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">
                  {leave.from} → {leave.to} · {leave.days} days
                </p>
              </div>
              <span className={`px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${STATUS_COLORS[leave.status]}`}>
                {leave.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
