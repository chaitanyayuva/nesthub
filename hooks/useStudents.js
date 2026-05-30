"use client";

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "./useDebounce";
import api from "../lib/api";

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const limit = 10;

  const debouncedSearch = useDebounce(searchTerm, 400);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit };
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter) params.status = statusFilter;

      const res = await api.get("/api/students", { params });
      setStudents(res.data.data || []);
      setTotal(res.data.total || 0);
      setPages(res.data.pages || 1);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const addStudent = async (formData) => {
    const res = await api.post("/api/students", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    fetchStudents();
    return res.data;
  };

  return {
    students,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    total,
    pages,
    totalCount: total,
    refetch: fetchStudents,
    addStudent,
  };
}
