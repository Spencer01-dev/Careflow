import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CheckCircle2, ArrowRight, Users, Zap } from "lucide-react";

const featuresData: Record<string, { title: string; subtitle: string; description: string; icon: string; points: { title: string; desc: string }[]; benefits: string[] }> = {
  "appointment-scheduling": {
    title: "Appointment Scheduling", subtitle: "Zero Friction Booking", icon: "📅",
    description: "A powerful, multi-resource scheduling engine that eliminates double-bookings, reduces no-shows, and keeps your facility running at peak capacity — all in real time.",
    points: [
      { title: "Online Patient Self-Booking", desc: "Patients book 24/7 via the patient portal or mobile app, choosing their provider and time slot." },
      { title: "Smart Conflict Detection", desc: "Automatically prevents double-booking of rooms, equipment, and clinicians." },
      { title: "Multi-Resource Booking", desc: "Book doctor, exam room, equipment, and nurses in a single scheduling action." },
      { title: "Automated Reminders", desc: "SMS and email reminders reduce no-show rates by up to 40%." },
      { title: "Waitlist Management", desc: "Automatically offer cancellation slots to patients on the waitlist." },
      { title: "Recurring Appointments", desc: "Schedule recurring visits for chronic disease and therapy patients with one click." },
    ],
    benefits: ["Reduce no-shows by 40%", "Eliminate double-bookings", "24/7 patient self-scheduling", "Integrated with EMR and billing", "Multi-location calendar view", "Google Calendar and Outlook sync"],
  },
  "queue-management": {
    title: "Queue Management", subtitle: "Eliminate Waiting Room Chaos", icon: "🔢",
    description: "Digital queue management with real-time displays, SMS notifications, and analytics — so patients know exactly when to expect their turn and staff can manage flow proactively.",
    points: [
      { title: "Digital Token System", desc: "Issue digital tokens at reception — patients wait anywhere, not just in crowded waiting rooms." },
      { title: "Real-Time Display Boards", desc: "Waiting room screens show live queue status, estimated wait times, and department status." },
      { title: "SMS Patient Notifications", desc: "Patients receive SMS updates as their turn approaches — they can wait in their car or cafeteria." },
      { title: "Priority Routing", desc: "Triage nurses can immediately elevate critical patients to the front of any queue." },
      { title: "Queue Analytics", desc: "Dashboard shows average wait times, peak hours, and bottleneck departments." },
      { title: "Multi-Department Queues", desc: "Independent queues for OPD, pharmacy, lab, radiology — all managed from one screen." },
    ],
    benefits: ["Reduce average wait time by 50%", "Improve patient satisfaction scores", "Reduce overcrowding and complaints", "Real-time staff workload visibility", "Reduce walk-outs", "Analytics for operational improvement"],
  },
  "insurance-claims": {
    title: "Insurance Claims Management", subtitle: "Get Paid Faster", icon: "🛡️",
    description: "End-to-end insurance claims management from eligibility verification and pre-authorization to claims submission, adjudication tracking, and denial resolution.",
    points: [
      { title: "Real-Time Eligibility Check", desc: "Verify insurance coverage instantly at registration — no phone calls required." },
      { title: "Electronic Claims Submission", desc: "Submit HIPAA EDI 837 claims electronically to 150+ payers in one click." },
      { title: "AI Claims Scrubbing", desc: "AI checks for common errors before submission to reduce first-pass denial rates." },
      { title: "Denial Management", desc: "Structured workflow to identify, appeal, and resolve denied claims with root-cause analysis." },
      { title: "ERA/EOB Auto-Posting", desc: "Automatically post insurance payments and adjustments to patient accounts." },
      { title: "Pre-Authorization Tracking", desc: "Submit and track prior authorizations electronically with automatic status updates." },
    ],
    benefits: ["Reduce claim denial rates by 65%", "Accelerate payment cycles", "Eliminate manual claim entry", "HIPAA EDI compliant", "Real-time AR dashboard", "Automated denial appeal workflow"],
  },
  "digital-prescriptions": {
    title: "Digital Prescriptions", subtitle: "Safe. Fast. Paperless.", icon: "📝",
    description: "Replace handwritten prescriptions with a secure electronic prescribing system that checks for drug interactions, connects to pharmacy, and creates an auditable medication record.",
    points: [
      { title: "Point-of-Care e-Prescribing", desc: "Physicians prescribe from within the clinical consultation — linked to the patient chart." },
      { title: "Drug Interaction Alerts", desc: "Real-time checking for drug-drug, drug-allergy, and drug-disease interactions." },
      { title: "Formulary Checking", desc: "Instantly verify if a medication is covered by the patient's insurance plan." },
      { title: "Pharmacy Direct Send", desc: "Prescriptions are sent electronically to the patient's chosen pharmacy instantly." },
      { title: "Controlled Substance Prescribing", desc: "EPCS-compliant electronic prescribing for controlled substances with two-factor authentication." },
      { title: "Medication History", desc: "Access complete medication history from all providers and pharmacies in one view." },
    ],
    benefits: ["Eliminate illegible handwriting errors", "Reduce prescription fraud", "Instant pharmacy notification", "Complete medication history", "EPCS compliant for controlled substances", "Reduce prescription processing time by 80%"],
  },
  "bed-management": {
    title: "Bed Management", subtitle: "Maximize Capacity, Minimize Delays", icon: "🛏️",
    description: "A real-time command center for hospital bed availability — from admission requests and bed assignments to housekeeping status and discharge planning.",
    points: [
      { title: "Real-Time Bed Board", desc: "Live visual map of every bed in every ward — occupied, available, being cleaned, or reserved." },
      { title: "Admission Request Queue", desc: "Manage and prioritize incoming admission requests from ED, OR, and external transfers." },
      { title: "Housekeeping Integration", desc: "Bed status updates from housekeeping staff trigger automatic availability notifications." },
      { title: "Discharge Planning", desc: "Proactive discharge planning tools identify patients ready for discharge to free up beds faster." },
      { title: "Isolation & Precaution Tracking", desc: "Flag beds requiring infection control precautions with automatic staff notification." },
      { title: "Predictive Occupancy", desc: "AI predicts tomorrow's bed demand based on scheduled admissions, electives, and historical patterns." },
    ],
    benefits: ["Reduce average time-to-bed by 60%", "Eliminate manual bed tracking boards", "Improve ED throughput", "Reduce LWBS (left without being seen)", "Real-time occupancy dashboard", "Predictive capacity planning"],
  },
  "emergency-department": {
    title: "Emergency Department", subtitle: "Every Second Counts", icon: "🚨",
    description: "A purpose-built ED module that manages the entire emergency care pathway — from ambulance notification and triage to treatment, disposition, and boarding.",
    points: [
      { title: "Ambulance Pre-Notification", desc: "Receive digital pre-alerts from EMS with patient vitals and ETA — prepare before arrival." },
      { title: "Triage & ESI Scoring", desc: "Structured digital triage with ESI acuity scoring, vital signs, and chief complaint capture." },
      { title: "ED Patient Tracking Board", desc: "Real-time visual board showing every patient, their location, status, and assigned staff." },
      { title: "Critical Result Alerts", desc: "Instant push notifications for critical lab values, imaging findings, and deteriorating vitals." },
      { title: "Disposition Management", desc: "Manage admit, discharge, and transfer decisions with integrated bed request and transport workflows." },
      { title: "ED Analytics", desc: "Track LWBS, door-to-physician, door-to-admit, and length-of-stay metrics in real time." },
    ],
    benefits: ["Reduce door-to-physician time", "Real-time patient tracking", "Eliminate lost patient situations", "Improve stroke and STEMI protocol compliance", "Integrated with hospital-wide bed management", "Full ED throughput analytics"],
  },
  "operating-theatre": {
    title: "Operating Theatre Management", subtitle: "Precision Surgical Scheduling", icon: "🏥",
    description: "Manage the entire surgical workflow — from pre-op scheduling and anaesthesia assessment to intraoperative documentation and post-op recovery — in one integrated system.",
    points: [
      { title: "Surgical Schedule Optimization", desc: "Schedule procedures across multiple theatres with surgeon, anaesthetist, equipment, and room coordination." },
      { title: "Pre-Op Assessment", desc: "Digital pre-operative assessment forms, consent documentation, and anaesthesia evaluation." },
      { title: "Intraoperative Documentation", desc: "Anaesthesia records, surgical counts, implant tracking, and operative notes in real time." },
      { title: "Implant & Device Management", desc: "Track surgical implants with lot numbers, expiry dates, and patient linkage for recall management." },
      { title: "PACU & Recovery Tracking", desc: "Monitor patients through recovery with Aldrete scoring and automated discharge criteria." },
      { title: "Turnover Time Analytics", desc: "Measure and optimize OR utilization, turnover times, and first-case on-time starts." },
    ],
    benefits: ["Maximize OR utilization", "Reduce surgical case delays", "Full implant traceability", "Eliminate surgical count errors", "Automated consent management", "Real-time OR dashboard for managers"],
  },
  "blood-bank": {
    title: "Blood Bank Management", subtitle: "Safe Transfusions, Every Time", icon: "🩸",
    description: "A comprehensive blood bank module that manages donor screening, component preparation, compatibility testing, inventory, and transfusion administration with full safety checks.",
    points: [
      { title: "Donor Management", desc: "Track donor eligibility, donation history, deferral reasons, and recall management." },
      { title: "Component Processing", desc: "Manage blood component preparation (RBC, FFP, Platelets, Cryo) with full traceability." },
      { title: "Electronic Crossmatch", desc: "Computer-assisted crossmatch with automatic compatibility checking against patient antibody history." },
      { title: "Issue & Administration", desc: "Electronic issue with two-step verification and bedside transfusion administration checks." },
      { title: "Inventory Management", desc: "Manage blood product inventory with expiry tracking and inter-facility transfer management." },
      { title: "Haemovigilance Reporting", desc: "Automated reporting of transfusion reactions and adverse events to national haemovigilance bodies." },
    ],
    benefits: ["Eliminate ABO incompatibility errors", "Full product traceability", "Automated inventory management", "Bedside transfusion safety checks", "Haemovigilance compliance", "Donor recall management"],
  },
  "reports-integrations": {
    title: "Reports & Integrations", subtitle: "Connect Everything", icon: "🔗",
    description: "A powerful reporting engine and integration hub that connects CareFlow to your existing systems — HL7, FHIR, DICOM, national health registries, and more.",
    points: [
      { title: "500+ Standard Reports", desc: "Ready-made clinical, financial, and operational reports with one-click generation." },
      { title: "Custom Report Builder", desc: "Drag-and-drop builder for custom reports — no SQL or IT required." },
      { title: "HL7 & FHIR Integration", desc: "Connect CareFlow to any HL7 2.x or FHIR R4 compatible system." },
      { title: "National Registry Reporting", desc: "Automated submission to national health registries, disease notification systems, and MOH reporting portals." },
      { title: "API Access", desc: "Full RESTful API with comprehensive documentation for custom integration development." },
      { title: "Data Export & BI Tools", desc: "Export data to Power BI, Tableau, Excel, or any analytics platform via live data connections." },
    ],
    benefits: ["Connect to existing hospital systems", "Automated regulatory reporting", "Real-time data access via API", "FHIR R4 compliant", "No vendor lock-in", "Dedicated integration support team"],
  },
};

export async function generateStaticParams() {
  return Object.keys(featuresData).map((slug) => ({ slug }));
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = featuresData[resolvedParams.slug];
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="relative pt-32 pb-24 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">{data.icon}</div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold mb-6">CareFlow Features</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{data.title}</h1>
          <p className="text-xl text-emerald-300 font-semibold mb-4">{data.subtitle}</p>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-10">{data.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register"><button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all">Start Free Trial</button></Link>
            <Link href="/sales"><button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">Request Demo <ArrowRight size={16} /></button></Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.points.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-5"><Zap size={18} className="text-white" /></div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            {data.benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-500">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to try {data.title}?</h2>
          <p className="text-emerald-100 mb-10 text-lg">Join 200+ healthcare organizations already running CareFlow.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register"><button className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-all">Start Free Trial</button></Link>
            <Link href="/sales"><button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"><Users size={16} /> Book a Demo</button></Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
