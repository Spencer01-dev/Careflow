"use client";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PricingSection from "@/components/landing/PricingSection";
import { useState } from "react";
import { ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes! Every plan comes with a 30-day free trial, no credit card required. You get full access to all features in your chosen plan during the trial.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately on upgrades, or at the next billing cycle for downgrades.",
  },
  {
    q: "What happens if I exceed my patient limit?",
    a: "We'll notify you when you're approaching your limit. You can upgrade your plan at any time — we won't shut down your system without notice.",
  },
  {
    q: "Is my patient data secure?",
    a: "Yes. CareFlow is HIPAA compliant and ISO 27001 certified. All data is encrypted at rest and in transit, and we maintain 99.99% uptime with daily backups.",
  },
  {
    q: "Do you offer on-premise deployment?",
    a: "Enterprise plans can be deployed on-premise or in a private cloud. Contact our sales team to discuss your infrastructure requirements.",
  },
  {
    q: "What kind of support is included?",
    a: "Starter plans include email and chat support (business hours). Professional plans include priority support with faster response times. Enterprise includes 24/7 phone support and a dedicated Customer Success Manager.",
  },
  {
    q: "Can I get a custom quote for a government hospital?",
    a: "Yes. We offer custom pricing for government hospitals, national health systems, and NGOs. Reach out to our enterprise sales team for a tailored proposal.",
  },
  {
    q: "How long does onboarding take?",
    a: "Starter deployments typically go live within 1–2 weeks. Professional takes 2–4 weeks. Enterprise implementations are fully managed and typically complete within 4–8 weeks depending on complexity.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-slate-900 text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5 text-slate-500 leading-relaxed text-sm">{a}</div>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Plans for Every{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Healthcare Organization
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            From small clinics to large hospital networks — CareFlow has a plan
            that fits your size, budget, and complexity. All plans include a
            30-day free trial.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-slate-400">
            {["No credit card required", "Cancel anytime", "30-day free trial", "HIPAA compliant"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <PricingSection />

      {/* Comparison banner */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Not sure which plan is right?</h2>
          <p className="text-slate-500 mb-8">Talk to our team and we'll recommend the right fit for your hospital size and workflows.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sales">
              <button className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all shadow-md flex items-center gap-2">
                Talk to Sales <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="px-8 py-3.5 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-all">
                Start Free Trial
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-lg">Everything you need to know about CareFlow pricing.</p>
          </div>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
          <div className="mt-12 bg-slate-50 rounded-2xl p-8 text-center border border-slate-100">
            <p className="text-slate-700 font-semibold mb-2">Still have questions?</p>
            <p className="text-slate-500 text-sm mb-6">Our team is happy to answer any questions about pricing, features, or implementation.</p>
            <Link href="/sales">
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
