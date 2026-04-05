"use client";

import { X, Lock, CreditCard } from "lucide-react";

export function ConfirmPaymentModal({ isOpen, onClose, onConfirm, dues = [] }) {
  const baseRent = dues.find((d) => d.type === "Rent")?.amount || 0;
  const utilities = dues.filter((d) => d.type !== "Rent").reduce((s, d) => s + d.amount, 0);
  const total = baseRent + utilities;

  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-nesthub-primary/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md relative z-10 animate-slide-up overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2.5 rounded-xl">
              <CreditCard size={18} className="text-blue-600" />
            </div>
            <h3 className="font-heading text-xl font-bold text-nesthub-primary tracking-tight">
              Confirm Payment
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-nesthub-primary"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Billing Summary */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
              Billing Summary — {currentMonth}
            </p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Base Rent</span>
                <span className="text-sm font-bold text-nesthub-primary">₹{baseRent.toLocaleString()}</span>
              </div>
              {dues.filter((d) => d.type !== "Rent").map((due) => (
                <div key={due.id} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">{due.type}</span>
                  <span className="text-sm font-bold text-nesthub-primary">₹{due.amount.toLocaleString()}</span>
                </div>
              ))}

              <div className="pt-4 border-t-2 border-dashed border-gray-100 flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                  Total Amount
                </span>
                <span className="text-2xl font-heading font-black text-nesthub-primary tracking-tight">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 items-start">
            <Lock size={18} className="text-blue-500 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-700 leading-relaxed font-medium">
              You will be redirected to a{" "}
              <span className="font-bold">secure payment gateway</span>. Please do not
              refresh or close the window during the transaction. Your payment is
              encrypted and protected.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => { onConfirm?.(); onClose(); }}
            className="px-7 py-3 rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <CreditCard size={16} />
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}
