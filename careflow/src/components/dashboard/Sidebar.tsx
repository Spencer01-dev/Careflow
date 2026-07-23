"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity, LayoutDashboard, Users, FileText, Calendar, FlaskConical,
  Pill, Radio, CreditCard, Shield, Package, UserCog, BarChart3,
  Heart, Stethoscope, Video, Settings, ChevronDown,
  ChevronRight, Bell, Truck, Droplets, Building2, Brain, BedDouble,
  Scissors,
} from "lucide-react";

const navItems = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: Bell, label: "Notifications", href: "/dashboard/notifications", badge: "8" },
    ],
  },
  {
    label: "Clinical",
    items: [
      { icon: Users, label: "Patients", href: "/dashboard/patients" },
      { icon: FileText, label: "Medical Records", href: "/dashboard/records" },
      { icon: Calendar, label: "Appointments", href: "/dashboard/appointments" },
      { icon: Stethoscope, label: "Consultations", href: "/dashboard/consultations" },
      { icon: Heart, label: "ICU", href: "/dashboard/icu" },
      { icon: BedDouble, label: "Wards & Beds", href: "/dashboard/wards" },
      { icon: Scissors, label: "Theatre", href: "/dashboard/theatre" },
    ],
  },
  {
    label: "Diagnostics",
    items: [
      { icon: FlaskConical, label: "Laboratory", href: "/dashboard/laboratory" },
      { icon: Radio, label: "Radiology", href: "/dashboard/radiology" },
    ],
  },
  {
    label: "Pharmacy & Stock",
    items: [
      { icon: Pill, label: "Pharmacy", href: "/dashboard/pharmacy" },
      { icon: Package, label: "Inventory", href: "/dashboard/inventory" },
      { icon: Droplets, label: "Blood Bank", href: "/dashboard/blood-bank" },
    ],
  },
  {
    label: "Finance",
    items: [
      { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
      { icon: Shield, label: "Insurance", href: "/dashboard/insurance" },
    ],
  },
  {
    label: "Operations",
    items: [
      { icon: UserCog, label: "HR & Payroll", href: "/dashboard/hr" },
      { icon: Building2, label: "Departments", href: "/dashboard/departments" },
      { icon: Truck, label: "Ambulance", href: "/dashboard/ambulance" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { icon: Brain, label: "AI Assistant", href: "/dashboard/ai" },
      { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
      { icon: Video, label: "Telemedicine", href: "/dashboard/telemedicine" },
    ],
  },
  {
    label: "System",
    items: [
      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Overview", "Clinical"]);

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  const sidebarWidth = collapsed ? 64 : 256;

  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 z-40 overflow-x-hidden select-none"
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-800 flex-shrink-0">
        <button onClick={onToggle} className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg hover:scale-105 transition-transform">
          <Activity size={16} className="text-white" />
        </button>
        {!collapsed && (
          <span className="text-lg font-bold text-white truncate">Care<span className="text-emerald-400">Flow</span></span>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6 scrollbar-none">
        {navItems.map((group) => {
          const isGroupExpanded = expandedGroups.includes(group.label);
          return (
            <div key={group.label}>
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="w-full flex items-center justify-between px-4 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 transition-colors"
                >
                  <span>{group.label}</span>
                  {isGroupExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </button>
              )}
              {(collapsed || isGroupExpanded) && group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 mx-2 rounded-xl text-sm font-medium transition-all duration-150 relative group",
                      isActive
                        ? "bg-emerald-600/20 text-emerald-300 border border-emerald-600/30"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon size={16} className={cn("flex-shrink-0", isActive && "text-emerald-400")} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {item.badge && !collapsed && (
                      <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {item.badge}
                      </span>
                    )}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
