"use client";
import { Activity, Globe, MessageSquare, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
    { label: "API Docs", href: "#" },
  ],
  Solutions: [
    { label: "Teaching Hospitals", href: "#" },
    { label: "Specialist Hospitals", href: "#" },
    { label: "Multi-Branch Networks", href: "#" },
    { label: "Private Clinics", href: "#" },
    { label: "Government Hospitals", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "HIPAA Compliance", href: "#" },
    { label: "Security", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Ready to transform your hospital?</h3>
            <p className="text-emerald-100 text-sm">Join 500+ hospitals already running on CareFlow. Start your 30-day free trial today.</p>
          </div>
          <Link
            href="/auth/login"
            className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg flex-shrink-0 group"
          >
            Start Free Trial
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Footer main */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Activity size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">Care<span className="text-emerald-400">Flow</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              The complete Healthcare Operating System for modern hospitals — from single-site clinics to multi-branch health networks.
            </p>
            <div className="space-y-2">
              <a href="mailto:oscarmunene900@gmail.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <Mail size={14} />
                oscarmunene900@gmail.com
              </a>
              <a href="tel:+254706656544" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <Phone size={14} />
                +254 706 656 544
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={14} />
                60400 Meru
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2025 CareFlow Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Globe, MessageSquare].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
