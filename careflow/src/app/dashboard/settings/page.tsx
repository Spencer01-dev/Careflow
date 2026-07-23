"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Settings, Building, Shield, Zap, CheckCircle2, 
  Sparkles, Layers, ArrowUpRight, Globe, Lock, CreditCard, RefreshCw
} from "lucide-react";
import Button from "@/components/ui/Button";

interface SubscriptionInfo {
  hospital_name: string;
  plan: string;
  max_users: number;
  used_seats: number;
  subscription_status: string;
  unlocked_modules: string;
}

const PACKAGES = [
  {
    key: "starter",
    name: "Starter",
    price: "$299/mo",
    seats: 20,
    desc: "Designed for small specialist clinics and outpatient centers.",
    features: ["Up to 20 Active Staff Seats", "OPD & Pharmacy Modules", "Basic Billing & Receipts", "Standard Support"],
  },
  {
    key: "professional",
    name: "Professional",
    price: "$799/mo",
    seats: 200,
    popular: true,
    desc: "For mid-sized multi-specialty hospitals with full clinical operations.",
    features: ["Up to 200 Active Staff Seats", "OPD, IPD, Lab, Pharmacy & ICU", "Radiology PACS Integration", "24/7 Priority Support"],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "$1,999/mo",
    seats: 9999,
    desc: "For large teaching hospitals and multi-branch hospital networks.",
    features: ["Unlimited Staff Seats", "All Clinical & AI Modules", "Multi-Branch Workspace Isolation", "Dedicated Account Manager"],
  },
];

export default function WorkspaceSettingsPage() {
  const searchParams = useSearchParams();
  const [subInfo, setSubInfo] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [activeTab, setActiveTab] = useState<"subscription" | "general" | "security">("subscription");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "general" || tab === "security" || tab === "subscription") {
      setActiveTab(tab);
    }
    fetchSub();
  }, [searchParams]);

  const fetchSub = async () => {
    setLoading(true);
    const token = localStorage.getItem("careflow_token");
    const headers: Record<string, string> = {};
    if (token && token !== "offline") headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch("http://localhost:8000/api/subscription", { headers });
      if (res.ok) {
        const data = await res.json();
        setSubInfo(data);
      }
    } catch {
      setSubInfo({
        hospital_name: "CareFlow Primary Network",
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

  const handleUpgrade = async (planKey: string) => {
    setUpgrading(true);
    setMsg("");
    const token = localStorage.getItem("careflow_token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token && token !== "offline") headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch("http://localhost:8000/api/subscription/upgrade", {
        method: "POST",
        headers,
        body: JSON.stringify({ plan: planKey }),
      });

      if (res.ok) {
        const updated = await res.json();
        setSubInfo(updated);
        setMsg(`Subscription upgraded to ${updated.plan} plan! Extended capacity to ${updated.max_users} seats.`);
      }
    } catch {
      setMsg("Failed to upgrade subscription. Please check API connection.");
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50 w-full">

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 font-bold">
              <Settings size={22} />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Workspace & Package Settings</h1>
          </div>
          <p className="text-slate-500 text-sm">
            Manage your hospital subscription tiers, seat limits, and workspace governance policies.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
          <button 
            onClick={() => setActiveTab("subscription")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "subscription" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Subscription & Licenses
          </button>
          <button 
            onClick={() => setActiveTab("general")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "general" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Hospital Profile
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "security" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Security & RBAC
          </button>
        </div>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 text-sm font-medium">
          <CheckCircle2 size={18} className="text-emerald-600" />
          {msg}
        </div>
      )}

      {/* Subscription Tab */}
      {activeTab === "subscription" && (
        <div className="space-y-8">
          {/* Active Plan Overview */}
          <div className="bg-gradient-to-br from-[#0B1F3A] to-[#16345A] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-xs rounded-full uppercase tracking-wider mb-3">
                  <Zap size={14} /> Active Plan License
                </div>
                <h2 className="text-3xl font-bold">{subInfo?.plan || "Professional"} Package</h2>
                <p className="text-slate-300 text-sm mt-1">
                  Workspace: <strong className="text-white">{subInfo?.hospital_name || "CareFlow Primary Network"}</strong>
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 px-6 border border-white/15 text-center">
                <div className="text-3xl font-extrabold text-emerald-400">
                  {subInfo?.used_seats || 3} / {subInfo?.max_users || 200}
                </div>
                <div className="text-xs font-medium text-slate-300">Staff Seats Utilized</div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-slate-300 gap-2">
              <span>Unlocked Modules: <strong className="text-white">{subInfo?.unlocked_modules || "All Standard Modules"}</strong></span>
              <span>Billing Status: <strong className="text-emerald-400 uppercase">{subInfo?.subscription_status || "Active"}</strong></span>
            </div>

            {/* Glowing effect */}
            <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
          </div>

          {/* Package Selection Grid */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">Available Subscription Packages</h2>
              <p className="text-sm text-slate-500">Upgrade or switch packages to extend staff capacity and unlock advanced clinical features.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {PACKAGES.map((pkg) => {
                const isCurrent = subInfo?.plan?.toLowerCase() === pkg.key;
                return (
                  <div 
                    key={pkg.key}
                    className={`rounded-3xl p-6 border-2 transition-all flex flex-col justify-between relative bg-white ${
                      isCurrent ? "border-emerald-500 ring-4 ring-emerald-50 shadow-lg" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                        Recommended
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                        {isCurrent && (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            Current Plan
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-4">{pkg.desc}</p>
                      <div className="text-3xl font-extrabold text-slate-900 mb-6">{pkg.price}</div>

                      <div className="space-y-3 mb-8">
                        {pkg.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                            <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      disabled={isCurrent || upgrading}
                      onClick={() => handleUpgrade(pkg.key)}
                      className={`w-full font-bold h-12 ${
                        isCurrent 
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed border-0" 
                          : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                      }`}
                    >
                      {isCurrent ? "Active Plan" : upgrading ? "Upgrading..." : `Upgrade to ${pkg.name}`}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Hospital Profile Tab */}
      {activeTab === "general" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
            <Building className="text-emerald-600" size={24} />
            <div>
              <h2 className="text-xl font-bold text-slate-900">Hospital General Information</h2>
              <p className="text-xs text-slate-500">Official registration details for invoice headers and patient reports.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Hospital Name</label>
              <input type="text" defaultValue={subInfo?.hospital_name || "CareFlow General Hospital"} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Facility Category</label>
              <input type="text" defaultValue="Private Multi-Specialty Hospital" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Primary Official Email</label>
              <input type="email" defaultValue="admin@hospital.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Support Helpline Phone</label>
              <input type="tel" defaultValue="+254 700 000 000" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-500" />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button className="bg-emerald-600 text-white font-bold px-8">Save Profile Settings</Button>
          </div>
        </div>
      )}

      {/* Security & RBAC Tab */}
      {activeTab === "security" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
            <Shield className="text-emerald-600" size={24} />
            <div>
              <h2 className="text-xl font-bold text-slate-900">Security & RBAC Enforcement</h2>
              <p className="text-xs text-slate-500">Enterprise data protection, password policies, and session timeouts.</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { title: "Enforce Two-Factor Authentication (2FA) for Admins", desc: "Require SMS or Authenticator app OTP code upon login for Super Admins.", active: true },
              { title: "Strict Medical Record Audit Logging", desc: "Log every doctor/nurse access to patient Electronic Health Records (EHR).", active: true },
              { title: "Automatic Inactivity Logout (15 mins)", desc: "Logout staff automatically after 15 minutes of idle workstation time.", active: true },
              { title: "Seat Limit Overflow Blocking", desc: "Block staff addition automatically when plan user limit is reached.", active: true },
            ].map((sec, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{sec.title}</h4>
                  <p className="text-xs text-slate-500">{sec.desc}</p>
                </div>
                <input type="checkbox" defaultChecked={sec.active} className="w-5 h-5 text-emerald-600 rounded" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
