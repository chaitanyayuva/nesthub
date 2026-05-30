"use client";

import { useState, useEffect, useCallback } from "react";
import api from "../lib/api";

export function useNotices() {
  const [pinnedNotices, setPinnedNotices] = useState([]);
  const [otherNotices, setOtherNotices] = useState([]);
  const [allNotices, setAllNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/notices");
      const pinned = res.data.pinned || [];
      const recent = res.data.recent || [];

      // Normalize for UI — add colour classes based on priority
      const colorMap = {
        High: {
          color: "bg-red-50 text-red-600 border-red-100",
          tagColor: "bg-red-500 text-white",
          type: "Urgent",
        },
        Normal: {
          color: "bg-blue-50 text-blue-600 border-blue-100",
          tagColor: "bg-blue-600 text-white",
          type: "General",
        },
        Low: {
          color: "bg-green-50 text-green-600 border-green-100",
          tagColor: "bg-green-600 text-white",
          type: "General",
        },
      };

      const normalize = (n) => ({
        ...n,
        id: n._id,
        content: n.description,
        time: new Date(n.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        ...(colorMap[n.priority] || colorMap["Low"]),
      });

      const normalizedPinned = pinned.map(normalize);
      const normalizedRecent = recent.map(normalize);
      const combined = [...normalizedPinned, ...normalizedRecent];

      setPinnedNotices(normalizedPinned);
      setOtherNotices(normalizedRecent);
      setAllNotices(combined);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notices");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const postNotice = async (data) => {
    const res = await api.post("/api/notices", data);
    fetchNotices();
    return res.data;
  };

  return {
    pinnedNotices,
    otherNotices,
    allNotices,
    loading,
    error,
    refetch: fetchNotices,
    postNotice,
  };
}
