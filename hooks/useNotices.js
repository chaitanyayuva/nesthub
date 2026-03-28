"use client";

import { useMemo } from "react";

const MOCK_NOTICES = [
  {
    id: 1,
    type: "Urgent",
    category: "Maintenance",
    title: "Scheduled Maintenance",
    content: "The water supply on the 2nd and 3rd floors will be disrupted tomorrow between 10 AM and 1 PM for maintenance. Please store water beforehand.",
    time: "2 hours ago",
    isPinned: true,
    color: "bg-red-50 text-red-600 border-red-100",
    tagColor: "bg-red-500 text-white"
  },
  {
    id: 2,
    type: "General",
    category: "Event",
    title: "Holi Celebration 2024",
    content: "Join us for the annual Holi celebration in the common courtyard this Sunday. Lunch will be served at 1:30 PM.",
    time: "1 day ago",
    color: "bg-green-50 text-green-600 border-green-100",
    tagColor: "bg-green-600 text-white"
  },
  {
    id: 3,
    type: "General",
    category: "Info",
    title: "New Gym Timings",
    content: "The hostel gym will now be open until 11 PM starting this Monday. Enjoy your workouts!",
    time: "2 days ago",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    tagColor: "bg-blue-600 text-white"
  },
];

export function useNotices() {
  const pinnedNotices = useMemo(() => MOCK_NOTICES.filter(n => n.isPinned), []);
  const otherNotices = useMemo(() => MOCK_NOTICES.filter(n => !n.isPinned), []);

  return {
    pinnedNotices,
    otherNotices,
    allNotices: MOCK_NOTICES
  };
}
