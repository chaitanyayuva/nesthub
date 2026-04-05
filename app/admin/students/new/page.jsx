"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  UserPlus, ArrowLeft, ChevronRight, Upload, User, 
  Phone, Mail, Home, Building2, Calendar, CreditCard, Shield
} from "lucide-react";

const STEPS = ["Personal Info", "Room & Stay", "Guardian & Docs", "Confirm"];

export default function NewStudentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [form, setForm] = useState({
    fullName: "", rollNo: "", email: "", phone: "", institution: "", course: "", year: "1st",
    roomNo: "", block: "", checkIn: "", rentAmount: "8000",
    guardianName: "", guardianPhone: "", guardianRelation: "Parent",
    idType: "Aadhar", idNumber: "",
  });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const isStepValid = () => {
    if (step === 0) return form.fullName && form.email && form.phone && form.institution;
    if (step === 1) return form.roomNo && form.block && form.checkIn;
    if (step === 2) return form.guardianName && form.guardianPhone && form.idNumber;
    return true;
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 sm:px-0">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => router.back()} className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-nesthub-primary transition-all shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-nesthub-primary tracking-tight">New Student Registration</h1>
          <p className="text-gray-400 text-sm font-medium">Add a new resident to the hostel system.</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center mb-10 gap-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-2 overflow-x-auto scrollbar-none">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 min-w-[80px]">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex-1 text-center py-2.5 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                i === step ? "bg-nesthub-primary text-white shadow-lg" :
                i < step ? "text-nesthub-primary hover:bg-nesthub-primary/5 cursor-pointer" :
                "text-gray-300"
              }`}
            >
              <span className="block text-[9px] font-black mb-0.5">{i + 1 < 10 ? `0${i+1}` : i+1}</span>
              {s}
            </button>
            {i < STEPS.length - 1 && <div className={`h-px w-4 shrink-0 ${i < step ? "bg-nesthub-primary" : "bg-gray-100"}`} />}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 mb-6">

        {/* Step 0: Personal Info */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="font-heading text-lg font-bold text-nesthub-primary mb-6 flex items-center gap-2"><User size={20} />Personal Information</h2>

            {/* Photo Upload */}
            <div className="flex flex-col items-center mb-6">
              <div
                className="w-28 h-28 rounded-[28px] border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden hover:border-nesthub-primary/30 transition-all relative group bg-gray-50"
                onClick={() => document.getElementById("photo-input").click()}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-300 group-hover:text-nesthub-primary transition-colors">
                    <Upload size={28} strokeWidth={1.5} />
                    <span className="text-[10px] font-black uppercase tracking-wider text-center">Upload Photo</span>
                  </div>
                )}
              </div>
              <input id="photo-input" type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", key: "fullName", icon: User, placeholder: "Rahul Kumar" },
                { label: "Roll / Reg. Number", key: "rollNo", icon: Shield, placeholder: "NH2025001" },
                { label: "Email Address", key: "email", icon: Mail, placeholder: "rahul@college.ac.in", type: "email" },
                { label: "Phone Number", key: "phone", icon: Phone, placeholder: "+91 9876543210" },
                { label: "Institution / College", key: "institution", icon: Building2, placeholder: "Delhi University" },
                { label: "Course / Program", key: "course", icon: Building2, placeholder: "B.Tech Computer Science" },
              ].map(({ label, key, icon: Icon, placeholder, type = "text" }) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                    <Icon size={12} className="text-nesthub-accent" />{label}
                  </label>
                  <input
                    type={type} value={form[key]} onChange={(e) => set(key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Year of Study</label>
                <select value={form.year} onChange={(e) => set("year", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all">
                  {["1st", "2nd", "3rd", "4th", "5th"].map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Room & Stay */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-heading text-lg font-bold text-nesthub-primary mb-6 flex items-center gap-2"><Home size={20} />Room & Stay Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Room Number", key: "roomNo", placeholder: "301" },
                { label: "Block", key: "block", placeholder: "Block A" },
                { label: "Check-in Date", key: "checkIn", type: "date" },
                { label: "Monthly Rent (₹)", key: "rentAmount", placeholder: "8000" },
              ].map(({ label, key, placeholder, type = "text" }) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">{label}</label>
                  <input type={type} value={form[key]} onChange={(e) => set(key, e.target.value)} placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Guardian & Docs */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-heading text-lg font-bold text-nesthub-primary mb-6 flex items-center gap-2"><Shield size={20} />Guardian & Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Guardian Name", key: "guardianName", placeholder: "Anil Kumar" },
                { label: "Guardian Phone", key: "guardianPhone", placeholder: "+91 9876543200" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">{label}</label>
                  <input value={form[key]} onChange={(e) => set(key, e.target.value)} placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Relationship</label>
                <select value={form.guardianRelation} onChange={(e) => set("guardianRelation", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all">
                  {["Parent", "Guardian", "Sibling", "Spouse"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">ID Type</label>
                <select value={form.idType} onChange={(e) => set("idType", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all">
                  {["Aadhar", "PAN", "Passport", "Voter ID", "Driving License"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1.5">ID Number</label>
                <input value={form.idNumber} onChange={(e) => set("idNumber", e.target.value)} placeholder="XXXX-XXXX-XXXX"
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-nesthub-primary/20 focus:border-nesthub-primary transition-all" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-bold text-nesthub-primary mb-6">Review & Confirm</h2>
            {[
              ["Full Name", form.fullName], ["Roll No.", form.rollNo], ["Email", form.email],
              ["Phone", form.phone], ["Institution", form.institution], ["Course", form.course],
              ["Room No.", form.roomNo], ["Block", form.block], ["Check-in", form.checkIn],
              ["Monthly Rent", `₹${form.rentAmount}`], ["Guardian", form.guardianName],
              ["Guardian Phone", form.guardianPhone], ["ID Type", form.idType], ["ID Number", form.idNumber],
            ].map(([label, value]) => value && (
              <div key={label} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400">{label}</span>
                <span className="text-sm font-bold text-nesthub-primary text-right max-w-[60%] truncate">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="flex-1 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-sm text-gray-500 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Back
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!isStepValid()}
            className="flex-1 py-4 bg-nesthub-primary text-white rounded-2xl font-bold text-sm shadow-xl shadow-nesthub-primary/20 hover:bg-[#204a35] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Continue <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={() => router.push("/admin/students")}
            className="flex-1 py-4 bg-nesthub-accent text-white rounded-2xl font-bold text-sm shadow-xl shadow-nesthub-accent/20 hover:bg-[#E59734] transition-all flex items-center justify-center gap-2">
            <UserPlus size={16} /> Register Student
          </button>
        )}
      </div>
    </div>
  );
}
