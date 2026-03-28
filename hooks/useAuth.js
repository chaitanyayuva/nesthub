"use client";

import { useMemo } from "react";

const USER = {
  id: "NH-2024-0012",
  name: "Rahul Kumar",
  role: "Student",
  room: "302-B",
  hostel: "Main Building",
  avatar: "https://ui-avatars.com/api/?name=Rahul+Kumar&background=1A3A2A&color=fff"
};

export function useAuth() {
  const user = useMemo(() => USER, []);

  return {
    user,
    isAuthenticated: true,
    isAdmin: false
  };
}
