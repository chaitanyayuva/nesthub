"use client";

import { useState, useEffect, useCallback } from "react";
import api from "../lib/api";

export function useRooms() {
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statuses = [
    { label: "Fully Occupied", color: "bg-blue-500", desc: "No space left" },
    { label: "Partially Free", color: "bg-orange-800", desc: "1+ bed available" },
    { label: "Available", color: "bg-green-500", desc: "Fully empty" },
    { label: "Maintenance", color: "bg-red-500", desc: "Repairs in progress" },
  ];

  // Fetch floor list on mount
  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const res = await api.get("/api/rooms/floors");
        const floorList = res.data || [];
        setFloors(floorList);
        if (floorList.length > 0) {
          setSelectedFloor(floorList[0].id);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load floors");
      }
    };
    fetchFloors();
  }, []);

  // Fetch rooms whenever floor changes
  const fetchRooms = useCallback(async () => {
    if (!selectedFloor) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/rooms", { params: { floorId: selectedFloor } });
      setRooms(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  }, [selectedFloor]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return {
    rooms,
    floors,
    selectedFloor,
    setSelectedFloor,
    statuses,
    loading,
    error,
    refetch: fetchRooms,
  };
}
