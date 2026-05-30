"use client";

import { useState, useEffect, useCallback } from "react";
import api from "../lib/api";

const STATUS_COLORS = {
  Approved: "bg-green-50 text-green-600 border-green-100",
  Rejected: "bg-red-50 text-red-600 border-red-100",
  Pending: "bg-orange-50 text-orange-600 border-orange-100",
};

export function useLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaves = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/leaves");
      setLeaves(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load leaves");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const submitLeave = async (data) => {
    const res = await api.post("/api/leaves", data);
    fetchLeaves();
    return res.data;
  };

  const reviewLeave = async (id, data) => {
    const res = await api.put(`/api/leaves/${id}/review`, data);
    fetchLeaves();
    return res.data;
  };

  // Shape for the history list UI
  const leaveHistory = leaves.map((l) => ({
    id: l.leaveId || l.id || l._id,
    reason: l.reason || l.reasonId,
    from: l.fromDate
      ? new Date(l.fromDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" })
      : "",
    to: l.toDate
      ? new Date(l.toDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" })
      : "",
    days: l.fromDate && l.toDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(l.toDate) - new Date(l.fromDate)) / (1000 * 60 * 60 * 24)
          ) + 1
        )
      : 0,
    status: l.status,
    studentName: l.studentName,
    statusColor: STATUS_COLORS[l.status] || STATUS_COLORS.Pending,
  }));

  return {
    leaves,
    leaveHistory,
    loading,
    error,
    refetch: fetchLeaves,
    submitLeave,
    reviewLeave,
  };
}
