"use client";

import { useState, useMemo } from "react";

const MOCK_COMPLAINTS = [
  { id: "C-1024", student: "Rahul Kumar", room: "302-B", category: "Plumbing", subject: "Leaking tap in bathroom", time: "2 hours ago", priority: "P1", status: "Open" },
  { id: "C-1022", student: "Ankit Sharma", room: "105-A", category: "Electrical", subject: "Fan not working", time: "5 hours ago", priority: "P2", status: "In Progress", assignedTo: "Rajesh (Electrician)" },
  { id: "C-1018", student: "Vikram Singh", room: "210-C", category: "Furniture", subject: "Broken chair leg", time: "1 day ago", priority: "P3", status: "Resolved" },
  { id: "C-1025", student: "Deepak Rawat", room: "202", category: "Plumbing", subject: "No water in flush", time: "20 mins ago", priority: "P1", status: "Open" },
];

export function useComplaints() {
  const [activeTab, setActiveTab] = useState("Open");

  const filteredComplaints = useMemo(() => {
    return MOCK_COMPLAINTS.filter(c => c.status === activeTab);
  }, [activeTab]);

  const stats = {
    open: MOCK_COMPLAINTS.filter(c => c.status === "Open").length,
    inProgress: MOCK_COMPLAINTS.filter(c => c.status === "In Progress").length,
    resolved: MOCK_COMPLAINTS.filter(c => c.status === "Resolved").length,
    avgResponse: "2.4 Hours",
    completionRate: "94%"
  };

  return {
    complaints: filteredComplaints,
    activeTab,
    setActiveTab,
    stats
  };
}
