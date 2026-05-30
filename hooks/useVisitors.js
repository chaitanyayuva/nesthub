"use client";

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "./useDebounce";
import api from "../lib/api";

export function useVisitors() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  const fetchVisitors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/visitors");
      setVisitors(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load visitors");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  const requestPass = async (data) => {
    const res = await api.post("/api/visitors", data);
    fetchVisitors();
    return res.data;
  };

  const reviewVisitor = async (id, data) => {
    const res = await api.put(`/api/visitors/${id}/review`, data);
    fetchVisitors();
    return res.data;
  };

  // Split for UI consumption
  const pendingApprovals = visitors
    .filter((v) => v.status === "Pending")
    .map((v) => ({
      ...v,
      visitor: v.visitorName,
      relation: v.relation,
      resident: v.studentName,
      room: v.studentRoom || "",
      expected: `${v.date}, ${v.time}`,
      purpose: v.purpose,
    }));

  const historicalLogs = visitors
    .filter((v) => v.status !== "Pending")
    .map((v) => ({
      ...v,
      visitor: v.visitorName,
      resident: v.studentName,
      date: v.date,
      status: v.status,
    }));

  // Client-side search filter
  const filteredLogs = debouncedSearch
    ? historicalLogs.filter((log) => {
        const term = debouncedSearch.toLowerCase();
        return (
          (log.visitor || "").toLowerCase().includes(term) ||
          (log.resident || "").toLowerCase().includes(term)
        );
      })
    : historicalLogs;

  return {
    visitors,
    pendingApprovals,
    historicalLogs: filteredLogs,
    activeInside: pendingApprovals.length,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    refetch: fetchVisitors,
    requestPass,
    reviewVisitor,
  };
}
