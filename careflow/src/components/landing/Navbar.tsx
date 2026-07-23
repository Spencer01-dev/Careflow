"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Activity, ChevronDown, Search, Menu, X, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const solutions = [
  { label: "Hospitals", href: "/solutions/hospitals" },
  { label: "Multi-Branch Hospitals", href: "/solutions/multi-branch-hospitals" },
  { label: "Specialty Clinics", href: "/solutions/specialty-clinics" },
  { label: "Teaching Hospitals", href: "/solutions/teaching-hospitals" },
  { label: "Laboratories", href: "/solutions/laboratories" },
  { label: "Pharmacies", href: "/solutions/pharmacies" },
  { label: "Healthcare Groups", href: "/solutions/healthcare-groups" },
  { label: "Insurance Partners", href: "/solutions/insurance-partners" },
];

const products = {
  Clinical: [
    { label: "EMR", href: "/products/emr" },
    { label: "Laboratory", href: "/products/laboratory" },
    { label: "Radiology", href: "/products/radiology" },
    { label: "Pharmacy", href: "/products/pharmacy" },
  ],
  Administration: [
    { label: "Billing & Finance", href: "/products/billing-finance" },
    { label: "HR & Payroll", href: "/products/hr-payroll" },
    { label: "Inventory", href: "/products/inventory" },
  ],
  Patient: [
    { label: "Patient Portal", href: "/products/patient-portal" },
    { label: "Mobile App", href: "#" },
    { label: "Telemedicine", href: "/products/telemedicine" },
  ],
  AI: [
    { label: "AI Assistant", href: "/products/ai-assistant" },
    { label: "AI Documentation", href: "/products/ai-assistant" },
    { label: "AI Analytics", href: "/products/analytics" },
  ],
};

const features = [
  { label: "Appointment Scheduling", href: "/features/appointment-scheduling" },
  { label: "Queue Management", href: "/features/queue-management" },
  { label: "Insurance Claims", href: "/features/insurance-claims" },
  { label: "Digital Prescriptions", href: "/features/digital-prescriptions" },
  { label: "Bed Management", href: "/features/bed-management" },
  { label: "Emergency Department", href: "/features/emergency-department" },
  { label: "Operating Theatre", href: "/features/operating-theatre" },
  { label: "Blood Bank", href: "/features/blood-bank" },
  { label: "Reports & Integrations", href: "/features/reports-integrations" },
];

const resources = [
  { label: "Documentation", href: "/resources/documentation" },
  { label: "Developer API", href: "/resources/developer-api" },
  { label: "Knowledge Base", href: "/resources/knowledge-base" },
  { label: "Hospital Case Studies", href: "/resources/case-studies" },
  { label: "Pricing Guide", href: "/pricing" },
  { label: "Blog", href: "/resources/blog" },
  { label: "Support Center", href: "/resources/support" },
  { label: "System Status", href: "/resources/status" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    if (searchOpen) setSearchQuery("");
  }, [searchOpen]);

  const toggle = (name: string) =>
    setActiveDropdown((prev) => (prev === name ? null : name));

  const close = () => setActiveDropdown(null);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 py-2 px-4 text-center text-xs font-medium text-white flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
        <span>🏥 Trusted by 200+ healthcare organizations worldwide.</span>
        <a href="#" className="underline hover:text-emerald-100 flex items-center gap-1 transition-colors">
          Book a live demo <ArrowRight size={12} />
        </a>
      </div>

      {/* Main Navbar */}
      <nav
        ref={navRef}
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-[#0B1F3A]/95 backdrop-blur-xl border-white/10 shadow-xl"
            : "bg-gradient-to-r from-[#0B1F3A] to-[#132B4F] border-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <Activity size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Care<span className="text-emerald-400">Flow</span>
                </span>
              </Link>
              <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/50 border border-slate-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-semibold text-slate-300">99.99% Uptime</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">

              {/* Solutions */}
              <div className="relative">
                <button onClick={() => toggle("Solutions")} className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors py-8">
                  Solutions <ChevronDown size={14} className={cn("transition-transform duration-200", activeDropdown === "Solutions" && "rotate-180")} />
                </button>
                {activeDropdown === "Solutions" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50">
                    {solutions.map((item) => (
                      <a key={item.label} href={item.href} onClick={close} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Products */}
              <div className="relative">
                <button onClick={() => toggle("Products")} className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors py-8">
                  Products <ChevronDown size={14} className={cn("transition-transform duration-200", activeDropdown === "Products" && "rotate-180")} />
                </button>
                {activeDropdown === "Products" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[600px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 z-50 flex gap-8">
                    {Object.entries(products).map(([category, items]) => (
                      <div key={category} className="flex-1">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{category}</h4>
                        <div className="space-y-1">
                          {items.map((item) => (
                            <a key={item.label} href={item.href} onClick={close} className="block px-3 py-2 -mx-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                              {item.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="relative">
                <button onClick={() => toggle("Features")} className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors py-8">
                  Features <ChevronDown size={14} className={cn("transition-transform duration-200", activeDropdown === "Features" && "rotate-180")} />
                </button>
                {activeDropdown === "Features" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[500px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50">
                    <div className="grid grid-cols-2 gap-1">
                      {features.map((item) => (
                        <a key={item.label} href={item.href} onClick={close} className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Resources */}
              <div className="relative">
                <button onClick={() => toggle("Resources")} className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors py-8">
                  Resources <ChevronDown size={14} className={cn("transition-transform duration-200", activeDropdown === "Resources" && "rotate-180")} />
                </button>
                {activeDropdown === "Resources" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50">
                    {resources.map((item) => (
                      <a key={item.label} href={item.href} onClick={close} className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
              <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</Link>
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                className="p-2 text-slate-300 hover:text-white transition-colors"
                aria-label="Search"
                onClick={() => { setSearchOpen(true); setActiveDropdown(null); }}
              >
                <Search size={18} />
              </button>
              <div className="w-px h-6 bg-slate-700 mx-1" />
              <Link href="/sales" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Contact Sales
              </Link>
              <Link href="/auth/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors ml-2">
                Sign In
              </Link>
              <Link href="/auth/register">
                <button className="ml-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 transition-all duration-200 border border-emerald-400/20">
                  Start Free Trial
                </button>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button className="lg:hidden p-2 text-slate-300 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0B1F3A] border-t border-slate-800 px-6 py-4 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase">Solutions</div>
              {solutions.slice(0, 4).map(l => <a key={l.label} href={l.href} className="block px-3 py-2 text-sm text-slate-300">{l.label}</a>)}
            </div>
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase">Products</div>
              {products.Clinical.map(l => <a key={l.label} href={l.href} className="block px-3 py-2 text-sm text-slate-300">{l.label}</a>)}
            </div>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <Link href="/sales"><Button variant="outline" size="md" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">Contact Sales</Button></Link>
              <Link href="/auth/login"><Button variant="outline" size="md" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">Sign In</Button></Link>
              <Link href="/auth/register"><Button size="md" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 shadow-lg shadow-emerald-500/20">Start Free Trial</Button></Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col" onClick={() => setSearchOpen(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0B1F3A]/80 backdrop-blur-sm" />

          {/* Search Box */}
          <div
            className="relative max-w-2xl w-full mx-auto mt-24 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                <Search size={20} className="text-slate-400 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search features, solutions, products…"
                  className="flex-1 text-base text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors px-2 py-1 rounded border border-slate-200"
                >
                  <X size={12} /> Esc
                </button>
              </div>

              {/* Quick links */}
              <div className="p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Links</p>
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { label: "Hospitals Solution", href: "/solutions/hospitals" },
                    { label: "EMR Module", href: "/products/emr" },
                    { label: "Appointment Scheduling", href: "/features/appointment-scheduling" },
                    { label: "Pricing", href: "/pricing" },
                    { label: "Billing & Finance", href: "/products/billing-finance" },
                    { label: "AI Assistant", href: "/products/ai-assistant" },
                    { label: "Patient Portal", href: "/products/patient-portal" },
                    { label: "Contact Sales", href: "/sales" },
                  ]
                    .filter((item) =>
                      !searchQuery || item.label.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <ArrowRight size={13} className="text-slate-300" />
                        {item.label}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
