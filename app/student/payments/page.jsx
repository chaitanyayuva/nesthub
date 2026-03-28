"use client";

import { usePayments } from "../../../hooks/usePayments";
import { CreditCard, History, ChevronRight, ReceiptText, AlertTriangle, Zap, HomeIcon } from "lucide-react";

export default function StudentPayments() {
  const { currentDues, totalAmount, history } = usePayments();

  const getDuesIcon = (type) => {
    switch(type) {
      case "Rent": return HomeIcon;
      case "Electricity": return Zap;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="p-6 pb-6 max-w-lg mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 px-2">
        <h1 className="font-heading text-3xl font-bold text-nesthub-primary tracking-tight">Payments</h1>
        <button className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm text-gray-400 hover:text-nesthub-primary transition-all active:scale-90">
          <ReceiptText size={20} />
        </button>
      </div>

      {/* Current Dues Card */}
      <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm mb-10 relative overflow-hidden group hover:shadow-2xl hover:shadow-nesthub-primary/5 transition-all duration-500">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-nesthub-accent/10 p-2.5 rounded-2xl">
             <CreditCard size={22} className="text-nesthub-accent" strokeWidth={2.5} />
          </div>
          <span className="font-heading font-black text-xs uppercase tracking-[0.2em] text-nesthub-primary">Current Statement</span>
        </div>

        <div className="space-y-5 mb-10">
          {currentDues.map((due) => {
            const Icon = getDuesIcon(due.type);
            return (
              <div key={due.id} className="flex justify-between items-center group/item">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl transition-transform group-hover/item:scale-110 ${due.color}`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-bold text-gray-500">{due.type}</span>
                </div>
                <span className="font-heading font-black text-nesthub-primary text-base tracking-tight">₹{due.amount.toLocaleString()}</span>
              </div>
            );
          })}
          
          <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
            <span className="font-heading font-black text-[10px] uppercase tracking-widest text-gray-400">Total Payable</span>
            <span className="font-heading font-black text-3xl text-nesthub-primary tracking-tighter">₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <button className="w-full bg-nesthub-accent hover:bg-[#E59734] text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-nesthub-accent/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
          Process Payment
          <ChevronRight size={18} strokeWidth={3} />
        </button>
      </div>

      {/* History Section */}
      <div className="px-2">
        <div className="flex items-center gap-3 mb-6">
          <History size={18} className="text-gray-300" />
          <h3 className="font-heading font-black text-xs uppercase tracking-widest text-gray-400">Transaction Vault</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {history.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-nesthub-primary/5 group-hover:text-nesthub-primary transition-all duration-300">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-nesthub-primary tracking-tight">{item.month}</h4>
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-heading font-black text-sm text-nesthub-primary mb-1.5 tracking-tight">₹{item.amount.toLocaleString()}</p>
                <span className="bg-[#DEF7EC] text-[#03543F] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Info */}
      <div className="mt-12 bg-nesthub-primary/5 p-6 rounded-[32px] border border-nesthub-primary/10 flex items-start gap-4">
        <div className="bg-white p-2.5 rounded-xl text-nesthub-primary shadow-sm shrink-0">
          <AlertTriangle size={18} />
        </div>
        <div>
           <p className="text-[10px] font-black uppercase tracking-widest text-nesthub-primary mb-1">Secure Transactions</p>
           <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
             All payments are encrypted and processed via secure gateways. Report any discrepancies immediately to the Finance Dept.
           </p>
        </div>
      </div>
    </div>
  );
}
