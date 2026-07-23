"use client";
import { useState, useEffect } from "react";
import { 
  Users, UserPlus, Shield, Search, Filter, Lock, Unlock, 
  Trash2, Sparkles, Building, CheckCircle2, AlertTriangle, 
  RefreshCw, Check, Zap, Layers, Activity
} from "lucide-react";
import Button from "@/components/ui/Button";

interface StaffUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  department: string;
  status: string;
  is_active: boolean;
  created_at: string;
}


interface SubscriptionInfo {
  hospital_name: string;
  plan: string;
  max_users: number;
  used_seats: number;
  subscription_status: string;
  unlocked_modules: string;
}

const ROLES = [
  "Doctor", "Nurse", "Pharmacist", "Lab Tech", 
  "Radiologist", "Billing Manager", "Hospital Admin", "Staff"
];

const DEPARTMENTS = [
  "General Outpatient (OPD)", "Inpatient (IPD)", "Pharmacy", 
  "Laboratory", "Radiology", "ICU / Emergency", "Billing & Finance", "Administration"
];

export default function HRStaffPage() {
  const [users, setUsers] = useState<StaffUser[]>([]);
  const [subInfo, setSubInfo] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // New staff form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Doctor");
  const [department, setDepartment] = useState("General Outpatient (OPD)");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("careflow_token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token && token !== "offline") {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      // 1. Fetch staff users
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const usersRes = await fetch(`${API_URL}/api/users`, { headers });
      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(data);
      }

      // 2. Fetch subscription info
      const subRes = await fetch(`${API_URL}/api/subscription`, { headers });
      if (subRes.ok) {
        const subData = await subRes.json();
        setSubInfo(subData);
      }
    } catch {
      // Fallback offline mock data if backend isn't reachable
      setUsers([
        { id: 1, first_name: "Rashid", last_name: "Aman", email: "rashid@hospital.com", role: "Super Admin", department: "Administration", status: "active", is_active: true, created_at: "2026-07-22" },
        { id: 2, first_name: "Sarah", last_name: "Jenkins", email: "sarah.j@hospital.com", role: "Doctor", department: "General Outpatient (OPD)", status: "active", is_active: true, created_at: "2026-07-22" },
        { id: 3, first_name: "David", last_name: "Kipchumba", email: "david.k@hospital.com", role: "Pharmacist", department: "Pharmacy", status: "active", is_active: true, created_at: "2026-07-23" },
      ]);
      setSubInfo({
        hospital_name: "CareFlow Hospital Network",
        plan: "Professional",
        max_users: 200,
        used_seats: 3,
        subscription_status: "active",
        unlocked_modules: "OPD, IPD, Laboratory, Pharmacy, Radiology, ICU, Billing",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGrantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const token = localStorage.getItem("careflow_token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token && token !== "offline") {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          role: role,
          department: department,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.detail || "Failed to grant staff access.");
        return;
      }

      setSuccessMsg(`Access granted to ${firstName} ${lastName} (${role}) successfully!`);
      setShowAddModal(false);
      setFirstName(""); setLastName(""); setEmail(""); setPassword("");
      fetchData();
    } catch {
      setErrorMsg("Network error. Could not connect to API server.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (userId: number, currentStatus: string) => {
    const nextStatus = currentStatus === "active" ? "disabled" : "active";
    const token = localStorage.getItem("careflow_token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token && token !== "offline") headers["Authorization"] = `Bearer ${token}`;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/users/${userId}/status`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: nextStatus, is_active: nextStatus === "active" } : u));
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to revoke and delete this staff access account?")) return;
    const token = localStorage.getItem("careflow_token");
    const headers: Record<string, string> = {};
    if (token && token !== "offline") headers["Authorization"] = `Bearer ${token}`;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        fetchData();
      }
    } catch {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = `${u.first_name} ${u.last_name} ${u.email} ${u.department}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRoleFilter === "All" || u.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  const usedSeats = subInfo?.used_seats ?? users.length;
  const maxSeats = subInfo?.max_users ?? 200;
  const seatPercentage = Math.min(100, Math.round((usedSeats / maxSeats) * 100));

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50 w-full">

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 font-bold">
              <Users size={22} />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">HR & Staff Access Management</h1>
          </div>
          <p className="text-slate-500 text-sm">
            Grant system access, manage staff roles, and monitor active package seat licenses for <strong className="text-slate-800">{subInfo?.hospital_name || "CareFlow Hospital Workspace"}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={fetchData}
            icon={<RefreshCw size={16} className={loading ? "animate-spin" : ""} />}
          >
            Refresh
          </Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
            icon={<UserPlus size={18} />}
            onClick={() => setShowAddModal(true)}
          >
            Grant Staff Access
          </Button>
        </div>
      </div>

      {/* Package Seat Capacity Card */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Seat Usage Bar */}
        <div className="md:col-span-2 bg-gradient-to-br from-[#0B1F3A] to-[#16345A] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Shield className="text-emerald-400" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Active Package Seats</h3>
                <p className="text-xs text-slate-300">Package Tier: <span className="font-semibold text-emerald-400">{subInfo?.plan || "Professional"} Plan</span></p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-xs rounded-full uppercase tracking-wider">
              {subInfo?.subscription_status || "Active"}
            </span>
          </div>

          <div className="relative z-10 space-y-2 mb-4">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-slate-300">Seat Utilization</span>
              <span className="text-emerald-400 font-bold">{usedSeats} / {maxSeats} Seats Occupied ({seatPercentage}%)</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
                style={{ width: `${seatPercentage}%` }}
              />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 border-t border-white/10 pt-3">
            <span>Unlocked Modules: <strong className="text-white">{subInfo?.unlocked_modules || "All Standard Modules"}</strong></span>
            <span className="text-emerald-400 hover:underline cursor-pointer font-semibold" onClick={() => window.location.href = "/dashboard/settings"}>
              Upgrade Package Seats &rarr;
            </span>
          </div>

          {/* Abstract glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        {/* Roles Breakdown Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Layers size={18} className="text-emerald-600" /> Staff Role Distribution
            </h3>
            <p className="text-xs text-slate-500 mb-4">Current workforce access hierarchy</p>

            <div className="space-y-2">
              {ROLES.slice(0, 4).map((r) => {
                const count = users.filter(u => u.role === r).length;
                return (
                  <div key={r} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-100 last:border-0">
                    <span className="font-medium text-slate-700">{r}s</span>
                    <span className="font-bold bg-slate-100 px-2 py-0.5 rounded-full text-slate-800">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total Staff Profiles: <strong className="text-slate-900">{users.length}</strong></span>
            <span className="text-emerald-600 font-semibold">RBAC Enforced</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 text-sm font-medium">
          <CheckCircle2 size={18} className="text-emerald-600" />
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-3 text-sm font-medium">
          <AlertTriangle size={18} className="text-red-600" />
          {errorMsg}
        </div>
      )}

      {/* Staff Search & Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: "42px" }}
              className="w-full pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-all bg-slate-50"
            />
          </div>


          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase">Filter Role:</span>
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white font-medium text-slate-700 outline-none"
            >
              <option value="All">All Roles</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <th className="py-4 px-6">Staff Member</th>
                <th className="py-4 px-6">Role / Level</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Access Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No staff members found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm shadow-sm">
                          {user.first_name[0]}{user.last_name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{user.first_name} {user.last_name}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        user.role === "Super Admin" || user.role === "Hospital Admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "Doctor"
                          ? "bg-blue-100 text-blue-800"
                          : user.role === "Pharmacist"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        <Shield size={12} />
                        {user.role}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-medium text-slate-700">
                      {user.department || "General Outpatient"}
                    </td>

                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-emerald-500" : "bg-red-500"}`} />
                        {user.status === "active" ? "Active Access" : "Disabled"}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(user.id, user.status)}
                          title={user.status === "active" ? "Disable Access" : "Grant Access"}
                          className={`p-2 rounded-lg transition-colors ${
                            user.status === "active" ? "text-slate-400 hover:text-amber-600 hover:bg-amber-50" : "text-emerald-600 hover:bg-emerald-50"
                          }`}
                        >
                          {user.status === "active" ? <Lock size={16} /> : <Unlock size={16} />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          title="Revoke & Remove Account"
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* GRANT STAFF ACCESS MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden">
            <div className="bg-[#0B1F3A] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <UserPlus className="text-emerald-400" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Grant Staff Workspace Access</h3>
                  <p className="text-xs text-slate-300">Add a new clinician or administrator to CareFlow</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleGrantAccess} className="p-6 space-y-4">
              {usedSeats >= maxSeats && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-medium flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />
                  <span>Warning: You have used {usedSeats}/{maxSeats} seats. Upgrade package to avoid restriction.</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">First Name</label>
                  <input
                    required type="text" placeholder="Dr. Jane"
                    value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Last Name</label>
                  <input
                    required type="text" placeholder="Doe"
                    value={lastName} onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hospital Email</label>
                <input
                  required type="email" placeholder="jane.doe@hospital.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Initial Password</label>
                <input
                  required type="password" placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Assigned Role</label>
                  <select
                    value={role} onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-emerald-500 outline-none"
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department</label>
                  <select
                    value={department} onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-emerald-500 outline-none"
                  >
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  loading={actionLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6"
                >
                  Grant Access
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
