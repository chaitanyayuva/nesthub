"use client";

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "./useDebounce";
import api from "../lib/api";

// ── Student: view own invoices & initiate payment ──────────────────────────
export function usePayments() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/payments/invoices");
      setInvoices(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load payments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Sum pending invoices for dashboard
  const pendingInvoices = invoices.filter((inv) => inv.status === "Pending");
  const totalAmount = pendingInvoices.reduce((acc, inv) => acc + (inv.amount || 0), 0);

  const processPayment = async (data) => {
    const res = await api.post("/api/payments/process", data);
    fetchInvoices();
    return res.data;
  };

  return {
    invoices,
    loading,
    error,
    totalAmount,
    history: invoices.filter((inv) => inv.status === "Paid"),
    currentDues: pendingInvoices,
    refetch: fetchInvoices,
    processPayment,
  };
}

// ── Admin: manage all invoices ─────────────────────────────────────────────
export function useAdminPayments() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("");
  const [toast, setToast] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 400);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== "All") params.status = statusFilter;
      if (monthFilter) params.month = monthFilter;
      const res = await api.get("/api/payments/invoices", { params });
      setInvoices(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load invoices");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, monthFilter]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const recordPayment = async (data) => {
    const res = await api.post("/api/payments/record", data);
    fetchInvoices();
    showToast("Payment recorded successfully!");
    return res.data;
  };

  // Filter by search client-side (studentName / room)
  const filteredInvoices = invoices.filter((inv) => {
    if (!debouncedSearch) return true;
    const term = debouncedSearch.toLowerCase();
    return (
      (inv.studentName || "").toLowerCase().includes(term)
    );
  });

  // Compute stats from raw list
  const paid = invoices.filter((i) => i.status === "Paid");
  const pending = invoices.filter((i) => i.status === "Pending");
  const stats = {
    totalCollected: `₹${paid.reduce((a, i) => a + i.amount, 0).toLocaleString("en-IN")}`,
    pendingAmount: `₹${pending.reduce((a, i) => a + i.amount, 0).toLocaleString("en-IN")}`,
    completionRate:
      invoices.length > 0 ? `${Math.round((paid.length / invoices.length) * 100)}%` : "0%",
    overdueAccounts: pending.length,
  };

  return {
    payments: filteredInvoices,
    loading,
    error,
    stats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    monthFilter,
    setMonthFilter,
    recordPayment,
    refetch: fetchInvoices,
    toast,
    setToast,
  };
}
