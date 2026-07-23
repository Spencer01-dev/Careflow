import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Building2, CheckCircle2, ArrowRight, Star, Users, Shield, Zap } from "lucide-react";

const solutionsData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  stats: { label: string; value: string }[];
  features: { title: string; desc: string }[];
  benefits: string[];
}> = {
  hospitals: {
    title: "Hospitals",
    subtitle: "Complete Hospital Operating System",
    description: "CareFlow gives private and public hospitals a fully integrated platform to manage every department — from emergency intake to discharge billing — in a single, secure workspace.",
    icon: "🏥",
    color: "from-emerald-500 to-teal-500",
    stats: [
      { label: "Hospitals Running CareFlow", value: "200+" },
      { label: "Patient Records Managed", value: "5M+" },
      { label: "Average Efficiency Gain", value: "42%" },
      { label: "Uptime Guarantee", value: "99.99%" },
    ],
    features: [
      { title: "Unified Patient Journey", desc: "Track every patient from registration through discharge with real-time updates across all departments." },
      { title: "Bed & Ward Management", desc: "Monitor bed availability, patient flow, and ward capacity in real time across all floors." },
      { title: "Department Integration", desc: "Seamlessly connect OPD, IPD, ICU, Emergency, Theatre, Lab, Radiology, and Pharmacy." },
      { title: "Clinical Decision Support", desc: "AI-powered alerts, drug interaction warnings, and evidence-based care guidelines." },
      { title: "Revenue Cycle Management", desc: "Automate billing, insurance claims, co-pays, and financial reporting." },
      { title: "Staff Scheduling", desc: "Manage doctor and nurse rosters, on-call schedules, and overtime tracking." },
    ],
    benefits: [
      "Reduce patient wait times by up to 60%",
      "Eliminate paper-based records completely",
      "HIPAA & ISO 27001 compliant from day one",
      "Go-live in as little as 4 weeks",
      "24/7 dedicated enterprise support",
      "Multi-branch management from one dashboard",
    ],
  },
  "multi-branch-hospitals": {
    title: "Multi-Branch Hospitals",
    subtitle: "One Platform. Every Location.",
    description: "Manage all your hospital branches, clinics, and care sites from a single enterprise dashboard. Share resources, unify patient records, and maintain brand consistency across your entire network.",
    icon: "🌐",
    color: "from-blue-500 to-indigo-500",
    stats: [
      { label: "Branches Managed", value: "1,200+" },
      { label: "Cross-Branch Transfers", value: "98% seamless" },
      { label: "Data Consolidation Time", value: "Real-time" },
      { label: "Cost Reduction", value: "35%" },
    ],
    features: [
      { title: "Centralized Patient Records", desc: "A patient registered at any branch is instantly accessible at every other branch." },
      { title: "Network-Wide Analytics", desc: "Compare performance, revenue, and patient outcomes across all your branches." },
      { title: "Inter-Branch Referrals", desc: "Seamlessly transfer patients, records, and prescriptions between branches with one click." },
      { title: "Unified Procurement", desc: "Manage inventory and procurement centrally, reducing waste and costs network-wide." },
      { title: "Brand Management", desc: "Each branch can have its own branding while operating on the same secure backend." },
      { title: "Role-Based Access", desc: "Corporate admins, branch managers, and clinical staff each see exactly what they need." },
    ],
    benefits: [
      "Single source of truth for all patient data",
      "Consolidated financial reporting across branches",
      "Shared specialist resource scheduling",
      "Standardized clinical protocols network-wide",
      "Real-time executive dashboards",
      "Scalable to 100+ branch deployments",
    ],
  },
  "specialty-clinics": {
    title: "Specialty Clinics",
    subtitle: "Built for Specialized Care",
    description: "Whether you run a cardiology center, orthopedic clinic, fertility clinic, or dermatology practice, CareFlow adapts to your specialty workflows without compromise.",
    icon: "🩺",
    color: "from-violet-500 to-purple-500",
    stats: [
      { label: "Specialty Modules", value: "24+" },
      { label: "Clinics Deployed", value: "800+" },
      { label: "Setup Time", value: "Under 2 weeks" },
      { label: "Patient Satisfaction", value: "+38%" },
    ],
    features: [
      { title: "Specialty-Specific Templates", desc: "Pre-built consultation forms and workflows for Cardiology, Orthopedics, OB/GYN, Dermatology, and 20 more specialties." },
      { title: "Procedure & Surgery Scheduling", desc: "Complex multi-resource scheduling for procedures with equipment, staff, and room booking." },
      { title: "Chronic Disease Management", desc: "Track long-term patient journeys with automatic follow-up scheduling and outcome monitoring." },
      { title: "Patient Portal", desc: "Patients can book appointments, view results, and message their specialist directly." },
      { title: "Insurance & Prior Auth", desc: "Automate insurance verification and prior authorization workflows for specialty procedures." },
      { title: "Outcome Tracking", desc: "Measure and report clinical outcomes for quality improvement and accreditation." },
    ],
    benefits: [
      "Eliminate missed follow-up appointments",
      "Reduce no-shows with automated reminders",
      "Track specialty KPIs out of the box",
      "HIPAA compliant telemedicine included",
      "Integrated lab and imaging ordering",
      "Custom branded patient communication",
    ],
  },
  "teaching-hospitals": {
    title: "Teaching Hospitals",
    subtitle: "Clinical Education Meets Modern Healthcare",
    description: "CareFlow's Teaching Hospital module bridges patient care and medical education — managing students, supervisors, rotations, assessments, and full accreditation reporting.",
    icon: "🎓",
    color: "from-amber-500 to-orange-500",
    stats: [
      { label: "Medical Students Managed", value: "50,000+" },
      { label: "Teaching Programs Supported", value: "300+" },
      { label: "Accreditation Reports", value: "Automated" },
      { label: "Faculty Satisfaction", value: "96%" },
    ],
    features: [
      { title: "Rotation Management", desc: "Schedule and track medical student and resident rotations across all departments and supervisors." },
      { title: "Clinical Logbooks", desc: "Digital logbooks for students to record cases, procedures, and supervised activities." },
      { title: "Supervisor Dashboards", desc: "Attending physicians can review and sign off on student assessments in real time." },
      { title: "Accreditation Reporting", desc: "Automatically generate reports required for ACGME, JCI, and other accreditation bodies." },
      { title: "Dual Role Access", desc: "Staff can seamlessly switch between clinical roles and teaching roles within one platform." },
      { title: "Research Module", desc: "Link patient data to IRB-approved research projects with proper anonymization." },
    ],
    benefits: [
      "Streamline accreditation compliance",
      "Digital milestone tracking for residents",
      "Reduce administrative burden on faculty",
      "Improve student competency assessment",
      "Integrated with patient care workflows",
      "Research-ready data architecture",
    ],
  },
  laboratories: {
    title: "Laboratories",
    subtitle: "Precision Lab Management at Scale",
    description: "From sample collection to result reporting, CareFlow's LIS module automates your entire laboratory workflow — reducing turnaround times and eliminating manual errors.",
    icon: "🧪",
    color: "from-cyan-500 to-teal-500",
    stats: [
      { label: "Tests Processed Daily", value: "1M+" },
      { label: "TAT Reduction", value: "55%" },
      { label: "Error Rate", value: "<0.01%" },
      { label: "Analyzer Integrations", value: "200+" },
    ],
    features: [
      { title: "Sample Tracking", desc: "Barcode-based sample tracking from collection point to result, with full chain of custody." },
      { title: "Analyzer Integration", desc: "Direct bi-directional integration with 200+ lab analyzers from Roche, Siemens, Abbott, and more." },
      { title: "Auto-Validation", desc: "Rule-based result auto-validation flags critical values and sends instant clinician alerts." },
      { title: "Quality Control", desc: "Built-in Westgard rules, Levy-Jennings charts, and inter-lab QC comparison." },
      { title: "Result Delivery", desc: "Deliver results via EMR, patient portal, email, SMS, or printed report automatically." },
      { title: "Inventory Management", desc: "Track reagents, consumables, and equipment with auto-reorder capabilities." },
    ],
    benefits: [
      "Reduce manual data entry by 95%",
      "Critical value auto-notification",
      "CLIA and CAP compliance built in",
      "Multi-site lab network management",
      "Reference lab integration support",
      "Real-time dashboard for lab managers",
    ],
  },
  pharmacies: {
    title: "Pharmacies",
    subtitle: "Smart Pharmacy Management",
    description: "CareFlow's pharmacy module connects dispensing, inventory, billing, and clinical care — reducing medication errors and improving patient safety.",
    icon: "💊",
    color: "from-green-500 to-emerald-500",
    stats: [
      { label: "Prescriptions Processed", value: "10M+" },
      { label: "Medication Errors Prevented", value: "99.8%" },
      { label: "Stock-Out Reduction", value: "70%" },
      { label: "Pharmacies Deployed", value: "600+" },
    ],
    features: [
      { title: "e-Prescription Integration", desc: "Receive digital prescriptions directly from physician EMR — no transcription errors." },
      { title: "Drug Interaction Checking", desc: "Real-time alerts for drug-drug, drug-allergy, and drug-disease interactions at dispensing." },
      { title: "Inventory Management", desc: "FIFO stock management, expiry tracking, controlled substance logs, and auto-reorder." },
      { title: "Insurance Adjudication", desc: "Real-time insurance eligibility and claim submission at the point of dispensing." },
      { title: "Compounding Support", desc: "Full workflow support for extemporaneous compounding with formula management." },
      { title: "Patient Counselling Records", desc: "Document patient education and counselling at dispensing for medication adherence." },
    ],
    benefits: [
      "Zero-error prescription processing",
      "Automated drug-drug interaction alerts",
      "Expiry and recall management",
      "Controlled substance audit trail",
      "Multi-pharmacy network management",
      "Seamless billing integration",
    ],
  },
  "healthcare-groups": {
    title: "Healthcare Groups",
    subtitle: "Enterprise-Wide Healthcare Management",
    description: "For large healthcare conglomerates and investment groups managing multiple hospitals, CareFlow provides a unified executive command center with granular network-wide visibility.",
    icon: "🏢",
    color: "from-slate-500 to-slate-700",
    stats: [
      { label: "Hospitals per Group", value: "Up to 500" },
      { label: "Group Revenue Tracked", value: "$10B+" },
      { label: "Consolidation Time", value: "Real-time" },
      { label: "ROI (avg)", value: "340%" },
    ],
    features: [
      { title: "Executive Command Center", desc: "A single dashboard showing KPIs, revenue, occupancy, and quality metrics across your entire group." },
      { title: "Consolidated Financials", desc: "Real-time P&L, revenue, and cash flow reporting aggregated across all member hospitals." },
      { title: "Benchmarking", desc: "Compare performance across facilities and identify best practices to replicate group-wide." },
      { title: "Centralized Procurement", desc: "Group-level purchasing contracts, vendor management, and supply chain optimization." },
      { title: "Corporate Governance", desc: "Audit trails, compliance reports, and board-level dashboards for governance and risk." },
      { title: "M&A Onboarding", desc: "Rapid onboarding wizard to integrate newly acquired hospitals into your CareFlow network." },
    ],
    benefits: [
      "Real-time network financial visibility",
      "Standardize clinical quality group-wide",
      "Reduce procurement costs by 25%",
      "Accelerate M&A integration timelines",
      "Single vendor relationship for all hospitals",
      "Dedicated enterprise success manager",
    ],
  },
  "insurance-partners": {
    title: "Insurance Partners",
    subtitle: "Streamlined Healthcare Insurance Integration",
    description: "CareFlow connects hospitals and insurers with real-time eligibility checks, pre-authorization, claims submission, and adjudication — cutting claim processing time from weeks to hours.",
    icon: "🛡️",
    color: "from-rose-500 to-pink-500",
    stats: [
      { label: "Insurers Connected", value: "150+" },
      { label: "Claims Processed", value: "2M+/month" },
      { label: "Denial Rate Reduction", value: "65%" },
      { label: "Payment Cycle", value: "3 days avg" },
    ],
    features: [
      { title: "Real-Time Eligibility", desc: "Instant insurance eligibility verification at point of registration — no phone calls needed." },
      { title: "Prior Authorization", desc: "Electronic pre-authorization submission and tracking with insurer response in minutes." },
      { title: "Claims Scrubbing", desc: "AI-powered claims scrubbing catches errors before submission to reduce denials." },
      { title: "EOB Management", desc: "Automated EOB posting and reconciliation against expected reimbursements." },
      { title: "Denial Management", desc: "Track, appeal, and resolve denied claims with a structured workflow and audit trail." },
      { title: "Insurer Portal", desc: "Give insurance companies a dedicated portal to review pre-auth requests and manage claims." },
    ],
    benefits: [
      "Cut claims processing time by 80%",
      "Reduce denials with pre-submission scrubbing",
      "Real-time reimbursement tracking",
      "Automated patient co-pay collection",
      "HIPAA EDI 837/835 compliant",
      "Dedicated insurer API integration team",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(solutionsData).map((slug) => ({ slug }));
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = solutionsData[resolvedParams.slug];
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">{data.icon}</div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold mb-6">
            <Building2 size={14} /> CareFlow Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {data.title}
          </h1>
          <p className="text-xl text-emerald-300 font-semibold mb-4">{data.subtitle}</p>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-10">{data.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all">
                Start Free Trial
              </button>
            </Link>
            <Link href="/sales">
              <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                Talk to Sales <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything You Need</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Powerful tools purpose-built for {data.title.toLowerCase()}.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-5">
                  <Zap size={18} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why CareFlow for {data.title}?</h2>
              <p className="text-slate-500 mb-8 text-lg leading-relaxed">Join hundreds of healthcare organizations that have transformed their operations with CareFlow.</p>
              <div className="space-y-4">
                {data.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0B1F3A] to-[#132B4F] rounded-3xl p-10 text-white">
              <Star size={32} className="text-emerald-400 mb-6" />
              <blockquote className="text-lg italic text-slate-300 mb-6 leading-relaxed">
                "CareFlow transformed our hospital operations. We reduced our billing cycle by 70% and our patient satisfaction scores are at an all-time high."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center font-bold text-lg">DR</div>
                <div>
                  <div className="font-bold">Dr. Amara Diallo</div>
                  <div className="text-slate-400 text-sm">CEO, West Africa Health Network</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-500">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-emerald-100 mb-10 text-lg">Join 200+ healthcare organizations already running on CareFlow.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <button className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-all">
                Start Your Free Trial
              </button>
            </Link>
            <Link href="/sales">
              <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                <Users size={16} /> Schedule a Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
