"use client";

import { useState } from "react";
import { X, IndianRupee } from "lucide-react";

const STUDENTS = [
  "Rahul Kumar", "Priya Sharma", "Ankit Verma", "Sneha Patel",
  "Vikram Singh", "Pooja Gupta", "Arjun Mehta", "Divya Nair",
];

const MONTHS = [
  "January 2025", "February 2025", "March 2025", "April 2025",
  "May 2025", "June 2025", "July 2025", "August 2025",
  "September 2025", "October 2025", "November 2025", "December 2025",
];

export function RecordPaymentModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    student: "",
    amount: "",
    date: "",
    method: "Cash",
    transactionId: "",
    month: "",
    remarks: "",
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
              <IndianRupee size={18} className="text-nesthub-accent" />
            </div>
            <h3 className="font-heading text-xl font-bold text-nesthub-primary tracking-tight">
              Record Payment
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
            {/* Student */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Student Name <span className="text-red-400">*</span>
              </label>
              <select
                name="student"
                value={form.student}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all bg-white"
              >
                <option value="">Search or select student...</option>
                {STUDENTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Amount */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  Payment Amount (₹) <span className="text-red-400">*</span>
                </label>
                <input
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 8000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  Payment Date <span className="text-red-400">*</span>
                </label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">
                Payment Method <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {["Cash", "UPI", "Bank Transfer", "Card"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, method: m }))}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                      form.method === m
                        ? "bg-nesthub-primary text-white border-nesthub-primary shadow-md"
                        : "bg-white text-gray-400 border-gray-200 hover:border-nesthub-primary/40"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Transaction ID / Reference{" "}
                <span className="text-gray-300 font-normal">(optional for cash)</span>
              </label>
              <input
                name="transactionId"
                value={form.transactionId}
                onChange={handleChange}
                placeholder="UTR / Transaction ref. number"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
              />
            </div>

            {/* Month/Period */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Month / Period <span className="text-red-400">*</span>
              </label>
              <select
                name="month"
                value={form.month}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all bg-white"
              >
                <option value="">Select billing month...</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Remarks
              </label>
              <textarea
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                rows={3}
                placeholder="Any additional notes about this payment..."
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
              Record Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
