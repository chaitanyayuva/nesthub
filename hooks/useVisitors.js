"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "./useDebounce";

const PENDING_VISITORS = [
  { id: "REQ-0012", visitor: "Suresh Kumar", relation: "Father", resident: "Rahul Kumar", room: "302-B", expected: "29 Mar, 10:00 AM", purpose: "Family Visit", photo: "https://ui-avatars.com/api/?name=Suresh+Kumar&background=e5e7eb&color=4b5563" },
  { id: "REQ-0015", visitor: "Meena Gupta", relation: "Mother", resident: "Ankit Sharma", room: "105-A", expected: "29 Mar, 02:30 PM", purpose: "Home Food Delivery", photo: "https://ui-avatars.com/api/?name=Meena+Gupta&background=e5e7eb&color=4b5563" },
];

const HISTORICAL_LOGS = [
  { visitor: "John Doe", resident: "Vikram Singh", room: "210-C", date: "24 Mar, 11:30 AM", status: "Approved", in: "11:45 AM", out: "01:20 PM" },
  { visitor: "Anil Sharma", resident: "Siddharth J.", room: "404-A", date: "24 Mar, 04:00 PM", status: "Rejected", in: "--", out: "--" },
  { visitor: "Priya V.", resident: "Aman Gupta", room: "112-B", date: "23 Mar, 10:00 AM", status: "Completed", in: "10:15 AM", out: "03:45 PM" },
];

export function useVisitors() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredLogs = useMemo(() => {
    if (!debouncedSearch) return HISTORICAL_LOGS;
    const term = debouncedSearch.toLowerCase();
    return HISTORICAL_LOGS.filter(log => 
      log.visitor.toLowerCase().includes(term) || 
      log.resident.toLowerCase().includes(term)
    );
  }, [debouncedSearch]);

  return {
    pendingApprovals: PENDING_VISITORS,
    historicalLogs: filteredLogs,
    searchTerm,
    setSearchTerm,
    activeInside: 12
  };
}
