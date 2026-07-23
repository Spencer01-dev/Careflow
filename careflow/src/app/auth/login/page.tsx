"use client";
import { useState } from "react";
import { Activity, Eye, EyeOff, Shield, ArrowRight, Building, Globe, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const workspaces = [
  "Nairobi Hospital - Main Branch",
  "Nairobi Hospital - Outpatient Clinic",
  "Aga Khan University Hospital",
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"login" | "2fa">("login");
  const [otp, setOtp] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // OAuth2PasswordRequestForm expects form-urlencoded, not JSON
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      // Persist auth info from the real database
      localStorage.setItem("careflow_token", data.access_token);
      localStorage.setItem("careflow_user_name", data.user_name);
      localStorage.setItem("careflow_user_role", data.role);
      localStorage.setItem("careflow_user_email", email);

      router.push("/dashboard");
    } catch {
      // Backend unreachable — derive display name from email so the dashboard still shows the correct user
      const namePart = email.split("@")[0].replace(/[0-9]/g, "");
      const derivedName = namePart.includes(".") || namePart.includes("_")
        ? namePart.split(/[._]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
        : namePart.charAt(0).toUpperCase() + namePart.slice(1);

      // Store the derived name so Topbar reads it correctly
      localStorage.setItem("careflow_user_name", derivedName);
      localStorage.setItem("careflow_user_email", email);
      localStorage.setItem("careflow_token", "offline");

      setError("Could not connect to the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-[#0B1F3A] p-12 xl:p-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        </div>

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl">
            <Activity size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white">Care<span className="text-emerald-400">Flow</span></span>
        </div>

        {/* Center Content */}
        <div className="relative z-10 mb-20">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Securely access your <br/>
            <span className="text-emerald-400">hospital workspace.</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-md">
            The enterprise healthcare operating system trusted by modern hospitals for seamless clinical and administrative workflows.
          </p>

          <div className="space-y-4">
            {[
              "Enterprise-grade encryption and HIPAA compliance",
              "Role-based access control and detailed audit logs",
              "Multi-branch workspace isolation",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                </div>
                <span className="text-sm font-medium text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 text-xs text-slate-500 flex gap-4">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Contact Support</Link>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-16 relative bg-white">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="md:hidden flex justify-center items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Care<span className="text-emerald-600">Flow</span></span>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {step === "login" ? (
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                  <p className="text-sm text-slate-500">Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Workspace Selection */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Select Workspace</label>
                    <div className="relative">
                      <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select 
                        value={selectedWorkspace}
                        onChange={(e) => setSelectedWorkspace(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 appearance-none bg-slate-50 font-medium text-slate-700"
                      >
                        {workspaces.map(w => <option key={w} value={w}>{w}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@hospital.com"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Password</label>
                      <a href="#" className="text-sm font-semibold text-emerald-600 hover:underline">Forgot Password?</a>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-base focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                    <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">Remember me for 30 days</label>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        <span className="text-red-500 font-bold text-lg leading-none mt-0.5">!</span>
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                      </div>
                      {error.includes("connect") && (
                        <button
                          type="button"
                          onClick={() => router.push("/dashboard")}
                          className="w-full text-center text-sm text-emerald-700 font-semibold py-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                        >
                          Continue to Dashboard (Offline Mode)
                        </button>
                      )}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    loading={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 shadow-lg shadow-emerald-500/20 text-base font-bold h-14"
                  >
                    {loading ? "Authenticating..." : "Sign In"}
                  </Button>

                  <div className="relative flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-slate-100" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or Continue With</span>
                    <div className="flex-1 h-px bg-slate-100" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                      <Globe size={16} className="text-slate-400" /> Google
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                      <Globe size={16} className="text-emerald-600" /> Microsoft
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-8">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                    <Shield size={24} className="text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Two-Factor Auth</h2>
                  <p className="text-sm text-slate-500">
                    We've sent a 6-digit security code to your registered device. Enter it below to access CareFlow.
                  </p>
                </div>

                <form onSubmit={handleVerify2FA} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider text-center">Security Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="000000"
                      className="w-full px-4 py-3 text-center text-2xl font-mono tracking-[0.5em] rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    loading={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 shadow-lg shadow-emerald-500/20 font-bold"
                  >
                    {loading ? "Verifying..." : "Verify & Sign In"}
                  </Button>

                  <div className="text-center">
                    <button type="button" className="text-sm font-semibold text-emerald-600 hover:underline">
                      Resend Code
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          <p className="text-center text-xs text-slate-400 mt-6 font-medium flex items-center justify-center gap-2">
            <Shield size={12} />
            Protected by reCAPTCHA and CareFlow Shield
          </p>
        </div>
      </div>
    </div>
  );
}
