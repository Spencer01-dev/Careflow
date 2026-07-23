"use client";
import { Activity, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
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
              <a href="mailto:bluewhaletechnologies1@gmail.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <Mail size={14} />
                bluewhaletechnologies1@gmail.com
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
          <div className="flex items-center gap-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/254706656544"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#25D366] transition-all group"
              title="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            {/* Email */}
            <a
              href="mailto:bluewhaletechnologies1@gmail.com"
              className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-700 transition-all"
              title="Send us an email"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
