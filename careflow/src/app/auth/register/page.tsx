"use client";
import { useState } from "react";
import { Activity, ArrowRight, Building, CheckCircle2, Check } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const DEPARTMENTS = [
  "Outpatient (OPD)", "Inpatient (IPD)", "Laboratory", "Pharmacy",
  "Radiology", "Theatre / Surgery", "ICU", "Billing & Finance",
];

const PLANS = [
  { name: "Starter", price: "$299/mo", desc: "For small clinics. Up to 20 staff.", popular: false },
  { name: "Professional", price: "$799/mo", desc: "For mid-sized hospitals. Up to 200 staff.", popular: true },
  { name: "Enterprise", price: "$1999/mo", desc: "Unlimited users, multi-branch.", popular: false },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1 — Hospital info
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalType, setHospitalType] = useState("Private Hospital");

  // Step 2 — Admin details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 3 — Configuration
  const [userCapacity, setUserCapacity] = useState("1 - 50");
  const [branches, setBranches] = useState("1 (Single Location)");
  const [selectedDepts, setSelectedDepts] = useState<string[]>(DEPARTMENTS);

  // Step 4 — Subscription
  const [selectedPlan, setSelectedPlan] = useState("Professional");

  const toggleDept = (dept: string) => {
    setSelectedDepts((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleNext = () => {
    setError("");
    setStep((s) => Math.min(5, s + 1));
  };
  
  const handleBack = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) { handleNext(); return; }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify and try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Send registration payload to backend FastAPI
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const regRes = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          first_name: firstName || "Admin",
          last_name: lastName || "User",
          role: "Super Admin",
        }),
      });

      const regData = await regRes.json();

      if (!regRes.ok) {
        setError(regData.detail || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // 2. Automatically log in to get OAuth access token
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const loginRes = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      const loginData = await loginRes.json();

      if (loginRes.ok) {
        localStorage.setItem("careflow_token", loginData.access_token);
        localStorage.setItem("careflow_user_name", loginData.user_name);
        localStorage.setItem("careflow_user_role", loginData.role);
        localStorage.setItem("careflow_user_email", email);
        router.push("/dashboard");
      } else {
        router.push("/auth/login");
      }
    } catch {
      // Server unreachable fallback
      const full_name = `${firstName} ${lastName}`.trim() || "Super Admin";
      localStorage.setItem("careflow_user_name", full_name);
      localStorage.setItem("careflow_user_email", email);
      localStorage.setItem("careflow_token", "offline");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <Activity size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">Care<span className="text-emerald-600">Flow</span> Setup</span>
        </div>
        <Link href="/auth/login" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
          Already have an account? Sign In
        </Link>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-slate-100 shadow-sm py-4 px-6 hidden md:block">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10 rounded-full" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 -z-10 rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />
          {["Hospital Info", "Admin Details", "Configuration", "Subscription", "Review"].map((label, i) => (
            <div key={label} className="flex flex-col items-center gap-2 bg-white px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step > i + 1 ? "bg-emerald-500 text-white" : step === i + 1 ? "bg-emerald-600 text-white ring-4 ring-emerald-100" : "bg-slate-100 text-slate-400"
              }`}>
                {step > i + 1 ? <Check size={16} /> : i + 1}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= i + 1 ? "text-slate-900" : "text-slate-400"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center p-6 py-12">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="p-8 md:p-12 flex-1">

              {/* Step 1 — Hospital Info */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Hospital Information</h2>
                  <p className="text-sm text-slate-500 mb-8">Let&apos;s start by setting up your primary hospital workspace.</p>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Hospital Name</label>
                        <input
                          required type="text" placeholder="e.g. CareFlow General"
                          value={hospitalName} onChange={(e) => setHospitalName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Hospital Type</label>
                        <select
                          value={hospitalType} onChange={(e) => setHospitalType(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white outline-none"
                        >
                          <option>Private Hospital</option>
                          <option>Specialist Clinic</option>
                          <option>Teaching Hospital</option>
                          <option>Government Hospital</option>
                          <option>Multi-Branch Network</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Official Email</label>
                        <input required type="email" placeholder="admin@hospital.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Phone Number</label>
                        <input required type="tel" placeholder="+1234567890" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Country &amp; City</label>
                      <input required type="text" placeholder="e.g. Nairobi, Kenya" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 — Admin Details */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Administrator Profile</h2>
                  <p className="text-sm text-slate-500 mb-8">This account will have Super Admin access to the workspace.</p>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">First Name</label>
                        <input
                          required type="text" placeholder="First Name"
                          value={firstName} onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Last Name</label>
                        <input
                          required type="text" placeholder="Last Name"
                          value={lastName} onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Personal Email</label>
                      <input required type="email" placeholder="admin@hospital.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Password</label>
                        <input required type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Confirm Password</label>
                        <input required type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 — Configuration */}
              {step === 3 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Workspace Configuration</h2>
                  <p className="text-sm text-slate-500 mb-8">Tell us about your operational capacity.</p>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Expected Active Users</label>
                        <select
                          value={userCapacity} onChange={(e) => setUserCapacity(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 bg-white outline-none"
                        >
                          <option>1 - 50</option>
                          <option>51 - 200</option>
                          <option>201 - 500</option>
                          <option>500+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Number of Branches</label>
                        <select
                          value={branches} onChange={(e) => setBranches(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 bg-white outline-none"
                        >
                          <option>1 (Single Location)</option>
                          <option>2 - 5 Branches</option>
                          <option>6+ Branches</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-3 uppercase">
                        Core Departments Required ({selectedDepts.length} selected)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {DEPARTMENTS.map((dept) => (
                          <label key={dept} className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedDepts.includes(dept) ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:bg-slate-50"
                          }`}>
                            <input
                              type="checkbox"
                              checked={selectedDepts.includes(dept)}
                              onChange={() => toggleDept(dept)}
                              className="w-4 h-4 text-emerald-600 rounded border-slate-300"
                            />
                            <span className="text-sm font-medium text-slate-700">{dept}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 — Subscription */}
              {step === 4 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Select a Subscription</h2>
                  <p className="text-sm text-slate-500 mb-8">Start with a 30-day free trial on any plan. No credit card required.</p>
                  <div className="space-y-4">
                    {PLANS.map((plan) => (
                      <label
                        key={plan.name}
                        className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedPlan === plan.name
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio" name="plan"
                            checked={selectedPlan === plan.name}
                            onChange={() => setSelectedPlan(plan.name)}
                            className="w-5 h-5 text-emerald-600"
                          />
                          <div>
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                              {plan.name}
                              {plan.popular && <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</span>}
                            </h3>
                            <p className="text-xs text-slate-500">{plan.desc}</p>
                          </div>
                        </div>
                        <div className="font-bold text-slate-900">{plan.price}</div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5 — Review */}
              {step === 5 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Review &amp; Create</h2>
                  <p className="text-sm text-slate-500 mb-8">Please review your setup before initializing the workspace.</p>

                  {error && (
                    <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      <span className="text-red-500 font-bold text-lg leading-none mt-0.5">!</span>
                      <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                  )}

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-6">
                    <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg">
                        <Building size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{hospitalName || "Hospital Workspace"}</h3>
                        <p className="text-xs text-slate-500">{hospitalType}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-5 text-sm">
                      <div>
                        <span className="text-slate-400 block text-xs uppercase font-semibold mb-1">Plan</span>
                        <span className="font-semibold text-slate-900">{selectedPlan} (30-day Trial)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-xs uppercase font-semibold mb-1">Admin</span>
                        <span className="font-semibold text-slate-900">
                          {firstName || lastName ? `${firstName} ${lastName}`.trim() : "Administrator"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-xs uppercase font-semibold mb-1">Email</span>
                        <span className="font-semibold text-slate-900">{email || "Not specified"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-xs uppercase font-semibold mb-1">Capacity</span>
                        <span className="font-semibold text-slate-900">{userCapacity} Users</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-xs uppercase font-semibold mb-1">Branches</span>
                        <span className="font-semibold text-slate-900">{branches}</span>
                      </div>
                    </div>

                    {selectedDepts.length > 0 && (
                      <div>
                        <span className="text-slate-400 block text-xs uppercase font-semibold mb-2">Selected Departments</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedDepts.map((d) => (
                            <span key={d} className="text-xs px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">{d}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex gap-3">
                      <CheckCircle2 className="text-emerald-600 flex-shrink-0" size={20} />
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        By clicking &quot;Create Workspace&quot;, CareFlow will automatically generate your hospital tenant, database schema, and default admin roles.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="bg-slate-50 border-t border-slate-200 px-8 md:px-12 py-5 flex items-center justify-between gap-4 flex-shrink-0">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  disabled={loading}
                  className="min-w-[110px]"
                >
                  Back
                </Button>
              ) : (
                <div className="min-w-[110px]" />
              )}
              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 shadow-md font-bold min-w-[160px]"
                icon={step < 5 ? <ArrowRight size={16} /> : <CheckCircle2 size={16} />}
                iconPosition="right"
              >
                {step < 5 ? "Next Step" : loading ? "Initializing..." : "Create Workspace"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
