"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "./useDebounce";

const MOCK_STUDENTS = [
  { id: "NH-2024-0012", name: "Rahul Kumar", institution: "IIM Bangalore", room: "302-B", rentStatus: "Paid", joinDate: "12 Jan, 2024", email: "rahul.k@example.com" },
  { id: "NH-2024-0015", name: "Ankit Sharma", institution: "BITS Pilani", room: "105-A", rentStatus: "Pending", joinDate: "15 Jan, 2024", email: "ankit.s@example.com" },
  { id: "NH-2024-0018", name: "Vikram Singh", institution: "RVCE", room: "210-C", rentStatus: "Paid", joinDate: "20 Jan, 2024", email: "vikram.s@example.com" },
  { id: "NH-2024-0022", name: "Siddharth J.", institution: "PES University", room: "404-A", rentStatus: "Overdue", joinDate: "05 Feb, 2024", email: "sid.j@example.com" },
  { id: "NH-2024-0025", name: "Aman Gupta", institution: "MS Ramaiah", room: "112-B", rentStatus: "Paid", joinDate: "10 Feb, 2024", email: "aman.g@example.com" },
  { id: "NH-2024-0028", name: "Rohit Verma", institution: "IIM Bangalore", room: "302-A", rentStatus: "Paid", joinDate: "12 Feb, 2024", email: "rohit.v@example.com" },
];

export function useStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredStudents = useMemo(() => {
    if (!debouncedSearch) return MOCK_STUDENTS;
    const term = debouncedSearch.toLowerCase();
    return MOCK_STUDENTS.filter(s => 
      s.name.toLowerCase().includes(term) || 
      s.id.toLowerCase().includes(term) || 
      s.institution.toLowerCase().includes(term)
    );
  }, [debouncedSearch]);

  return {
    students: filteredStudents,
    searchTerm,
    setSearchTerm,
    totalCount: 124
  };
}
