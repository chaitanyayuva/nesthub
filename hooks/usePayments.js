"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "./useDebounce";

const CURRENT_DUES = [
  { id: 1, type: "Rent", amount: 6000, color: "bg-blue-50 text-blue-600" },
  { id: 2, type: "Electricity", amount: 450, color: "bg-yellow-50 text-yellow-600" },
  { id: 3, type: "Late Fee", amount: 0, color: "bg-red-50 text-red-600" },
];

const HISTORY = [
  { month: "February 2024", amount: 6450, status: "Paid", date: "04 Feb, 2024" },
  { month: "January 2024", amount: 6200, status: "Paid", date: "02 Jan, 2024" },
  { month: "December 2023", amount: 6000, status: "Paid", date: "05 Dec, 2023" },
];

const ALL_PAYMENTS_MOCK = [
  { id: "PAY-1024", student: "Rahul Kumar", room: "302-B", type: "Rent + Elec", amount: 6450, date: "28 Mar, 2024", status: "Paid", method: "UPI" },
  { id: "PAY-1025", student: "Ankit Sharma", room: "105-A", type: "Rent + Elec", amount: 6200, date: "27 Mar, 2024", status: "Pending", method: "--" },
  { id: "PAY-1026", student: "Deepak Rawat", room: "202-C", type: "Rent", amount: 6000, date: "26 Mar, 2024", status: "Paid", method: "Cash" },
  { id: "PAY-1027", student: "Vikas Verma", room: "212-A", type: "Rent + Elec", amount: 6450, date: "25 Mar, 2024", status: "Overdue", method: "--" },
  { id: "PAY-1028", student: "Siddharth J.", room: "404-B", type: "Rent + Elec", amount: 6450, date: "24 Mar, 2024", status: "Paid", method: "UPI" },
  { id: "PAY-1029", student: "Aman Gupta", room: "112-C", type: "Rent", amount: 6000, date: "23 Mar, 2024", status: "Pending", method: "--" },
];

export function usePayments() {
  const totalAmount = useMemo(() => 
    CURRENT_DUES.reduce((acc, curr) => acc + curr.amount, 0), []
  );

  return {
    currentDues: CURRENT_DUES,
    totalAmount,
    history: HISTORY
  };
}

export function useAdminPayments() {
  const [payments, setPayments] = useState(ALL_PAYMENTS_MOCK);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [toast, setToast] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredPayments = useMemo(() => {
    return payments.filter(pay => {
      const matchesSearch = pay.student.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          pay.room.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesStatus = statusFilter === "All" || pay.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [payments, debouncedSearch, statusFilter]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const markPaid = (id) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: "Paid", method: "Admin-Override" } : p));
    showToast(`Payment ${id} marked as Paid!`);
  };

  const sendReminder = (id) => {
    showToast(`Reminder sent to student for ${id}!`, "info");
  };

  const stats = {
    totalCollected: "₹1,42,800",
    pendingAmount: "₹24,500",
    completionRate: "85%",
    overdueAccounts: 3
  };

  return {
    payments: filteredPayments,
    stats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    markPaid,
    sendReminder,
    toast,
    setToast
  };
}
