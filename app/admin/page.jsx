import { BarChart3, Users2, DoorOpen, CreditCard, MessageSquareWarning, TrendingUp, ArrowUpRight, ArrowDownRight, UserPlus, Clock } from "lucide-react";

export default function AdminOverview() {
  const metrics = [
    { label: "Occupancy Rate", value: "92%", trend: "+2.4%", isPositive: true, icon: Users2, color: "bg-blue-500" },
    { label: "Total Revenue", value: "₹2.45L", trend: "+12.1%", isPositive: true, icon: TrendingUp, color: "bg-green-500" },
    { label: "Pending Rent", value: "₹45,200", trend: "-5.2%", isPositive: false, icon: CreditCard, color: "bg-orange-500" },
    { label: "Open Complaints", value: "8", trend: "-2", isPositive: true, icon: MessageSquareWarning, color: "bg-red-500" },
  ];

  const recentActivities = [
    { title: "New Complaint", desc: "Plumbing issue in Room 302-B by Rahul Kumar", time: "10 mins ago", type: "Complaint" },
    { title: "Payment Received", desc: "₹6,000 rent paid by Ankit Sharma (Room 105)", time: "1 hour ago", type: "Payment" },
    { title: "Visitor Entry", desc: "Suresh Kumar (Friend) visited Rahul Kumar (Room 302)", time: "3 hours ago", type: "Visitor" },
    { title: "Notice Posted", desc: "New maintenance schedule for water supply posted", time: "5 hours ago", type: "System" },
    { title: "New Student Added", desc: "Vikas Verma assigned to Room 212-A", time: "Yesterday", type: "Admin" },
  ];

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 sm:px-0">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
         <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-nesthub-primary tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-400 font-medium text-sm mt-1">Real-time pulse of your hostel management.</p>
         </div>
         <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 w-full sm:w-auto justify-center">
            <CalendarIcon />
            <span className="text-xs font-bold text-nesthub-primary uppercase tracking-widest">March 2024</span>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
         {metrics.map((stat, idx) => (
           <div key={idx} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all group duration-300">
              <div className="flex justify-between items-start mb-6">
                 <div className={`p-3.5 rounded-2xl ${stat.color} text-white shadow-lg`}>
                    <stat.icon size={22} strokeWidth={2.5} />
                 </div>
                 <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${
                   stat.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                 }`}>
                   {stat.isPositive ? <ArrowUpRight size={10} strokeWidth={4} /> : <ArrowDownRight size={10} strokeWidth={4} />}
                   {stat.trend}
                 </div>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                 <h2 className="text-3xl font-heading font-bold text-nesthub-primary tracking-tight group-hover:translate-x-1 transition-transform duration-300">{stat.value}</h2>
              </div>
           </div>
         ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         {/* Main Chart Section */}
         <div className="flex-1 space-y-8 w-full">
            <div className="bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 shadow-sm min-h-[400px] relative overflow-hidden">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                  <h3 className="font-heading text-xl font-bold text-nesthub-primary tracking-tight">Revenue Trends</h3>
                  <div className="flex gap-2 w-full sm:w-auto">
                     <button className="flex-1 sm:flex-initial px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-nesthub-primary bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">7 Days</button>
                     <button className="flex-1 sm:flex-initial px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white bg-nesthub-primary rounded-xl transition-all shadow-lg shadow-nesthub-primary/20">30 Days</button>
                  </div>
               </div>
               
               {/* Aesthetic Chart Placeholder Grid */}
               <div className="h-64 flex items-end gap-1.5 sm:gap-2 px-2 sm:px-10 overflow-hidden">
                  {[40, 70, 45, 90, 65, 85, 55, 75, 95, 60, 80, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-gray-50 rounded-t-xl group/bar relative">
                       <div 
                         style={{ height: `${h}%` }} 
                         className="w-full bg-nesthub-primary/5 group-hover/bar:bg-nesthub-primary/10 rounded-t-xl absolute bottom-0 transition-all duration-700 delay-150"
                       ></div>
                       <div 
                         style={{ height: `${h-15}%` }} 
                         className="w-full bg-nesthub-accent/30 group-hover/bar:bg-nesthub-accent group-hover/bar:shadow-lg group-hover/bar:shadow-nesthub-accent/50 rounded-t-xl absolute bottom-0 transition-all duration-500"
                       ></div>
                    </div>
                  ))}
               </div>
               
               <div className="flex justify-between items-center px-4 sm:px-10 mt-6 text-[10px] font-black uppercase tracking-widest text-gray-300">
                  <span>Feb 01</span>
                  <span className="hidden xs:block">Feb 15</span>
                  <span>Feb 28</span>
               </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-6">
                <AdminActionCard title="Add Student" desc="Enroll new resident" icon={UserPlus} />
                <AdminActionCard title="Room Status" desc="Manage allocations" icon={DoorOpen} />
                <AdminActionCard title="New Notice" desc="Broadcast update" icon={Clock} />
            </div>
         </div>

         {/* Sidebar Activity Feed */}
         <div className="w-full lg:w-96 bg-white p-6 md:p-8 rounded-[40px] border border-gray-100 shadow-sm shrink-0">
            <h3 className="font-heading text-xl font-bold text-nesthub-primary tracking-tight mb-8">Recent Activity</h3>
            <div className="space-y-6">
               {recentActivities.map((act, idx) => (
                 <div key={idx} className="flex gap-4 group cursor-default">
                    <div className="pt-1.5 flex flex-col items-center">
                       <div className="w-2.5 h-2.5 rounded-full bg-nesthub-accent ring-4 ring-nesthub-accent/10 group-hover:scale-125 transition-transform"></div>
                       {idx !== recentActivities.length - 1 && <div className="w-px h-full bg-gray-100 mt-2"></div>}
                    </div>
                    <div className="pb-6">
                       <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[9px] font-black uppercase tracking-widest text-nesthub-accent">{act.type}</span>
                          <span className="text-[9px] font-medium text-gray-300">•</span>
                          <span className="text-[9px] font-medium text-gray-400">{act.time}</span>
                       </div>
                       <h4 className="font-bold text-sm text-nesthub-primary group-hover:text-nesthub-accent transition-colors mb-0.5">{act.title}</h4>
                       <p className="text-[11px] text-gray-500 font-medium leading-normal line-clamp-2">{act.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
            
            <button className="w-full mt-4 bg-gray-50 text-nesthub-primary py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-transparent active:border-gray-200">
               View Full Logs
            </button>
         </div>
      </div>
    </div>
  );
}

function CalendarIcon() {
   return (
      <svg className="w-4 h-4 text-nesthub-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
   );
}

function AdminActionCard({ title, desc, icon: Icon }) {
   return (
      <button className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all text-left flex flex-col gap-4 group">
         <div className="p-3 bg-nesthub-primary/5 text-nesthub-primary rounded-2xl group-hover:bg-nesthub-primary group-hover:text-white transition-all duration-300 self-start">
            <Icon size={20} strokeWidth={2.5} />
         </div>
         <div>
            <h4 className="font-bold text-sm text-nesthub-primary">{title}</h4>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{desc}</p>
         </div>
      </button>
   );
}
