"use client";
import {
  Users, FileText, Calendar, CreditCard, FlaskConical, Radio,
  Pill, Package, UserCog, Brain, BarChart3, Video,
  Smartphone, Shield, Heart, Stethoscope,
} from "lucide-react";

const features = [
  { icon: Users, title: "Patient Management", desc: "Digital registration, QR codes, medical history, family records, and patient timelines.", color: "blue", gradient: "from-emerald-500 to-emerald-600" },
  { icon: FileText, title: "Electronic Medical Records", desc: "SOAP notes, vitals, diagnoses, prescriptions, discharge summaries with digital signatures.", color: "teal", gradient: "from-teal-500 to-teal-600" },
  { icon: Calendar, title: "Appointments", desc: "Smart scheduling, doctor availability, online booking, WhatsApp & SMS reminders.", color: "violet", gradient: "from-violet-500 to-violet-600" },
  { icon: CreditCard, title: "Billing & Finance", desc: "Invoices, insurance claims, installments, multi-payment support, financial reports.", color: "green", gradient: "from-green-500 to-green-600" },
  { icon: Shield, title: "Insurance Management", desc: "Pre-authorization, claim submission, approval workflows, claim tracking.", color: "amber", gradient: "from-amber-500 to-amber-600" },
  { icon: FlaskConical, title: "Laboratory", desc: "Sample collection, barcode labels, test requests, results, reference ranges.", color: "pink", gradient: "from-pink-500 to-pink-600" },
  { icon: Radio, title: "Radiology", desc: "X-Ray, MRI, CT Scan, Ultrasound, image viewer, PACS-ready reporting.", color: "indigo", gradient: "from-indigo-500 to-indigo-600" },
  { icon: Pill, title: "Pharmacy", desc: "Drug inventory, expiry tracking, prescription processing, drug interaction alerts.", color: "red", gradient: "from-red-500 to-red-600" },
  { icon: Package, title: "Inventory", desc: "Medical supplies, equipment, suppliers, purchasing, low stock alerts.", color: "orange", gradient: "from-orange-500 to-orange-600" },
  { icon: UserCog, title: "HR & Payroll", desc: "Employee records, attendance, payroll, leave management, recruitment.", color: "cyan", gradient: "from-cyan-500 to-cyan-600" },
  { icon: Brain, title: "AI Assistant", desc: "Diagnose suggestions, drug interaction warnings, prescription validation, lab interpretation.", color: "purple", gradient: "from-purple-500 to-purple-600" },
  { icon: BarChart3, title: "Analytics", desc: "Revenue, patient flow, department performance, doctor productivity dashboards.", color: "blue", gradient: "from-emerald-600 to-teal-500" },
  { icon: Video, title: "Telemedicine", desc: "HD video consultations, virtual waiting rooms, digital prescriptions.", color: "teal", gradient: "from-teal-500 to-cyan-500" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Patient and doctor mobile apps for iOS and Android.", color: "slate", gradient: "from-slate-600 to-slate-700" },
  { icon: Heart, title: "ICU & Emergency", desc: "Real-time vitals, critical care monitoring, emergency triage, ambulance dispatch.", color: "red", gradient: "from-red-600 to-rose-500" },
  { icon: Stethoscope, title: "Theatre & Surgeries", desc: "Operation scheduling, pre-op notes, anesthesia records, recovery management.", color: "violet", gradient: "from-violet-600 to-purple-500" },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Everything in One Platform
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Built for Every Corner
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              of Your Hospital
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            From emergency triage to payroll processing — every department, workflow, and team member is covered with purpose-built modules.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {/* Gradient bg on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
