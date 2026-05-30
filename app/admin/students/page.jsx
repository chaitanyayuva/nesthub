"use client";

import { useState } from "react";
import { useStudents } from "../../../hooks/useStudents";
import { StudentFilters } from "../../../components/admin/StudentFilters";
import { StudentTable } from "../../../components/admin/StudentTable";
import { AddStudentModal } from "../../../components/admin/AddStudentModal";
import { Download, UserPlus, Loader2 } from "lucide-react";

export default function AdminStudents() {
  const {
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
    addStudent,
  } = useStudents();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleAddStudent = async (data) => {
    setSubmitError(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== null) formData.append(k, v); });
      await addStudent(formData);
      setIsAddModalOpen(false);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Failed to add student");
    }
  };

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto px-1 sm:px-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6 px-4 sm:px-0">
         <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-nesthub-primary tracking-tight">Student Directory</h1>
            <p className="text-gray-400 font-medium text-sm mt-1">Manage residency records and institutional data.</p>
         </div>
         <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-initial bg-white text-nesthub-primary px-6 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest border border-gray-100 shadow-sm flex items-center justify-center gap-2.5 hover:bg-gray-50 transition-all active:scale-95">
               <Download size={16} strokeWidth={2.5} />
               Export
            </button>
            <button
               onClick={() => setIsAddModalOpen(true)}
               className="flex-1 sm:flex-initial bg-nesthub-primary text-white px-6 py-3.5 rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-xl shadow-nesthub-primary/20 flex items-center justify-center gap-2.5 hover:bg-[#204a35] transition-all active:scale-95"
            >
               <UserPlus size={16} strokeWidth={2.5} />
               Add New
            </button>
         </div>
      </div>

      {/* Filter Bar */}
      <StudentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Loading / Error */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={32} className="animate-spin text-nesthub-primary" />
        </div>
      )}
      {error && !loading && (
        <div className="text-center py-16 text-red-500 font-semibold">{error}</div>
      )}

      {/* Main Table */}
      {!loading && !error && <StudentTable students={students} />}

      {/* Pagination Footer */}
      <div className="mt-8 bg-white px-8 py-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
         <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 text-center sm:text-left">
            Showing <span className="text-nesthub-primary">{students.length}</span> of {total} residents
         </p>
         <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex-1 sm:flex-initial px-8 py-3.5 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-nesthub-primary transition-colors disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page >= pages}
              className="flex-1 sm:flex-initial px-8 py-3.5 bg-nesthub-primary/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-nesthub-primary hover:bg-nesthub-primary hover:text-white transition-all shadow-sm active:scale-95 disabled:opacity-40"
            >
              Next
            </button>
         </div>
      </div>

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); setSubmitError(null); }}
        onSubmit={handleAddStudent}
        submitError={submitError}
      />
    </div>
  );
}

