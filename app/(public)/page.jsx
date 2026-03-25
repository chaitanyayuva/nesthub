import Link from "next/link";
import { Smartphone, Monitor } from "lucide-react";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-nesthub-bg flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <h1
            className="text-[48px] font-bold text-nesthub-primary mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            NestHub
          </h1>
          <p className="text-[16px] text-nesthub-text-secondary">
            Student Hostel Management Platform for India
          </p>
          <p className="text-[13px] text-nesthub-text-muted mt-1">
            Sterling Heights Hostel
          </p>
        </div>

        {/* App Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Student App */}
          <Link
            href="/login?role=student"
            className="group bg-nesthub-surface border-2 border-nesthub-border hover:border-nesthub-primary rounded-2xl p-8 transition-all hover:shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-nesthub-success-bg rounded-xl flex items-center justify-center">
                <Smartphone size={32} className="text-nesthub-success-text" />
              </div>
              <div>
                <h2
                  className="text-[20px] font-bold text-nesthub-text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Student App
                </h2>
                <p className="text-[12px] text-nesthub-text-muted">
                  Mobile Interface
                </p>
              </div>
            </div>

            <p className="text-[13px] text-nesthub-text-secondary mb-4">
              Access your digital ID, pay rent, raise complaints, manage visitor
              passes, and view notices.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-nesthub-bg text-nesthub-text-muted text-[10px] rounded">
                Home
              </span>
              <span className="px-2 py-1 bg-nesthub-bg text-nesthub-text-muted text-[10px] rounded">
                Digital ID
              </span>
              <span className="px-2 py-1 bg-nesthub-bg text-nesthub-text-muted text-[10px] rounded">
                Payments
              </span>
              <span className="px-2 py-1 bg-nesthub-bg text-nesthub-text-muted text-[10px] rounded">
                Complaints
              </span>
              <span className="px-2 py-1 bg-nesthub-bg text-nesthub-text-muted text-[10px] rounded">
                Visitors
              </span>
              <span className="px-2 py-1 bg-nesthub-bg text-nesthub-text-muted text-[10px] rounded">
                Notices
              </span>
            </div>

            <div className="mt-6 text-[13px] text-nesthub-primary font-medium group-hover:translate-x-2 transition-transform inline-block">
              Open Student Login →
            </div>
          </Link>

          {/* Admin Panel */}
          <Link
            href="/login?role=admin"
            className="group bg-nesthub-surface border-2 border-nesthub-border hover:border-nesthub-primary rounded-2xl p-8 transition-all hover:shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-nesthub-info-bg rounded-xl flex items-center justify-center">
                <Monitor size={32} className="text-nesthub-info-text" />
              </div>
              <div>
                <h2
                  className="text-[20px] font-bold text-nesthub-text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Admin Panel
                </h2>
                <p className="text-[12px] text-nesthub-text-muted">
                  Desktop Interface
                </p>
              </div>
            </div>

            <p className="text-[13px] text-nesthub-text-secondary mb-4">
              Manage students, rooms, payments, complaints, and visitor
              approvals from a centralized dashboard.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-nesthub-bg text-nesthub-text-muted text-[10px] rounded">
                Dashboard
              </span>
              <span className="px-2 py-1 bg-nesthub-bg text-nesthub-text-muted text-[10px] rounded">
                Students
              </span>
              <span className="px-2 py-1 bg-nesthub-bg text-nesthub-text-muted text-[10px] rounded">
                Rooms
              </span>
              <span className="px-2 py-1 bg-nesthub-bg text-nesthub-text-muted text-[10px] rounded">
                Payments
              </span>
              <span className="px-2 py-1 bg-nesthub-bg text-nesthub-text-muted text-[10px] rounded">
                Complaints
              </span>
              <span className="px-2 py-1 bg-nesthub-bg text-nesthub-text-muted text-[10px] rounded">
                Visitors
              </span>
            </div>

            <div className="mt-6 text-[13px] text-nesthub-primary font-medium group-hover:translate-x-2 transition-transform inline-block">
              Open Admin Login →
            </div>
          </Link>
        </div>

        {/* Design System Info */}
        <div className="mt-12 bg-nesthub-surface border border-nesthub-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3
              className="text-[14px] font-bold text-nesthub-text-primary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Design System
            </h3>
            <Link
              href="/components"
              className="text-[12px] text-nesthub-primary font-medium hover:underline"
            >
              View Component Library →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] text-nesthub-text-muted mb-2 uppercase tracking-wide">
                Primary Color
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-nesthub-primary rounded border border-nesthub-border" />
                <span className="text-[11px] text-nesthub-text-secondary">
                  #1A3A2A
                </span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-nesthub-text-muted mb-2 uppercase tracking-wide">
                Accent Color
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-nesthub-accent rounded border border-nesthub-border" />
                <span className="text-[11px] text-nesthub-text-secondary">
                  #F4A340
                </span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-nesthub-text-muted mb-2 uppercase tracking-wide">
                Typography
              </p>
              <p className="text-[11px] text-nesthub-text-secondary">
                Syne · DM Sans
              </p>
            </div>
            <div>
              <p className="text-[10px] text-nesthub-text-muted mb-2 uppercase tracking-wide">
                Screens
              </p>
              <p className="text-[11px] text-nesthub-text-secondary">
                12 total screens
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
