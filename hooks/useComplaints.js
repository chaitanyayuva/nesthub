"use client";

import { useState, useEffect, useCallback } from "react";
import api from "../lib/api";

export function useComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Open");
  const [stats, setStats] = useState({
    open: 0,
    inProgress: 0,
    resolved: 0,
    avgResponse: "—",
    completionRate: "—",
  });

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all to compute stats, then filter client-side for tab
      const [openRes, inProgressRes, resolvedRes] = await Promise.all([
        api.get("/api/complaints", { params: { status: "Open" } }),
        api.get("/api/complaints", { params: { status: "Assigned" } }),
        api.get("/api/complaints", { params: { status: "Resolved" } }),
      ]);

      const openList = openRes.data || [];
      const inProgressList = inProgressRes.data || [];
      const resolvedList = resolvedRes.data || [];

      setStats({
        open: openList.length,
        inProgress: inProgressList.length,
        resolved: resolvedList.length,
        avgResponse: "2.4 Hours",
        completionRate:
          resolvedList.length + openList.length + inProgressList.length > 0
            ? `${Math.round(
                (resolvedList.length /
                  (resolvedList.length + openList.length + inProgressList.length)) *
                  100
              )}%`
            : "0%",
      });

      // Set current tab complaints
      const tabMap = { Open: openList, "In Progress": inProgressList, Resolved: resolvedList };
      setComplaints(tabMap[activeTab] || openList);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load complaints");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const createComplaint = async (formData) => {
    const res = await api.post("/api/complaints", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    fetchComplaints();
    return res.data;
  };

  const assignComplaint = async (ticketId, data) => {
    const res = await api.put(`/api/complaints/${ticketId}/assign`, data);
    fetchComplaints();
    return res.data;
  };

  const updateStatus = async (ticketId, status) => {
    const res = await api.put(`/api/complaints/${ticketId}/status`, { status });
    fetchComplaints();
    return res.data;
  };

  return {
    complaints,
    loading,
    error,
    activeTab,
    setActiveTab,
    stats,
    refetch: fetchComplaints,
    createComplaint,
    assignComplaint,
    updateStatus,
  };
}
