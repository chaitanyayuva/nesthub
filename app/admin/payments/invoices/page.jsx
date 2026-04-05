"use client";

import { useState } from "react";
import { 
  ReceiptText, Download, Search, Filter, ArrowLeft,
  Calendar, CheckCircle, AlertCircle, FileText
} from "lucide-react";

const MOCK_INVOICES = [
  { id: "INV-2025-04-001", student: "Rahul Kumar", room: "301A", amount: 9500, month: "April 2025", status: "Paid", paidOn: "Apr 1, 2025", method: "UPI" },
  { id: "INV-2025-04-002", student: "Priya Sharma", room: "201B", amount: 9500, month: "April 2025", status: "Pending", paidOn: "—", method: "—" },
  { id: "INV-2025-04-003", student: "Arjun Mehta", room: "102C", amount: 11000, month: "April 2025", status: "Paid", paidOn: "Apr 2, 2025", method: "Bank Transfer" },
  { id: "INV-2025-04-004", student: "Dia Nair", room: "405D", amount: 9500, month: "April 2025", status: "Overdue", paidOn: "—", method: "—" },
  { id: "INV-2025-03-001", student: "Rahul Kumar", room: "301A", amount: 9500, month: "March 2025", status: "Paid", paidOn: "Mar 1, 2025", method: "UPI" },
  { id: "INV-2025-03-002", student: "Priya Sharma", room: "201B", amount: 9500, month: "March 2025", status: "Paid", paidOn: "Mar 2, 2025", method: "Cash" },
  { id: "INV-2025-03-003", student: "Arjun Mehta", room: "102C", amount: 11000, month: "March 2025", status: "Paid", paidOn: "Mar 1, 2025", method: "Bank Transfer" },
];

const STATUS_COLORS = {
  Paid: "bg-green-50 text-green-600 border-green-100",
  Pending: "bg-orange-50 text-orange-600 border-orange-100",
  Overdue: "bg-red-50 text-red-600 border-red-100",
};

export default function AdminInvoices() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");

  const months = [...new Set(MOCK_INVOICES.map(i => i.month))];

  const filtered = MOCK_INVOICES.filter((inv) => {
    const matchSearch = inv.student.toLowerCase().includes(search.toLowerCase()) || inv.id.includes(search);
    const matchStatus = statusFilter === "All" || inv.status === statusFilter;
    const matchMonth = monthFilter === "All" || inv.month === monthFilter;
    return matchSearch && matchStatus && matchMonth;
  });

  const totalPaid = MOCK_INVOICES.filter(i => i.status === "Paid").reduce((a, b) => a + b.amount, 0);
  const totalPending = MOCK_INVOICES.filter(i => i.status !== "Paid").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-nesthub-primary tracking-tight">Invoice Ledger</h1>
          <p className="text-gray-400 font-medium text-sm mt-1">View, filter and export all billing records.</p>
        </div>
        <button className="w-full sm:w-auto bg-white border border-gray-100 shadow-sm text-nesthub-primary px-6 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2.5 hover:bg-gray-50 transition-all">
          <Download size={16} strokeWidth={2.5} />
          Export All
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Total Invoices", value: MOCK_INVOICES.length, icon: ReceiptText, color: "text-nesthub-primary bg-nesthub-primary/10" },
          { label: "Collected", value: `₹${totalPaid.toLocaleString()}`, icon: CheckCircle, color: "text-green-600 bg-green-50" },
          { label: "Outstanding", value: `₹${totalPending.toLocaleString()}`, icon: AlertCircle, color: "text-red-500 bg-red-50" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all">
            <div className={`p-3.5 rounded-2xl ${color}`}><Icon size={20} /></div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
              <p className="font-heading font-black text-2xl text-nesthub-primary tracking-tight">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 bg-white border border-gray-100 rounded-2xl flex items-center gap-3 px-5 py-3.5 shadow-sm focus-within:ring-2 focus-within:ring-nesthub-primary/10 group">
          <Search size={16} className="text-gray-300 group-focus-within:text-nesthub-primary shrink-0" />
          <input
            type="text"
            placeholder="Search by name or invoice ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-300 font-medium"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {["All", "Paid", "Pending", "Overdue"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`whitespace-nowrap px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                statusFilter === s ? "bg-nesthub-primary text-white border-nesthub-primary shadow-lg" : "bg-white text-gray-400 border-gray-100 hover:border-nesthub-primary/30"
              }`}>
              {s}
            </button>
          ))}
        </div>
        <select
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="bg-white border border-gray-100 rounded-2xl px-4 py-3 text-xs font-bold text-gray-500 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 shadow-sm"
        >
          <option value="All">All Months</option>
          {months.map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-gray-50">
              {["Invoice ID", "Student", "Room", "Month", "Amount", "Method", "Status", "Actions"].map((h) => (
                <th key={h} className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv, idx) => (
              <tr key={inv.id} className={`group hover:bg-gray-50/50 transition-colors ${idx !== filtered.length - 1 ? "border-b border-gray-50" : ""}`}>
                <td className="px-6 py-4">
                  <span className="font-mono text-[10px] font-bold text-gray-400">{inv.id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-sm text-nesthub-primary">{inv.student}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-black text-nesthub-accent bg-nesthub-accent/5 px-2 py-1 rounded-lg">{inv.room}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-gray-500">{inv.month}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-heading font-black text-sm text-nesthub-primary">₹{inv.amount.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold text-gray-500">{inv.method}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${STATUS_COLORS[inv.status]}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-[10px] font-bold uppercase tracking-wider text-nesthub-primary hover:text-nesthub-accent transition-colors">View</button>
                    <button className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-nesthub-primary transition-colors">PDF</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-16 flex flex-col items-center text-center">
            <div className="bg-gray-50 p-5 rounded-2xl text-gray-200 mb-3"><FileText size={40} strokeWidth={1} /></div>
            <p className="text-gray-500 font-bold">No invoices match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
