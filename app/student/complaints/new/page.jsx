"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Wrench, Zap, Bed, Trash2, HelpCircle, 
  ChevronRight, ArrowLeft, FileText, Camera, Send
} from "lucide-react";

const CATEGORIES = [
  { id: "Plumbing", icon: Wrench, label: "Plumbing", color: "bg-blue-50 text-blue-500" },
  { id: "Electrical", icon: Zap, label: "Electrical", color: "bg-yellow-50 text-yellow-500" },
  { id: "Furniture", icon: Bed, label: "Furniture", color: "bg-orange-50 text-orange-500" },
  { id: "Cleaning", icon: Trash2, label: "Cleaning", color: "bg-green-50 text-green-500" },
  { id: "Other", icon: HelpCircle, label: "Other", color: "bg-purple-50 text-purple-500" },
];

export default function NewComplaintPage() {
  const router = useRouter();
  const [category, setCategory] = useState("Plumbing");
  const [priority, setPriority] = useState("P2");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => router.back(), 2000);
  };

  return (
    <div className="p-6 pb-6 max-w-lg mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => router.back()} className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-nesthub-primary transition-all shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-heading text-2xl font-bold text-nesthub-primary tracking-tight">Raise Support Ticket</h1>
          <p className="text-gray-400 text-sm font-medium mt-0.5">Describe a maintenance issue in detail.</p>
        </div>
      </div>

      {submitted && (
        <div className="mb-6 bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3 animate-slide-up">
          <div className="bg-green-500 p-2 rounded-xl text-white"><Send size={16} /></div>
          <div>
            <p className="font-bold text-sm text-green-700">Ticket Submitted!</p>
            <p className="text-xs text-green-600">Redirecting you back...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Category */}
        <div>
          <label className="block font-heading font-black text-[10px] uppercase tracking-widest text-gray-400 mb-5">Issue Category</label>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none -mx-2 px-2">
            {CATEGORIES.map(({ id, icon: Icon, label, color }) => (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(id)}
                className={`flex-shrink-0 flex flex-col items-center gap-3.5 p-5 rounded-[28px] border-2 transition-all duration-300 min-w-[100px] ${
                  category === id
                    ? "bg-nesthub-primary border-nesthub-primary text-white shadow-2xl shadow-nesthub-primary/20 -translate-y-1.5"
                    : "bg-white border-gray-100 text-gray-400 hover:border-nesthub-primary/20"
                }`}
              >
                <div className={`p-2.5 rounded-xl ${category === id ? "bg-white/10" : color}`}>
                  <Icon size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form fields */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-7 space-y-6">
          {/* Priority */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Urgency Level</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "P1", label: "Critical", color: "border-red-500 bg-red-500 text-white" },
                { id: "P2", label: "High", color: "border-orange-500 bg-orange-500 text-white" },
                { id: "P3", label: "Normal", color: "border-blue-500 bg-blue-500 text-white" },
              ].map(({ id, label, color }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPriority(id)}
                  className={`py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 border-2 ${
                    priority === id ? color : "bg-gray-50 border-transparent text-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {id} · {label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">Short Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Leaking tap in bathroom"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
              <FileText size={12} className="text-nesthub-accent" /> Problem Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the issue in detail — what's happening, since when, and how it's affecting you..."
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all resize-none"
            />
          </div>

          {/* Photo Attach */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2">Attach Photo (optional)</label>
            <label className="flex items-center gap-3 px-5 py-4 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-nesthub-primary/30 hover:bg-gray-50/50 transition-all group">
              <Camera size={20} className="text-gray-300 group-hover:text-nesthub-primary transition-colors" />
              <span className="text-xs font-bold text-gray-400 group-hover:text-nesthub-primary transition-colors">Click to upload photo evidence</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!subject || !description}
          className="w-full bg-nesthub-primary text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-nesthub-primary/20 hover:bg-[#204a35] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Launch Support Ticket
          <ChevronRight size={18} strokeWidth={3} />
        </button>
      </form>
    </div>
  );
}
