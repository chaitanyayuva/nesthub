import { Search, Filter, MoreVertical, CheckCircle, Clock, AlertTriangle, Send } from "lucide-react";

export function PaymentTable({ 
  payments, 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  onMarkPaid,
  onSendReminder,
  onViewDetails
}) {
  const getStatusStyle = (status) => {
    switch(status) {
      case "Paid": return "bg-green-50 text-green-600 ring-1 ring-green-500/10";
      case "Pending": return "bg-orange-50 text-orange-600 ring-1 ring-orange-500/10";
      case "Overdue": return "bg-red-50 text-red-600 ring-1 ring-red-500/10";
      default: return "bg-gray-50 text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Paid": return CheckCircle;
      case "Pending": return Clock;
      case "Overdue": return AlertTriangle;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 justify-between items-center bg-gray-50/10">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search student or room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 bg-white border-none rounded-2xl text-sm focus:ring-2 focus:ring-nesthub-primary/5 transition-all shadow-sm ring-1 ring-gray-100"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto overflow-y-hidden items-center py-2 scrollbar-none">
          {["All", "Paid", "Pending", "Overdue"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap shrink-0 ${
                statusFilter === status 
                ? "bg-nesthub-primary text-white shadow-lg shadow-nesthub-primary/20 scale-105" 
                : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">ID & Student</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Room</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Type & Date</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Amount</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {payments.map((pay) => {
              const StatusIcon = getStatusIcon(pay.status);
              return (
                <tr key={pay.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div>
                      <p className="font-bold text-sm text-nesthub-primary mb-0.5">{pay.student}</p>
                      <p className="text-[10px] font-mono text-gray-400 uppercase">{pay.id}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-gray-50 rounded-lg text-xs font-bold text-nesthub-primary border border-gray-100 uppercase tracking-tight">{pay.room}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div>
                      <p className="font-semibold text-xs text-gray-600 mb-0.5">{pay.type}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{pay.date}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-sm text-nesthub-primary">₹{pay.amount.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{pay.method}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${getStatusStyle(pay.status)} shadow-sm`}>
                       {StatusIcon && <StatusIcon size={12} />}
                       {pay.status}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {pay.status !== "Paid" ? (
                        <button 
                          onClick={() => onMarkPaid(pay)}
                          className="p-2.5 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all shadow-sm ring-1 ring-green-100" 
                          title="Mark as Paid"
                        >
                          <CheckCircle size={18} strokeWidth={2.5} />
                        </button>
                      ) : (
                        <button 
                          className="p-2.5 text-gray-300 cursor-not-allowed rounded-xl" 
                          disabled
                        >
                          <CheckCircle size={18} strokeWidth={2.5} />
                        </button>
                      )}
                      <button 
                        onClick={() => onSendReminder(pay)}
                        className="p-2.5 text-orange-500 hover:bg-orange-500 hover:text-white rounded-xl transition-all shadow-sm ring-1 ring-orange-100" 
                        title="Send Reminder"
                      >
                        <Send size={18} strokeWidth={2.5} />
                      </button>
                      <button 
                        onClick={() => onViewDetails(pay)}
                        className="p-2.5 text-gray-400 hover:bg-gray-100 hover:text-nesthub-primary rounded-xl transition-all border border-gray-100" 
                        title="Quick View"
                      >
                        <MoreVertical size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {payments.length === 0 && (
        <div className="p-20 flex flex-col items-center justify-center text-center">
           <div className="bg-gray-50 p-6 rounded-[32px] text-gray-200 mb-4 scale-110">
              <Search size={48} strokeWidth={1} />
           </div>
           <p className="text-gray-500 font-bold text-sm">No transactions found</p>
           <p className="text-gray-400 text-xs mt-1">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}
