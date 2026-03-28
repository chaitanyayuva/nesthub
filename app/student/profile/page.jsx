"use client";

import { useAuth } from "../../../hooks/useAuth";
import { QrCode, MapPin, Building2, UserCircle2, Share2, Download, ShieldCheck } from "lucide-react";

export default function StudentProfile() {
  const { user } = useAuth();

  return (
    <div className="p-6 pb-6 max-w-lg mx-auto w-full animate-fade-in transition-all duration-300">
      {/* Page Title */}
      <h1 className="font-heading text-3xl font-bold text-nesthub-primary mb-10 px-2 tracking-tight">Digital Identity</h1>

      {/* ID Card Container */}
      <div className="relative group perspective-1000">
        {/* Shadow decoration */}
        <div className="absolute inset-0 bg-nesthub-primary/20 blur-[80px] rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* The Card */}
        <div className="bg-white rounded-[48px] overflow-hidden shadow-2xl shadow-nesthub-primary/10 border border-gray-100/50 flex flex-col relative z-10 transition-all duration-500 hover:-translate-y-2">
          {/* Top Green Accent / Header in Card */}
          <div className="bg-nesthub-primary p-8 pb-24 relative overflow-hidden">
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                   <div className="w-5 h-5 bg-nesthub-accent rounded-full animate-pulse"></div>
                </div>
                <span className="text-white font-heading font-bold tracking-wider text-xs uppercase">NestHub Hostl</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
                <ShieldCheck size={12} className="text-nesthub-accent" />
                <span className="text-white font-bold text-[9px] tracking-wider uppercase">Verified Resident</span>
              </div>
            </div>
            
            {/* Abstract Background Patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-nesthub-accent opacity-10 rounded-full blur-2xl"></div>
          </div>

          {/* Student Info Section */}
          <div className="px-8 pb-10 -mt-20 relative z-20 flex flex-col items-center">
            {/* Photo */}
            <div className="w-40 h-40 rounded-[36px] border-[6px] border-white shadow-2xl overflow-hidden mb-6 bg-gray-50 transform hover:scale-105 transition-transform duration-500 relative group/photo">
              <img 
                src={user.avatar} 
                alt="Student Photo" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity"></div>
            </div>

            {/* Name and ID */}
            <div className="text-center mb-10">
               <h2 className="font-heading text-2xl font-bold text-nesthub-primary mb-1 tracking-tight">{user.name}</h2>
               <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-nesthub-accent font-bold text-[10px] uppercase tracking-wider bg-nesthub-accent/5 px-3 py-1 rounded-full">{user.id}</span>
               </div>
            </div>

            {/* Detail Grid */}
            <div className="w-full grid grid-cols-2 gap-6 mb-12">
               <DetailBox icon={Building2} label="Institution" value={user.institution} />
               <DetailBox icon={MapPin} label="Room Assignment" value={`Room ${user.room}`} />
               <DetailBox icon={UserCircle2} label="Hostel Block" value={user.hostel} />
               <DetailBox icon={Download} label="Validity Period" value="Exp. June 2026" />
            </div>

            {/* QR Code Section */}
            <div className="w-full bg-gray-50/50 rounded-[40px] p-8 flex flex-col items-center border border-dashed border-gray-200 group/qr hover:bg-white hover:border-nesthub-primary/30 transition-all duration-500">
              <div className="bg-white p-4 rounded-[28px] shadow-xl shadow-nesthub-primary/5 mb-4 group-hover/qr:scale-105 transition-transform">
                <QrCode size={120} className="text-nesthub-primary" strokeWidth={1} />
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Encrypted Token</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-10 px-2">
        <button className="flex items-center justify-center gap-3 bg-white text-nesthub-primary border border-gray-200 py-4.5 rounded-[24px] font-bold text-[11px] uppercase tracking-wider shadow-sm hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all active:scale-95">
          <Share2 size={18} strokeWidth={2.5} />
          Digital Share
        </button>
        <button className="flex items-center justify-center gap-3 bg-nesthub-primary text-white py-4.5 rounded-[24px] font-bold text-[11px] uppercase tracking-wider shadow-2xl shadow-nesthub-primary/20 hover:bg-[#204a35] transition-all active:scale-95">
          <Download size={18} strokeWidth={2.5} />
          Save PDF
        </button>
      </div>

      {/* Safety Note */}
      <div className="mt-10 px-6 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center justify-center text-center">
         <p className="text-gray-400 text-[10px] font-bold leading-relaxed uppercase tracking-wider">
           Digital Authorized Document. Verifiable via NestHub Gateway.
         </p>
      </div>
    </div>
  );
}

function DetailBox({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-gray-400 mb-0.5">
        <Icon size={16} strokeWidth={2.5} className="text-nesthub-accent" />
        <span className="text-[9px] uppercase font-bold tracking-wider">{label}</span>
      </div>
      <p className="text-nesthub-primary font-bold text-xs leading-snug">{value}</p>
    </div>
  );
}
