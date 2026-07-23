import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CheckCircle2, ArrowRight, Users, Zap, Star, BarChart3 } from "lucide-react";

const productsData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  category: string;
  stats: { label: string; value: string }[];
  features: { title: string; desc: string }[];
  benefits: string[];
}> = {
  emr: {
    title: "Electronic Medical Records (EMR)",
    subtitle: "The Heart of CareFlow",
    description: "Replace paper charts and fragmented systems with a unified, intelligent electronic medical record that puts the right information in front of clinicians at the right time.",
    icon: "📋", category: "Clinical",
    stats: [{ label: "Records Managed", value: "5M+" }, { label: "Data Entry Reduction", value: "80%" }, { label: "Clinical Alerts", value: "Real-time" }, { label: "Uptime", value: "99.99%" }],
    features: [
      { title: "Structured Clinical Notes", desc: "SOAP notes, clinical templates, and voice-to-text documentation for every specialty." },
      { title: "Problem & Medication Lists", desc: "Active problem lists, medication reconciliation, and allergy management in one view." },
      { title: "Order Management", desc: "CPOE for labs, imaging, medications, referrals, and procedures with clinical decision support." },
      { title: "Longitudinal Patient Timeline", desc: "A complete chronological view of every patient interaction, visit, and result." },
      { title: "Care Plans & Protocols", desc: "Evidence-based care plans and disease-specific protocols embedded in clinical workflows." },
      { title: "Multi-Provider Collaboration", desc: "Real-time chart access across all departments — surgeons, nurses, pharmacists, all synchronized." },
    ],
    benefits: ["Reduce documentation time by 50%", "Eliminate illegible handwriting errors", "Instant access to complete patient history", "Smart clinical decision support alerts", "Seamless lab and imaging integration", "HIPAA compliant and audit-ready"],
  },
  laboratory: {
    title: "Laboratory Information System",
    subtitle: "From Sample to Result in Record Time",
    description: "A complete Lab Information System (LIS) that automates sample tracking, analyzer integration, result validation, and reporting — reducing TAT and eliminating transcription errors.",
    icon: "🧪", category: "Clinical",
    stats: [{ label: "TAT Reduction", value: "55%" }, { label: "Analyzer Integrations", value: "200+" }, { label: "Error Rate", value: "<0.01%" }, { label: "Tests/Day Capacity", value: "Unlimited" }],
    features: [
      { title: "Sample Lifecycle Tracking", desc: "Barcode-driven sample tracking from collection to result with full audit trail." },
      { title: "Bi-Directional Analyzer Integration", desc: "Auto-receive results from Roche, Siemens, Abbott, Beckman and 200+ other analyzers." },
      { title: "Auto-Validation Rules", desc: "Configurable delta checks and auto-release rules eliminate manual result review for normal values." },
      { title: "Quality Control", desc: "Westgard rules, Levy-Jennings charts, and peer-group QC comparison built in." },
      { title: "Multi-Lab Network", desc: "Manage multiple laboratory locations with centralized reporting and specimen routing." },
      { title: "Critical Value Management", desc: "Instant SMS/email notification to ordering physicians for critical results." },
    ],
    benefits: ["CLIA and CAP compliance built in", "Reduce paper requisitions to zero", "Automatic critical value alerts", "Reference lab interface support", "Real-time lab manager dashboard", "Patient portal result delivery"],
  },
  radiology: {
    title: "Radiology Information System",
    subtitle: "Imaging Management Reimagined",
    description: "A comprehensive RIS/PACS-integrated system for managing radiology orders, scheduling, modality worklists, report dictation, and image distribution.",
    icon: "🩻", category: "Clinical",
    stats: [{ label: "Imaging Studies/Year", value: "10M+" }, { label: "Report TAT Reduction", value: "60%" }, { label: "PACS Integrations", value: "All major" }, { label: "Modalities Supported", value: "All" }],
    features: [
      { title: "Order Management & Scheduling", desc: "Manage radiology orders, patient scheduling, and resource allocation for all modalities." },
      { title: "Modality Worklist (MWL)", desc: "Automatically push patient demographics and order details to imaging equipment via DICOM." },
      { title: "Report Dictation", desc: "Voice recognition-powered dictation for radiologists with structured reporting templates." },
      { title: "PACS Integration", desc: "View and annotate DICOM images directly from the patient chart — works with all major PACS vendors." },
      { title: "Critical Finding Alerts", desc: "Structured communication of critical imaging findings to referring clinicians." },
      { title: "Radiologist Dashboard", desc: "Manage worklist priorities, study statuses, and reporting queues in real time." },
    ],
    benefits: ["HL7 and DICOM compliant", "Reduce radiologist report turnaround", "Integrated peer review workflow", "Teleradiology support", "Dose tracking and radiation monitoring", "Referring physician result portal"],
  },
  pharmacy: {
    title: "Pharmacy Management System",
    subtitle: "Safe, Smart Dispensing",
    description: "Connect your pharmacy to the clinical workflow with electronic prescriptions, real-time drug interaction checking, inventory automation, and seamless billing.",
    icon: "💊", category: "Clinical",
    stats: [{ label: "Prescriptions Processed", value: "10M+" }, { label: "Drug Errors Prevented", value: "99.8%" }, { label: "Inventory Accuracy", value: "99.9%" }, { label: "Dispensing Speed", value: "3x faster" }],
    features: [
      { title: "e-Prescription Receiving", desc: "Receive prescriptions electronically from physician EMR — no manual transcription." },
      { title: "Clinical Drug Checking", desc: "Real-time drug-drug, drug-allergy, and drug-disease interaction checking at dispensing." },
      { title: "Inventory & Expiry Management", desc: "FIFO dispensing, expiry alerts, controlled substance logs, and automated reorder points." },
      { title: "Insurance Adjudication", desc: "Real-time insurance claim submission and adjudication at the point of dispensing." },
      { title: "IV Admixture & Compounding", desc: "Complete workflow for IV preparation and extemporaneous compounding with formula management." },
      { title: "Patient Counselling Module", desc: "Document medication counselling and patient education for adherence tracking." },
    ],
    benefits: ["Zero manual prescription transcription", "Controlled substance full audit trail", "Automated stock replenishment", "Recall and expiry management", "Multi-pharmacy network support", "Patient medication adherence tracking"],
  },
  "billing-finance": {
    title: "Billing & Finance",
    subtitle: "Revenue You Can Count On",
    description: "Automate your entire revenue cycle from charge capture through payment posting — reducing denials, accelerating cash flow, and giving finance teams real-time visibility.",
    icon: "💰", category: "Administration",
    stats: [{ label: "Revenue Tracked", value: "$10B+" }, { label: "Denial Rate Reduction", value: "65%" }, { label: "Days in AR (avg)", value: "18 days" }, { label: "Collection Rate", value: "98.2%" }],
    features: [
      { title: "Automated Charge Capture", desc: "Clinical activities auto-generate charges — no manual charge entry from nursing or physicians." },
      { title: "Insurance Eligibility & Claims", desc: "Real-time eligibility checks and electronic claims submission to 150+ insurers." },
      { title: "Denial Management", desc: "AI-powered denial prevention, automated appeals, and root cause analysis." },
      { title: "Patient Billing & Collections", desc: "Flexible patient statements, payment plans, charity care screening, and online payments." },
      { title: "Revenue Analytics", desc: "Real-time dashboards tracking revenue, AR aging, payer performance, and collection rates." },
      { title: "GL Integration", desc: "Seamless export to major accounting systems (QuickBooks, SAP, Oracle, and more)." },
    ],
    benefits: ["Reduce days in AR by 40%", "Eliminate lost charges completely", "Automate insurance pre-authorization", "Real-time financial dashboards", "HIPAA EDI 837/835 compliant", "Integrated with clinical workflows"],
  },
  "hr-payroll": {
    title: "HR & Payroll",
    subtitle: "Your People, Perfectly Managed",
    description: "Manage your entire healthcare workforce — from hiring and credentialing to scheduling, time tracking, and payroll — in one integrated HR platform.",
    icon: "👥", category: "Administration",
    stats: [{ label: "Staff Managed", value: "500K+" }, { label: "Payroll Accuracy", value: "99.99%" }, { label: "Credentialing Time", value: "-70%" }, { label: "Scheduling Conflicts", value: "-90%" }],
    features: [
      { title: "Staff Scheduling", desc: "Build and manage complex shift schedules for doctors, nurses, and support staff with coverage rules." },
      { title: "Credentialing & Licensing", desc: "Track medical licenses, certifications, CPD points, and send expiry reminders automatically." },
      { title: "Time & Attendance", desc: "Biometric and mobile clock-in/out with real-time attendance dashboards." },
      { title: "Payroll Processing", desc: "Automated payroll with overtime, allowances, deductions, and statutory compliance." },
      { title: "Performance Management", desc: "360° appraisals, KPI tracking, and competency assessments for clinical staff." },
      { title: "Self-Service Portal", desc: "Staff can view payslips, apply for leave, swap shifts, and update personal details online." },
    ],
    benefits: ["Eliminate manual timesheet errors", "Automate credential expiry alerts", "Reduce scheduling admin by 80%", "Statutory payroll compliance", "Staff self-service reduces HR load", "Integrated with clinical scheduling"],
  },
  inventory: {
    title: "Inventory Management",
    subtitle: "Zero Stockouts. Zero Waste.",
    description: "Track and manage every medical supply, equipment item, and pharmaceutical across all departments and locations — with automated reordering and expiry management.",
    icon: "📦", category: "Administration",
    stats: [{ label: "SKUs Managed", value: "100K+" }, { label: "Stock-Out Reduction", value: "70%" }, { label: "Waste Reduction", value: "35%" }, { label: "Order Accuracy", value: "99.9%" }],
    features: [
      { title: "Real-Time Stock Tracking", desc: "Live inventory levels across all wards, departments, storerooms, and branches." },
      { title: "Automated Reordering", desc: "Configurable reorder points trigger automatic purchase orders to approved suppliers." },
      { title: "Expiry & Recall Management", desc: "Track product expiry dates and manage product recalls with targeted notifications." },
      { title: "Equipment Asset Management", desc: "Track location, maintenance schedules, and lifecycle of medical equipment." },
      { title: "Supplier Management", desc: "Vendor catalog, price comparison, contract management, and purchase order tracking." },
      { title: "Consumption Analytics", desc: "Analyze consumption patterns by department to optimize stock levels and reduce waste." },
    ],
    benefits: ["Eliminate emergency stockouts", "Reduce over-ordering and waste", "Full expiry date compliance", "Equipment maintenance scheduling", "Procurement cost optimization", "Network-wide inventory visibility"],
  },
  "patient-portal": {
    title: "Patient Portal",
    subtitle: "Healthcare in Your Patients' Hands",
    description: "Give patients secure 24/7 online access to their health records, appointments, test results, prescriptions, and direct communication with their care team.",
    icon: "📱", category: "Patient",
    stats: [{ label: "Patient Engagement", value: "+65%" }, { label: "No-Show Reduction", value: "40%" }, { label: "Portal Adoption", value: "78% avg" }, { label: "Support Calls Reduced", value: "50%" }],
    features: [
      { title: "Online Appointment Booking", desc: "Patients can self-schedule, reschedule, and cancel appointments 24/7 without calling." },
      { title: "Health Record Access", desc: "Patients view their visit summaries, diagnoses, medications, allergies, and immunizations." },
      { title: "Lab & Imaging Results", desc: "Receive test results online with clinician explanations and next-step guidance." },
      { title: "Secure Messaging", desc: "HIPAA-compliant messaging between patients and their care team — no email." },
      { title: "Bill Pay & Statements", desc: "View and pay outstanding balances online with flexible payment options." },
      { title: "Prescription Refill Requests", desc: "Patients can request prescription refills directly through the portal." },
    ],
    benefits: ["Reduce administrative call volume", "Improve patient satisfaction scores", "Boost HEDIS quality measures", "HIPAA compliant messaging", "Mobile-responsive design", "Supports dependent account management"],
  },
  telemedicine: {
    title: "Telemedicine",
    subtitle: "Care Without Boundaries",
    description: "Launch HIPAA-compliant video consultations, remote monitoring, and asynchronous care directly within CareFlow — no third-party tools required.",
    icon: "🖥️", category: "Patient",
    stats: [{ label: "Video Consults/Month", value: "500K+" }, { label: "Patient Satisfaction", value: "96%" }, { label: "No-Show Rate", value: "8% vs 24%" }, { label: "Revenue Increase", value: "+28%" }],
    features: [
      { title: "HD Video Consultations", desc: "Encrypted, browser-based video consultations — no app download needed for patients." },
      { title: "Virtual Waiting Room", desc: "Patients check in online and wait virtually — physicians see real-time queue and patient info." },
      { title: "e-Prescribing", desc: "Issue prescriptions during video visits that are immediately sent to the patient's pharmacy." },
      { title: "Remote Patient Monitoring", desc: "Integrate with wearables and home devices to monitor chronic patients between visits." },
      { title: "Asynchronous Care", desc: "Patients submit photos, symptoms, and questions for physician review — no live visit needed." },
      { title: "Documentation Integration", desc: "Telemedicine visits are automatically documented in the patient's EMR with the full recording." },
    ],
    benefits: ["HIPAA compliant video platform", "Increase patient volume without more space", "Expand geographic reach", "Reduce patient travel burden", "Integrated billing and coding", "Multi-provider group sessions"],
  },
  "ai-assistant": {
    title: "AI Assistant",
    subtitle: "Your Intelligent Clinical Co-Pilot",
    description: "CareFlow's embedded AI assistant helps clinicians make faster, safer decisions — from drafting clinical notes and suggesting diagnoses to flagging deteriorating patients before it's too late.",
    icon: "🤖", category: "AI",
    stats: [{ label: "Clinical Notes Drafted", value: "2M+/month" }, { label: "Documentation Time", value: "-60%" }, { label: "Diagnostic Accuracy", value: "+32%" }, { label: "Early Warnings", value: "98.5% sensitivity" }],
    features: [
      { title: "AI Clinical Note Generation", desc: "Transcribe and structure physician-patient conversations into complete SOAP notes automatically." },
      { title: "Differential Diagnosis Support", desc: "Suggest differential diagnoses based on symptoms, history, labs, and imaging findings." },
      { title: "Early Warning System", desc: "ML models detect patient deterioration up to 6 hours before clinical recognition." },
      { title: "Smart Order Sets", desc: "AI recommends appropriate order sets based on the patient's presentation and evidence-based guidelines." },
      { title: "Drug Interaction Intelligence", desc: "Beyond simple alerts — AI explains the mechanism and suggests safe alternatives." },
      { title: "Summarization", desc: "Instantly generate discharge summaries, referral letters, and patient-friendly explanations." },
    ],
    benefits: ["Reduce physician burnout from documentation", "Catch deteriorating patients earlier", "Evidence-based decision support", "FDA-cleared AI modules", "Explainable AI — always shows reasoning", "Continuously learning from your patient population"],
  },
  analytics: {
    title: "Analytics & Reporting",
    subtitle: "Turn Data into Decisions",
    description: "A powerful, real-time analytics platform that gives hospital leadership, department heads, and quality teams the insights they need to drive better outcomes and smarter operations.",
    icon: "📊", category: "AI",
    stats: [{ label: "Reports Available", value: "500+" }, { label: "Data Refresh Rate", value: "Real-time" }, { label: "Dashboard Types", value: "20+" }, { label: "Export Formats", value: "Excel, PDF, API" }],
    features: [
      { title: "Executive Dashboards", desc: "Live KPI dashboards for CEOs, CFOs, CMOs, and CNOs — tailored to each role." },
      { title: "Clinical Quality Metrics", desc: "Track HEDIS, CMS quality measures, infection rates, readmission rates, and mortality." },
      { title: "Financial Analytics", desc: "Revenue, AR aging, payer mix, cost per case, and procedure profitability analysis." },
      { title: "Operational Efficiency", desc: "Bed occupancy, ED throughput, surgical suite utilization, and staff productivity." },
      { title: "Population Health", desc: "Identify high-risk patient populations and care gaps for proactive intervention." },
      { title: "Custom Report Builder", desc: "Drag-and-drop report builder for department-specific reporting without IT support." },
    ],
    benefits: ["Real-time data — never stale", "Drill-down from summary to individual patient", "Automated scheduled report delivery", "Benchmark against industry peers", "Export to any BI tool", "Role-based data access controls"],
  },
};

export async function generateStaticParams() {
  return Object.keys(productsData).map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = productsData[resolvedParams.slug];
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">{data.icon}</div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold mb-6">
            <BarChart3 size={14} /> CareFlow {data.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{data.title}</h1>
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
                Request Demo <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {data.stats.map((s) => (
              <div key={s.label}>
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Key Features</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Purpose-built capabilities that make a real difference.</p>
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

      {/* Benefits + Testimonial */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Teams Love It</h2>
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
                "The implementation was smooth and the results were immediate. Our team efficiency improved within the first week."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center font-bold text-lg">KN</div>
                <div>
                  <div className="font-bold">Dr. Kofi Nkrumah</div>
                  <div className="text-slate-400 text-sm">Medical Director, Accra General Hospital</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-500">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See {data.title} in Action</h2>
          <p className="text-emerald-100 mb-10 text-lg">Get a personalized demo tailored to your workflow.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <button className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-all">
                Start Free Trial
              </button>
            </Link>
            <Link href="/sales">
              <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                <Users size={16} /> Book a Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
