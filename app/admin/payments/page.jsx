"use client";

import { useState } from "react";
import { useAdminPayments } from "../../../hooks/usePayments";
import { PaymentStats } from "../../../components/admin/PaymentStats";
import { PaymentTable } from "../../../components/admin/PaymentTable";
import { AdminModal } from "../../../components/admin/AdminModal";
import { RecordPaymentModal } from "../../../components/admin/RecordPaymentModal";
import { Download, Calendar, Filter, CheckCircle, Info, X, FileText, Share2, Settings, PlusCircle } from "lucide-react";

export default function AdminPaymentsPage() {
  const { 
    payments, 
    stats, 
    searchTerm, 
    setSearchTerm, 
    statusFilter, 
    setStatusFilter,
    markPaid,
    sendReminder,
    toast,
    setToast
  } = useAdminPayments();

  // Modal States
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isInvoicingOpen, setIsInvoicingOpen] = useState(false);

  // Handlers
  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setIsDetailsOpen(true);
  };

  const handleExport = (format) => {
    setIsExportOpen(false);
    // Simulate export
    const message = `Exported report in ${format} format successfully!`;
    setToast({ message, type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-8 z-[110] animate-slide-up">
           <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
             toast.type === "success" ? "bg-green-50 border-green-100 text-green-600" : "bg-blue-50 border-blue-100 text-blue-600"
           }`}>
             {toast.type === "success" ? <CheckCircle size={20} /> : <Info size={20} />}
             <p className="text-sm font-bold tracking-tight">{toast.message}</p>
             <button onClick={() => setToast(null)} className="ml-2 p-1 hover:bg-white/50 rounded-lg transition-all">
               <X size={16} />
             </button>
           </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="font-heading text-4xl font-bold text-nesthub-primary tracking-tight">Financial Overview</h1>
          <p className="text-gray-400 font-medium text-sm mt-2">Monitor revenue, collect dues, and manage student invoices.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={() => setIsExportOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2.5 bg-white text-nesthub-primary border border-gray-100 px-6 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-gray-50 hover:shadow-xl hover:shadow-nesthub-primary/5 transition-all shadow-sm"
          >
             <Download size={16} strokeWidth={2.5} />
             Export Report
          </button>
          <button 
            onClick={() => setIsRecordPaymentOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2.5 bg-nesthub-accent text-white border border-nesthub-accent px-6 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-2xl shadow-nesthub-accent/20 hover:bg-[#E59734] transition-all"
          >
             <PlusCircle size={16} strokeWidth={2.5} />
             Record Payment
          </button>
          <button 
            onClick={() => setIsInvoicingOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2.5 bg-nesthub-primary text-white border border-nesthub-primary px-6 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-2xl shadow-nesthub-primary/20 hover:bg-[#204a35] transition-all"
          >
             <Calendar size={16} strokeWidth={2.5} />
             Invoicing Cycle
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <PaymentStats stats={stats} />

      {/* Main Payment Management Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6 px-4">
           <h2 className="font-heading text-xl font-bold text-nesthub-primary tracking-tight">Payment Repository</h2>
           <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
              <Filter size={12} />
              Showing: {statusFilter} Transactions
           </div>
        </div>
        
        <PaymentTable 
          payments={payments}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onMarkPaid={(pay) => markPaid(pay.id)}
          onSendReminder={(pay) => sendReminder(pay.id)}
          onViewDetails={handleViewDetails}
        />
      </div>

      {/* Footer Info */}
      <div className="bg-nesthub-primary/5 p-8 rounded-[40px] border border-nesthub-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-nesthub-primary/5">
         <div className="flex items-start gap-4">
            <div className="bg-white p-3.5 rounded-2xl text-nesthub-primary shadow-sm ring-1 ring-nesthub-primary/5">
                <Calendar size={24} />
            </div>
            <div>
               <h4 className="font-heading font-bold text-[10px] uppercase tracking-widest text-nesthub-primary mb-1">Upcoming Billing Cycle</h4>
               <p className="text-[11px] text-gray-500 font-medium leading-relaxed">The next automated invoice batch will be generated on <span className="text-nesthub-accent font-bold">April 1st, 2024</span>.</p>
            </div>
         </div>
         <button className="whitespace-nowrap bg-nesthub-primary text-white px-8 py-3.5 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#204a35] transition-all">
            Manage Automation
         </button>
      </div>

      {/* MODALS */}
      
      {/* 1. Payment Details Modal */}
      <AdminModal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)}
        title="Transaction Details"
        footer={
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-nesthub-primary bg-white border border-gray-100 hover:bg-gray-50">
                <FileText size={16} />
                View Invoice
             </button>
             <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white bg-nesthub-accent hover:bg-[#E59734] shadow-lg shadow-nesthub-accent/20">
                <Share2 size={16} />
                Share Receipt
             </button>
          </div>
        }
      >
        {selectedPayment && (
          <div className="space-y-6">
             <div className="bg-gray-50 p-6 rounded-3xl flex justify-between items-center border border-gray-100">
                <div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Status</p>
                   <div className="flex items-center gap-2 text-nesthub-primary font-bold">
                      <div className={`w-2.5 h-2.5 rounded-full ${selectedPayment.status === "Paid" ? "bg-green-500" : "bg-orange-500"}`}></div>
                      {selectedPayment.status}
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Amount</p>
                   <p className="text-2xl font-heading font-bold text-nesthub-primary tracking-tight">₹{selectedPayment.amount.toLocaleString()}</p>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-y-6 px-2">
                <div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Transaction ID</p>
                   <p className="text-sm font-bold text-nesthub-primary">{selectedPayment.id}</p>
                </div>
                <div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Student Name</p>
                   <p className="text-sm font-bold text-nesthub-primary">{selectedPayment.student}</p>
                </div>
                <div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Room Assignment</p>
                   <p className="text-sm font-bold text-nesthub-primary">{selectedPayment.room}</p>
                </div>
                <div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Due Date</p>
                   <p className="text-sm font-bold text-nesthub-primary">{selectedPayment.date}</p>
                </div>
             </div>
             <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex gap-3 items-start">
                <Info size={18} className="text-orange-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-orange-700 leading-relaxed font-medium">This transaction is currently indexed and verified by the host infrastructure. Direct mutations are recorded in fiscal logs.</p>
             </div>
          </div>
        )}
      </AdminModal>

      {/* 2. Export Modal */}
      <AdminModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title="Generate Revenue Report"
      >
        <div className="space-y-6">
           <p className="text-sm text-gray-500 font-medium">Select the preferred format for the fiscal year summary.</p>
           <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleExport("PDF")}
                className="p-6 rounded-3xl border-2 border-dashed border-gray-100 hover:border-nesthub-primary hover:bg-gray-50 text-center transition-all group"
              >
                 <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText size={24} />
                 </div>
                 <p className="text-xs font-bold text-nesthub-primary uppercase tracking-widest">Adobe PDF</p>
              </button>
              <button 
                onClick={() => handleExport("CSV/Excel")}
                className="p-6 rounded-3xl border-2 border-dashed border-gray-100 hover:border-nesthub-primary hover:bg-gray-50 text-center transition-all group"
              >
                 <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Download size={24} />
                 </div>
                 <p className="text-xs font-bold text-nesthub-primary uppercase tracking-widest">Excel Sheet</p>
              </button>
           </div>
        </div>
      </AdminModal>

      {/* 3. Invoicing Cycle Modal */}
      <AdminModal
        isOpen={isInvoicingOpen}
        onClose={() => setIsInvoicingOpen(false)}
        title="Billing Configuration"
        footer={
          <button className="bg-nesthub-primary text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#204a35]">
            Save and Update
          </button>
        }
      >
        <div className="space-y-6">
           <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                 <Settings size={20} className="text-gray-400" />
                 <p className="text-sm font-bold text-nesthub-primary">Auto-Generate Invoices</p>
              </div>
              <div className="w-12 h-6 bg-nesthub-primary rounded-full relative">
                 <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
           </div>
           <p className="text-xs text-gray-400 leading-relaxed capitalize">Configure how the system handles monthly rent and utility billing for all active residents.</p>
        </div>
      </AdminModal>

      {/* Record Payment Modal */}
      <RecordPaymentModal
        isOpen={isRecordPaymentOpen}
        onClose={() => setIsRecordPaymentOpen(false)}
        onSubmit={(data) => {
          console.log("Recording payment:", data);
          setToast({ message: `Payment of ₹${data.amount} recorded for ${data.student}!`, type: "success" });
          setTimeout(() => setToast(null), 3000);
        }}
      />

    </div>
  );
}
