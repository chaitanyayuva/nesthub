"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  UserPlus, ArrowLeft, ChevronRight, User, Phone,
  Calendar, Clock, Home, Heart, Briefcase, Users, AlertTriangle, Send
} from "lucide-react";

const RELATIONS = [
  { id: "parent", icon: Home, label: "Parent" },
  { id: "sibling", icon: Users, label: "Sibling" },
  { id: "friend", icon: Heart, label: "Friend" },
  { id: "colleague", icon: Briefcase, label: "Colleague" },
];

const PURPOSES = [
  "Family Visit", "Academic Discussion", "Delivery", "Medical Care", "Personal Work", "Other"
];

export default function NewVisitorPassPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    visitorName: "", visitorPhone: "", relation: "parent",
    purpose: "Family Visit", visitDate: "", visitTime: "", notes: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => router.back(), 2200);
  };

  const isValid = form.visitorName && form.visitorPhone && form.visitDate && form.visitTime;

  return (
    <div className="p-6 pb-6 max-w-lg mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => router.back()} className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-nesthub-primary transition-all shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-heading text-2xl font-bold text-nesthub-primary tracking-tight">Request Visitor Pass</h1>
          <p className="text-gray-400 text-sm font-medium mt-0.5">Submit a gate entry authorization request.</p>
        </div>
      </div>

      {submitted && (
        <div className="mb-6 bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3 animate-slide-up">
          <div className="bg-green-500 p-2 rounded-xl text-white"><Send size={16} /></div>
          <div>
            <p className="font-bold text-sm text-green-700">Pass Requested!</p>
            <p className="text-xs text-green-600">Admin will review and approve your request shortly.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Relation Select */}
        <div>
          <label className="block font-heading font-black text-[10px] uppercase tracking-widest text-gray-400 mb-5">Visitor Relationship</label>
          <div className="grid grid-cols-4 gap-3">
            {RELATIONS.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => set("relation", id)}
                className={`flex flex-col items-center gap-2.5 p-4 rounded-[24px] border-2 transition-all duration-300 ${
                  form.relation === id
                    ? "bg-nesthub-primary border-nesthub-primary text-white shadow-xl shadow-nesthub-primary/20 -translate-y-1"
                    : "bg-white border-gray-100 text-gray-400 hover:border-nesthub-primary/20"
                }`}
              >
                <Icon size={20} />
                <span className="text-[9px] font-black uppercase tracking-wider">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-7 space-y-5">
          {/* Visitor Identity */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                <User size={12} className="text-nesthub-accent" /> Visitor Full Name
              </label>
              <input
                value={form.visitorName}
                onChange={(e) => set("visitorName", e.target.value)}
                placeholder="e.g. Anil Kumar"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Phone size={12} className="text-nesthub-accent" /> Visitor Phone Number
              </label>
              <input
                value={form.visitorPhone}
                onChange={(e) => set("visitorPhone", e.target.value)}
                placeholder="+91 9876543210"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
              />
            </div>
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-3">Purpose of Visit</label>
            <div className="flex flex-wrap gap-2">
              {PURPOSES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => set("purpose", p)}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                    form.purpose === p
                      ? "bg-nesthub-primary text-white border-nesthub-primary"
                      : "bg-gray-50 text-gray-400 border-gray-100 hover:border-nesthub-primary/30"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Calendar size={12} className="text-nesthub-accent" /> Visit Date
              </label>
              <input
                type="date"
                value={form.visitDate}
                onChange={(e) => set("visitDate", e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Clock size={12} className="text-nesthub-accent" /> Expected Time
              </label>
              <input
                type="time"
                value={form.visitTime}
                onChange={(e) => set("visitTime", e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">Additional Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              placeholder="Any specific details for the warden..."
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all resize-none"
            />
          </div>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex gap-3 items-start">
          <AlertTriangle size={18} className="text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-700 font-medium leading-relaxed">
            Visitor passes are valid only on the requested date and must be approved by hostel admin before entry.
          </p>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-nesthub-primary text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-nesthub-primary/20 hover:bg-[#204a35] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit Pass Request
          <ChevronRight size={18} strokeWidth={3} />
        </button>
      </form>
    </div>
  );
}
