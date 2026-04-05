"use client";

import { useState } from "react";
import { X, Upload, UserPlus } from "lucide-react";

export function AddStudentModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    room: "",
    rent: "",
    checkIn: "",
    guardianName: "",
    guardianPhone: "",
    documents: null,
  });

  const [dragging, setDragging] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setForm((prev) => ({ ...prev, documents: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-nesthub-primary/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl relative z-10 animate-slide-up overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-nesthub-primary/10 p-2.5 rounded-xl">
              <UserPlus size={18} className="text-nesthub-primary" />
            </div>
            <h3 className="font-heading text-xl font-bold text-nesthub-primary tracking-tight">
              Add New Student
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-nesthub-primary"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="p-8 overflow-y-auto space-y-6">
            {/* Personal Details */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                Personal Details
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="student@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <div className="flex">
                    <span className="px-3 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-2xl text-sm font-bold text-gray-500">
                      +91
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="9876543210"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-r-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    College / University <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="college"
                    value={form.college}
                    onChange={handleChange}
                    required
                    placeholder="Delhi University"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Residency Details */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                Residency Details
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    Room Assignment <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="room"
                    value={form.room}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all bg-white"
                  >
                    <option value="">Select Room</option>
                    {["101", "102", "201", "202", "301", "302", "303", "401"].map((r) => (
                      <option key={r} value={r}>Room {r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    Monthly Rent (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="rent"
                    type="number"
                    value={form.rent}
                    onChange={handleChange}
                    required
                    placeholder="8000"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    Check-in Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="checkIn"
                    type="date"
                    value={form.checkIn}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Guardian Info */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                Guardian Info
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    Guardian Name
                  </label>
                  <input
                    name="guardianName"
                    value={form.guardianName}
                    onChange={handleChange}
                    placeholder="Parent / Guardian name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    Guardian Phone
                  </label>
                  <div className="flex">
                    <span className="px-3 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-2xl text-sm font-bold text-gray-500">
                      +91
                    </span>
                    <input
                      name="guardianPhone"
                      type="tel"
                      value={form.guardianPhone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-r-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                Upload Documents
              </p>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById("doc-upload").click()}
                className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                  dragging
                    ? "border-nesthub-primary bg-nesthub-primary/5"
                    : "border-gray-200 hover:border-nesthub-primary/40 hover:bg-gray-50"
                }`}
              >
                <div className="bg-gray-100 p-4 rounded-2xl">
                  <Upload size={24} className="text-gray-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-500">
                    {form.documents ? form.documents.name : "Drop files here or click to upload"}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">
                    ID Proof, College ID, etc. (PDF, JPG, PNG)
                  </p>
                </div>
                <input
                  id="doc-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => setForm((prev) => ({ ...prev, documents: e.target.files[0] }))}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-3 rounded-2xl text-sm font-bold text-white bg-nesthub-primary hover:bg-[#204a35] shadow-lg shadow-nesthub-primary/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <UserPlus size={16} />
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
