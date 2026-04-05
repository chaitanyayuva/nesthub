"use client";

import { useState } from "react";
import { X, Wrench } from "lucide-react";

const STAFF = [
  "Electrician — Suresh Kumar",
  "Plumber — Mohan Lal",
  "Carpenter — Ravi Singh",
  "General Maintenance — Anwar Khan",
  "Housekeeping — Geeta Devi",
];

const RESOLUTION_TIMES = [
  "Within 2 Hours",
  "By Today",
  "By Tomorrow",
  "Within 3 Days",
  "This Week",
];

const PRIORITIES = ["Critical", "High", "Normal", "Low"];

export function AssignComplaintModal({ isOpen, onClose, onSubmit, complaint }) {
  const [form, setForm] = useState({
    assignTo: "",
    resolution: "",
    priority: "High",
    instructions: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ ...form, complaintId: complaint?.id });
    onClose();
  };

  if (!isOpen) return null;

  const priorityColors = {
    Critical: "bg-red-500 text-white border-red-500",
    High: "bg-orange-500 text-white border-orange-500",
    Normal: "bg-nesthub-primary text-white border-nesthub-primary",
    Low: "bg-gray-400 text-white border-gray-400",
  };
  const priorityInactive = {
    Critical: "text-red-400 border-red-200 hover:border-red-300",
    High: "text-orange-400 border-orange-200 hover:border-orange-300",
    Normal: "text-gray-400 border-gray-200 hover:border-nesthub-primary/40",
    Low: "text-gray-400 border-gray-200 hover:border-gray-300",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-nesthub-primary/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg relative z-10 animate-slide-up overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2.5 rounded-xl">
              <Wrench size={18} className="text-orange-500" />
            </div>
            <h3 className="font-heading text-xl font-bold text-nesthub-primary tracking-tight">
              Assign Complaint
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-nesthub-primary"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="p-8 overflow-y-auto space-y-5">
            {/* Complaint Summary Box */}
            {complaint && (
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  Complaint Details
                </p>
                <p className="text-sm font-bold text-nesthub-primary mb-1">
                  {complaint.issue || complaint.title}
                </p>
                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">
                  <span>{complaint.resident || complaint.reporter}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{complaint.room}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{complaint.date}</span>
                </div>
              </div>
            )}

            {/* Assign To */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Assign To <span className="text-red-400">*</span>
              </label>
              <select
                name="assignTo"
                value={form.assignTo}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all bg-white"
              >
                <option value="">Select staff member...</option>
                {STAFF.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Estimated Resolution */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Estimated Resolution Time <span className="text-red-400">*</span>
              </label>
              <select
                name="resolution"
                value={form.resolution}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all bg-white"
              >
                <option value="">Select timeframe...</option>
                {RESOLUTION_TIMES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">
                Priority Level
              </label>
              <div className="flex gap-2 flex-wrap">
                {PRIORITIES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, priority: p }))}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border bg-white ${
                      form.priority === p ? priorityColors[p] : priorityInactive[p]
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin Instructions */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Admin Instructions
              </label>
              <textarea
                name="instructions"
                value={form.instructions}
                onChange={handleChange}
                rows={3}
                placeholder="Specific tasks or access notes for the assigned staff..."
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-3 rounded-2xl text-sm font-bold text-white bg-nesthub-primary hover:bg-[#204a35] shadow-lg shadow-nesthub-primary/20 transition-all active:scale-95"
            >
              Assign Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
