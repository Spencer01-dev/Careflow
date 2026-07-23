"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play, Shield, Zap, Users, BarChart3, Activity, Heart, Stethoscope, Brain, Globe } from "lucide-react";
import Button from "@/components/ui/Button";

const stats = [
  { value: "500+", label: "Hospitals Served", icon: Globe },
  { value: "50K+", label: "Active Users", icon: Users },
  { value: "2M+", label: "Patient Records", icon: Heart },
  { value: "99.9%", label: "Uptime SLA", icon: Shield },
];

const floatingCards = [
  {
    title: "Patient Admitted",
    subtitle: "ICU Ward 3 · Room 12",
    icon: Heart,
    color: "text-red-500",
    bg: "bg-red-50",
    time: "Just now",
    value: "+1",
    valueColor: "text-green-600",
  },
  {
    title: "Lab Results Ready",
    subtitle: "Blood Panel · John Doe",
    icon: Activity,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    time: "2m ago",
    value: "Normal",
    valueColor: "text-green-600",
  },
  {
    title: "Revenue Today",
    subtitle: "Billing & Insurance",
    icon: BarChart3,
    color: "text-green-500",
    bg: "bg-green-50",
    time: "Live",
    value: "$48,230",
    valueColor: "text-green-600",
  },
  {
    title: "AI Diagnosis",
    subtitle: "Chest X-Ray Analysis",
    icon: Brain,
    color: "text-purple-500",
    bg: "bg-purple-50",
    time: "1m ago",
    value: "94% Match",
    valueColor: "text-emerald-600",
  },
];

export default function HeroSection() {
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".hero-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-500/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-900/10 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            {/* Badge */}
            <div className="hero-animate opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-emerald-300">Trusted by 500+ hospitals worldwide</span>
            </div>

            {/* Headline */}
            <h1 className="hero-animate opacity-0 text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6" style={{ animationDelay: "0.1s" }}>
              The Complete
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Healthcare OS
              </span>
              <br />
              for Modern Hospitals.
            </h1>

            {/* Sub */}
            <p className="hero-animate opacity-0 text-lg text-slate-400 leading-relaxed mb-10 max-w-xl" style={{ animationDelay: "0.2s" }}>
              Manage patients, doctors, laboratories, pharmacies, HR, finance, AI, inventory, billing, and analytics from one secure cloud platform.
            </p>

            {/* CTA Buttons */}
            <div className="hero-animate opacity-0 flex flex-wrap gap-4 mb-12" style={{ animationDelay: "0.3s" }}>
              <Link href="/auth/login">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 border-0 shadow-xl shadow-emerald-600/30 transition-all duration-300 group">
                  Start Free Trial
                  <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <button className="flex items-center gap-3 px-6 py-3 text-base font-semibold text-white rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-200 group">
                  <span className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Play size={14} className="text-white ml-0.5" />
                  </span>
                  Watch Demo
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-animate opacity-0 grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ animationDelay: "0.4s" }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white stat-value">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Animated Dashboard Preview */}
          <div className="hero-animate opacity-0 relative" style={{ animationDelay: "0.5s" }} ref={dashboardRef}>
            {/* Main dashboard mockup */}
            <div className="relative rounded-2xl bg-slate-800/60 border border-white/10 backdrop-blur-xl p-4 shadow-2xl">
              {/* Top bar */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center text-xs text-slate-500 font-mono">
                  careflow.hospital.com/dashboard
                </div>
              </div>

              {/* Dashboard grid */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                {[
                  { label: "Patients Today", value: "247", change: "+12%", color: "blue" },
                  { label: "Bed Occupancy", value: "84%", change: "+3%", color: "teal" },
                  { label: "Revenue", value: "$48.2K", change: "+8%", color: "green" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-slate-500 mb-1">{item.label}</div>
                    <div className="text-lg font-bold text-white">{item.value}</div>
                    <div className="text-xs text-green-400">{item.change}</div>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="bg-white/5 rounded-xl p-3 border border-white/5 mb-3">
                <div className="text-xs text-slate-500 mb-2">Patient Flow — Last 7 Days</div>
                <div className="flex items-end gap-1.5 h-16">
                  {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-sm opacity-80"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* Patient list snippet */}
              <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                <div className="px-3 py-2 border-b border-white/5">
                  <span className="text-xs font-medium text-slate-400">Recent Patients</span>
                </div>
                {[
                  { name: "Sarah M.", dept: "Cardiology", status: "Stable", color: "text-green-400" },
                  { name: "James K.", dept: "Emergency", status: "Critical", color: "text-red-400" },
                  { name: "Grace A.", dept: "Maternity", status: "Admitted", color: "text-emerald-400" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-1.5 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-[9px] text-white font-bold">
                        {p.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">{p.name}</div>
                        <div className="text-[10px] text-slate-500">{p.dept}</div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold ${p.color}`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating notification cards */}
            {floatingCards.map((card, i) => {
              const positions = [
                "-top-6 -left-8",
                "-top-4 -right-8",
                "-bottom-6 -left-8",
                "-bottom-4 -right-8",
              ];
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className={`absolute ${positions[i]} bg-white rounded-xl shadow-2xl p-3 flex items-center gap-2.5 w-48 animate-float border border-slate-100`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} className={card.color} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-800 truncate">{card.title}</div>
                    <div className="text-[10px] text-slate-500 truncate">{card.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-xs">Scroll to explore</span>
        <div className="w-5 h-8 border-2 border-slate-600 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 rounded-full bg-slate-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
