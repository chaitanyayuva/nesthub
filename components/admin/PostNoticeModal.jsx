"use client";

import { useState } from "react";
import { X, BellRing } from "lucide-react";

const CATEGORIES = ["General", "Urgent", "Event", "Maintenance", "Payment", "Rule"];
const PRIORITIES = ["High", "Normal", "Low"];
const AUDIENCES = [
  "All Students",
  "Block A Residents",
  "Block B Residents",
  "Block C Residents",
  "Final Year Students",
];

export function PostNoticeModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    category: "General",
    priority: "Normal",
    description: "",
    sendTo: "All Students",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
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
            <div className="bg-nesthub-accent/10 p-2.5 rounded-xl">
              <BellRing size={18} className="text-nesthub-accent" />
            </div>
            <h3 className="font-heading text-xl font-bold text-nesthub-primary tracking-tight">
              Post New Notice
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
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Notice Title <span className="text-red-400">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Water Supply Disruption on Saturday"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, category: c }))}
                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all border ${
                      form.category === c
                        ? "bg-nesthub-primary text-white border-nesthub-primary shadow-md"
                        : "bg-white text-gray-400 border-gray-200 hover:border-nesthub-primary/40"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">
                Priority Level <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                {PRIORITIES.map((p) => {
                  const colors = {
                    High: form.priority === p ? "bg-red-500 text-white border-red-500" : "text-red-400 border-red-200 hover:border-red-300",
                    Normal: form.priority === p ? "bg-nesthub-primary text-white border-nesthub-primary" : "text-gray-400 border-gray-200 hover:border-nesthub-primary/40",
                    Low: form.priority === p ? "bg-gray-500 text-white border-gray-500" : "text-gray-400 border-gray-200 hover:border-gray-300",
                  };
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, priority: p }))}
                      className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border bg-white ${colors[p]}`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Write the notice content here..."
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Send To */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  Send To <span className="text-red-400">*</span>
                </label>
                <select
                  name="sendTo"
                  value={form.sendTo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all bg-white"
                >
                  {AUDIENCES.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  Expiry Date
                </label>
                <input
                  name="expiryDate"
                  type="date"
                  value={form.expiryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                />
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
              className="px-7 py-3 rounded-2xl text-sm font-bold text-white bg-nesthub-primary hover:bg-[#204a35] shadow-lg shadow-nesthub-primary/20 transition-all active:scale-95"
            >
              Post Notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
