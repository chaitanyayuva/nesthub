"use client";

import { useState, useEffect } from "react";

export function useRooms() {
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [rooms, setRooms] = useState([]);

  const floors = [
    { name: "Ground Floor", id: 0 },
    { name: "1st Floor", id: 1 },
    { name: "2nd Floor", id: 2 },
    { name: "3rd Floor", id: 3 },
  ];

  const statuses = [
    { label: "Fully Occupied", color: "bg-blue-500", desc: "No space left" },
    { label: "Partially Free", color: "bg-orange-800", desc: "1+ bed available" },
    { label: "Available", color: "bg-green-500", desc: "Fully empty" },
    { label: "Maintenance", color: "bg-red-500", desc: "Repairs in progress" },
  ];

  useEffect(() => {
    // Generate stable mock data based on floor to avoid hydration issues
    setRooms(Array.from({ length: 11 }, (_, i) => ({
      id: `${selectedFloor}${101 + i}`,
      status: ["Occupied", "Partial", "Available", "Maintenance"][(i + selectedFloor) % 4],
      beds: 3,
      occupied: (i + selectedFloor) % 4,
    })));
  }, [selectedFloor]);

  return {
    rooms,
    floors,
    selectedFloor,
    setSelectedFloor,
    statuses
  };
}
