"use client";

import { useState } from "react";
import { X, UserPlus, AlertTriangle } from "lucide-react";

const RELATIONSHIPS = ["Parent", "Sibling", "Friend", "Relative", "Guardian", "Other"];
const PURPOSES = ["Document Delivery", "Package Delivery", "Maintenance", "Personal Visit", "Other"];

export function RequestVisitorPassModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    visitorName: "",
    relationship: "",
    purpose: "Personal Visit",
    visitDate: "",
    fromTime: "",
    toTime: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
    setForm({ visitorName: "", relationship: "", purpose: "Personal Visit", visitDate: "", fromTime: "", toTime: "" });
    onClose();
  };

  if (!isOpen) return null;

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
            <div className="bg-nesthub-primary/10 p-2.5 rounded-xl">
              <UserPlus size={18} className="text-nesthub-primary" />
            </div>
            <h3 className="font-heading text-xl font-bold text-nesthub-primary tracking-tight">
              Request Visitor Pass
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
            {/* Visitor Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  Visitor's Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="visitorName"
                  value={form.visitorName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Sunita Sharma"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  Relationship <span className="text-red-400">*</span>
                </label>
                <select
                  name="relationship"
                  value={form.relationship}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all bg-white"
                >
                  <option value="">Select relationship</option>
                  {RELATIONSHIPS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Purpose Chips */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">
                Purpose of Visit <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {PURPOSES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, purpose: p }))}
                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all border ${
                      form.purpose === p
                        ? "bg-nesthub-primary text-white border-nesthub-primary shadow-md"
                        : "bg-white text-gray-400 border-gray-200 hover:border-nesthub-primary/40"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  Visit Date <span className="text-red-400">*</span>
                </label>
                <input
                  name="visitDate"
                  type="date"
                  value={form.visitDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  From Time <span className="text-red-400">*</span>
                </label>
                <input
                  name="fromTime"
                  type="time"
                  value={form.fromTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  To Time <span className="text-red-400">*</span>
                </label>
                <input
                  name="toTime"
                  type="time"
                  value={form.toTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                />
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex gap-3 items-start">
              <AlertTriangle size={18} className="text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-xs text-yellow-800 leading-relaxed font-medium">
                Visitor passes are <span className="font-bold">subject to admin approval</span>. 
                Your visitor must carry a{" "}
                <span className="font-bold">valid government-issued photo ID</span> at the
                time of entry. Passes are valid only for the requested time window.
              </div>
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
              className="px-7 py-3 rounded-2xl text-sm font-bold text-white bg-nesthub-accent hover:bg-[#E59734] shadow-lg shadow-nesthub-accent/20 transition-all active:scale-95"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
