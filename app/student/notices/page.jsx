"use client";

import { useNotices } from "../../../hooks/useNotices";
import { Speaker, AlertCircle, Info, Calendar, Pin, Clock, ChevronRight } from "lucide-react";

export default function StudentNotices() {
  const { pinnedNotices, otherNotices } = useNotices();

  const getIcon = (category) => {
    switch(category) {
      case "Maintenance": return Speaker;
      case "Event": return Calendar;
      case "Info": return Info;
      default: return AlertCircle;
    }
  };

  return (
    <div className="p-6 pb-6 max-w-lg mx-auto w-full animate-fade-in">
      {/* Header */}
      <h1 className="font-heading text-3xl font-bold text-nesthub-primary mb-8 px-2 tracking-tight">Bulletin Board</h1>

      {/* Pinned Section */}
      {pinnedNotices.length > 0 && (
        <div className="mb-10">
           <div className="flex items-center gap-3 mb-6 px-2">
              <Pin size={16} className="text-nesthub-accent -rotate-45" />
              <h3 className="font-heading font-black text-xs uppercase tracking-[0.2em] text-nesthub-primary">Pinned Updates</h3>
           </div>
           
           <div className="space-y-6">
              {pinnedNotices.map(notice => (
                <NoticeCard key={notice.id} notice={notice} Icon={getIcon(notice.category)} />
              ))}
           </div>
        </div>
      )}

      {/* Recent Feed */}
      <div>
         <div className="flex items-center gap-3 mb-6 px-2">
           <Clock size={16} className="text-gray-300" />
           <h3 className="font-heading font-black text-xs uppercase tracking-[0.2em] text-gray-400">Recent History</h3>
         </div>

         <div className="space-y-6">
            {otherNotices.map(notice => (
              <NoticeCard key={notice.id} notice={notice} Icon={getIcon(notice.category)} />
            ))}
         </div>
      </div>

      {/* Load More? */}
      <button className="w-full mt-12 py-5 bg-white border border-gray-100 rounded-[24px] text-nesthub-primary text-[10px] font-black tracking-widest uppercase hover:bg-gray-50 active:scale-[0.98] transition-all shadow-sm">
        Load Archive
      </button>
    </div>
  );
}

function NoticeCard({ notice, Icon }) {
  return (
    <div className="bg-white rounded-[40px] p-6 sm:p-7 border border-gray-100 shadow-sm transition-all hover:shadow-2xl hover:shadow-nesthub-primary/5 group relative overflow-hidden animate-slide-up">
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${notice.color.split(' ')[0]} opacity-20 rounded-full -translate-y-8 translate-x-8 -z-0`}></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-5">
          <div className="flex gap-4 items-center">
            <div className={`p-3.5 rounded-2xl transition-transform group-hover:scale-110 ${notice.color}`}>
              <Icon size={22} />
            </div>
            <div className="min-w-0">
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-1.5 inline-block ${notice.tagColor}`}>
                {notice.type}
              </span>
              <h4 className="font-bold text-nesthub-primary text-sm tracking-tight leading-tight group-hover:text-nesthub-accent transition-colors truncate">{notice.title}</h4>
            </div>
          </div>
          <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap pt-1">{notice.time}</span>
        </div>
        
        <p className="text-gray-500 text-xs leading-relaxed mb-6 font-medium line-clamp-3">
          {notice.content}
        </p>

        <button className="w-full flex justify-between items-center text-[10px] font-black text-nesthub-primary uppercase tracking-widest pt-5 border-t border-gray-50 group-hover:text-nesthub-accent transition-all">
           Read Full Notice
           <ChevronRight size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
