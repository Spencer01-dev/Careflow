"use client";
import { useState, useEffect } from "react";
import {
  Users, BedDouble, CreditCard, FlaskConical, Pill, AlertTriangle,
  TrendingUp, TrendingDown, ArrowUpRight, Clock, Heart, Activity,
  CheckCircle2, Stethoscope, Calendar, BarChart3,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const kpis = [
  { label: "Patients Today", value: "247", change: "+12", trend: "up", icon: Users, color: "blue", gradient: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50" },
  { label: "Bed Occupancy", value: "84%", change: "+3%", trend: "up", icon: BedDouble, color: "teal", gradient: "from-teal-500 to-teal-600", bg: "bg-teal-50" },
  { label: "Revenue Today", value: "$48,230", change: "+8%", trend: "up", icon: CreditCard, color: "green", gradient: "from-green-500 to-green-600", bg: "bg-green-50" },
  { label: "Pending Bills", value: "34", change: "-5", trend: "down", icon: AlertTriangle, color: "amber", gradient: "from-amber-500 to-amber-600", bg: "bg-amber-50" },
  { label: "Lab Requests", value: "89", change: "+14", trend: "up", icon: FlaskConical, color: "violet", gradient: "from-violet-500 to-violet-600", bg: "bg-violet-50" },
  { label: "Medicine Stock", value: "Good", change: "3 low", trend: "down", icon: Pill, color: "red", gradient: "from-red-500 to-red-600", bg: "bg-red-50" },
  { label: "Emergency Cases", value: "7", change: "+2", trend: "up", icon: Heart, color: "rose", gradient: "from-rose-500 to-rose-600", bg: "bg-rose-50" },
  { label: "Appointments", value: "156", change: "+21", trend: "up", icon: Calendar, color: "indigo", gradient: "from-indigo-500 to-indigo-600", bg: "bg-indigo-50" },
];

const revenueData = [
  { day: "Mon", revenue: 32000, patients: 180 },
  { day: "Tue", revenue: 41000, patients: 220 },
  { day: "Wed", revenue: 38000, patients: 195 },
  { day: "Thu", revenue: 52000, patients: 267 },
  { day: "Fri", revenue: 48000, patients: 247 },
  { day: "Sat", revenue: 36000, patients: 168 },
  { day: "Sun", revenue: 28000, patients: 130 },
];

const departmentData = [
  { dept: "Cardiology", patients: 42, color: "#10b981" },
  { dept: "Emergency", patients: 38, color: "#ef4444" },
  { dept: "Maternity", patients: 28, color: "#f59e0b" },
  { dept: "Pediatrics", patients: 24, color: "#14b8a6" },
  { dept: "Surgery", patients: 19, color: "#8b5cf6" },
  { dept: "Other", patients: 96, color: "#94a3b8" },
];

const recentPatients = [
  { id: "P-8821", name: "Sarah Mensah", dept: "Cardiology", status: "Admitted", time: "09:42", avatar: "SM", color: "from-emerald-500 to-teal-500" },
  { id: "P-8820", name: "James Kofi", dept: "Emergency", status: "Critical", time: "09:31", avatar: "JK", color: "from-red-500 to-rose-500" },
  { id: "P-8819", name: "Grace Amara", dept: "Maternity", status: "Stable", time: "09:15", avatar: "GA", color: "from-pink-500 to-rose-400" },
  { id: "P-8818", name: "David Osei", dept: "Orthopedics", status: "Discharged", time: "08:50", avatar: "DO", color: "from-green-500 to-teal-500" },
  { id: "P-8817", name: "Fatima Al-Said", dept: "Radiology", status: "In Progress", time: "08:22", avatar: "FA", color: "from-violet-500 to-purple-500" },
];

const statusColors: Record<string, string> = {
  Admitted: "badge-info",
  Critical: "badge-error",
  Stable: "badge-success",
  Discharged: "badge-default",
  "In Progress": "badge-warning",
};

const activityFeed = [
  { icon: CheckCircle2, color: "text-green-500", title: "Lab results approved", time: "2m ago", desc: "Blood panel for John D. — Normal" },
  { icon: AlertTriangle, color: "text-red-500", title: "Critical alert triggered", time: "5m ago", desc: "ICU Room 3 — BP critically low" },
  { icon: Stethoscope, color: "text-emerald-500", title: "New consultation started", time: "8m ago", desc: "Dr. Ama → Patient P-8815" },
  { icon: Pill, color: "text-teal-500", title: "Prescription dispensed", time: "12m ago", desc: "Pharmacy — 4 medications" },
  { icon: Heart, color: "text-rose-500", title: "Emergency admission", time: "18m ago", desc: "Patient James K. — Chest pain" },
];

export default function DashboardPage() {
  const [userName, setUserName] = useState("Dr. Rashid");

  useEffect(() => {
    const email = localStorage.getItem("careflow_user_email");
    if (email) {
      const namePart = email.split("@")[0].replace(/[0-9]/g, '');
      let formattedName = namePart;
      
      if (namePart.includes('.') || namePart.includes('_')) {
        formattedName = namePart.split(/[._]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      } else {
        formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      }
      
      if (formattedName.toLowerCase() === "muneneoscar") formattedName = "Oscar Munene";
      
      setUserName(formattedName);
    }
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 max-w-7xl mx-auto space-y-6 w-full">


      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good morning, {userName} 👋</h1>
          <p className="text-sm text-slate-500 mt-0.5">Here&apos;s what&apos;s happening at your hospital today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <Clock size={14} />
          <span>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon size={18} className="text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${kpi.trend === "up" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                  {kpi.trend === "up" ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {kpi.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 stat-value">{kpi.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Revenue & Patient Flow</h2>
              <p className="text-xs text-slate-500 mt-0.5">This week&apos;s performance</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-500" />Revenue</span>
              <span className="flex items-center gap-1 text-xs text-teal-600"><span className="w-2 h-2 rounded-full bg-teal-500" />Patients</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="patGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={40} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="patients" stroke="#14b8a6" strokeWidth={2} fill="url(#patGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Pie */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-1">Department Distribution</h2>
          <p className="text-xs text-slate-500 mb-4">Today&apos;s patients by dept</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="patients" paddingAngle={3}>
                {departmentData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {departmentData.slice(0, 5).map((d) => (
              <div key={d.dept} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-slate-600">{d.dept}</span>
                </div>
                <span className="font-semibold text-slate-800">{d.patients}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
            <h2 className="text-base font-bold text-slate-900">Recent Patients</h2>
            <button className="flex items-center gap-1 text-xs text-emerald-600 font-medium hover:underline">
              View all <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentPatients.map((p) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {p.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{p.name}</span>
                    <span className="text-xs text-slate-400 font-mono">{p.id}</span>
                  </div>
                  <span className="text-xs text-slate-500">{p.dept}</span>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[p.status]}`}>{p.status}</span>
                  <div className="text-[10px] text-slate-400 mt-1">{p.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
            <h2 className="text-base font-bold text-slate-900">Activity Feed</h2>
            <Activity size={16} className="text-slate-400" />
          </div>
          <div className="p-4 space-y-3">
            {activityFeed.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon size={13} className={item.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-800">{item.title}</span>
                      <span className="text-[10px] text-slate-400 flex-shrink-0">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
