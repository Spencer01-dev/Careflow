"use client";
import { Search, Bell, Sun, Moon, Menu, ChevronDown, X, User, Settings, ShieldCheck, LogOut, Building, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface TopbarProps {
  collapsed: boolean;
  onToggleSidebar: () => void;
}

export default function Topbar({ collapsed, onToggleSidebar }: TopbarProps) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName, setUserName] = useState("Admin User");
  const [userRole, setUserRole] = useState("Administrator");
  const [userEmail, setUserEmail] = useState("admin@careflow.com");
  const [userInitials, setUserInitials] = useState("AU");
  const [globalSearch, setGlobalSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && globalSearch.trim()) {
      router.push(`/dashboard/patients?q=${encodeURIComponent(globalSearch.trim())}`);
    }
    if (e.key === "Escape") {
      setGlobalSearch("");
      searchRef.current?.blur();
    }
  };

  useEffect(() => {
    const realName = localStorage.getItem("careflow_user_name");
    const role = localStorage.getItem("careflow_user_role");
    const email = localStorage.getItem("careflow_user_email");

    if (role) setUserRole(role);
    if (email) setUserEmail(email);

    if (realName && realName.trim()) {
      setUserName(realName.trim());
      const parts = realName.trim().split(" ").filter(Boolean);
      setUserInitials(parts.map((w) => w[0]).join("").toUpperCase().slice(0, 2));
    } else if (email) {
      const localPart = email.split("@")[0].replace(/[0-9]/g, "").replace(/[._-]/g, " ").trim();
      const formatted = localPart
        .split(" ")
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      setUserName(formatted || email.split("@")[0]);
      setUserInitials((formatted || email).substring(0, 2).toUpperCase());
    }
  }, []);

  const notifications = [
    { title: "Lab Results Ready", desc: "Patient John Doe – Blood Panel", time: "2m ago", type: "info", unread: true },
    { title: "Critical Alert", desc: "ICU Patient – BP Critically Low", time: "5m ago", type: "error", unread: true },
    { title: "Appointment Reminder", desc: "Dr. Ama has 3 appointments in 30min", time: "15m ago", type: "warning", unread: true },
    { title: "Prescription Approved", desc: "Pharmacy confirmed prescription #8821", time: "1h ago", type: "success", unread: false },
  ];

  const typeColors: Record<string, string> = {
    info: "bg-emerald-100 text-emerald-600",
    error: "bg-red-100 text-red-600",
    warning: "bg-amber-100 text-amber-600",
    success: "bg-green-100 text-green-600",
  };

  const sidebarWidth = collapsed ? 64 : 256;

  return (
    <header
      className="fixed top-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xs h-14 flex items-center px-4 md:px-6 gap-4 transition-all duration-300"
      style={{ left: `${sidebarWidth}px` }}
    >
      <div className="flex items-center gap-3 flex-shrink-0">
        <button onClick={onToggleSidebar} className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors">
          <Menu size={20} />
        </button>

        {/* Breadcrumb */}
        <div className="hidden xl:flex items-center gap-2 text-sm font-medium">
          <span className="text-slate-500">Dashboard</span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-800">Overview</span>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md ml-2 min-w-0">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search patients..."
            style={{ paddingLeft: "38px" }}
            className="w-full pr-8 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-50 transition-all"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Bell size={17} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-800">Notifications</span>
                <span className="text-xs text-emerald-600 font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n, i) => (
                  <div key={i} className={`flex items-start gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${n.unread ? "bg-emerald-50/30" : ""}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${typeColors[n.type]}`}>
                      {n.title[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-900">{n.title}</span>
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{n.desc}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User menu dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {userInitials}
            </div>
            <div className="hidden md:block text-left min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{userName}</div>
              <div className="text-[10px] text-emerald-600 font-semibold truncate">{userRole}</div>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {/* Detailed User Profile Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Card Header */}
              <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-base font-bold shadow-md flex-shrink-0">
                  {userInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{userName}</h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500 truncate mt-0.5">
                    <Mail size={11} className="text-slate-400 flex-shrink-0" />
                    <span className="truncate">{userEmail}</span>
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                    {userRole}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="px-4 py-2 bg-emerald-50/50 border-b border-slate-100 flex items-center justify-between text-xs text-emerald-700">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>Account Verified</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Action Links */}
              <div className="p-2 space-y-1 text-xs">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    router.push("/dashboard/settings?tab=general");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium transition-colors"
                >
                  <User size={15} className="text-slate-400" />
                  <span>View Full Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    router.push("/dashboard/settings?tab=subscription");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium transition-colors"
                >
                  <Settings size={15} className="text-slate-400" />
                  <span>Workspace Settings</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    router.push("/dashboard/hr");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium transition-colors"
                >
                  <Building size={15} className="text-slate-400" />
                  <span>Staff &amp; Department Hub</span>
                </button>
              </div>

              {/* Logout Button */}
              <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/auth/login";
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <LogOut size={14} />
                  <span>Sign Out of CareFlow</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
