"use client";

import { useState } from "react";
import { X, UserSquare2, CheckCircle, XCircle } from "lucide-react";

export function ApproveVisitorModal({ isOpen, onClose, onApprove, onReject, request }) {
  const [remarks, setRemarks] = useState("");

  const handleApprove = () => {
    onApprove?.({ ...request, remarks });
    setRemarks("");
    onClose();
  };

  const handleReject = () => {
    onReject?.({ ...request, remarks });
    setRemarks("");
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
            <div className="bg-blue-100 p-2.5 rounded-xl">
              <UserSquare2 size={18} className="text-blue-600" />
            </div>
            <h3 className="font-heading text-xl font-bold text-nesthub-primary tracking-tight">
              Visitor Pass Request
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-nesthub-primary"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col overflow-hidden">
          <div className="p-8 overflow-y-auto space-y-6">
            {/* Request Details */}
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                Request Details
              </p>

              <div className="grid grid-cols-2 gap-y-4">
                {[
                  { label: "Request ID", value: request?.id || "—" },
                  { label: "Student Name", value: request?.resident || "—" },
                  { label: "Room Number", value: request?.room || "—" },
                  { label: "Visitor Name", value: request?.visitor || "—" },
                  { label: "Relationship", value: request?.relation || "—" },
                  { label: "Purpose", value: request?.purpose || "General Visit" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm font-bold text-nesthub-primary">{value}</p>
                  </div>
                ))}
              </div>

              {/* Date & Time */}
              <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                    Visit Date
                  </p>
                  <p className="text-sm font-bold text-nesthub-primary">
                    {request?.expected?.split(",")[0] || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                    Time Range
                  </p>
                  <p className="text-sm font-bold text-nesthub-primary">
                    {request?.expected?.split(",")[1]?.trim() || "—"}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Current Status
                </p>
                <span className="px-4 py-1.5 bg-orange-50 text-orange-600 border border-orange-100 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Pending Review
                </span>
              </div>
            </div>

            {/* Admin Remarks */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Admin Remarks
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                placeholder="Add notes or reason for rejection (optional)..."
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={handleReject}
              className="px-6 py-3 rounded-2xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <XCircle size={16} />
              Reject
            </button>
            <button
              type="button"
              onClick={handleApprove}
              className="px-7 py-3 rounded-2xl text-sm font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <CheckCircle size={16} />
              Approve Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
