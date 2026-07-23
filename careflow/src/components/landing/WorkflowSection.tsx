"use client";
import { ArrowDown } from "lucide-react";

const steps = [
  { step: "01", title: "Patient Registration", desc: "Digital intake, ID verification, insurance details", color: "blue" },
  { step: "02", title: "Consultation", desc: "Doctor assigns triage, records vitals & complaints", color: "teal" },
  { step: "03", title: "Laboratory Tests", desc: "Samples collected, barcoded, results auto-delivered", color: "violet" },
  { step: "04", title: "Radiology Imaging", desc: "X-Ray/MRI/CT Scan ordered, images reviewed", color: "pink" },
  { step: "05", title: "Diagnosis", desc: "AI-assisted diagnosis, ICD-10 coding, treatment plan", color: "amber" },
  { step: "06", title: "Prescription", desc: "E-prescription sent to pharmacy, drug interaction check", color: "green" },
  { step: "07", title: "Billing & Insurance", desc: "Auto-generated invoice, insurance pre-auth, payment", color: "orange" },
  { step: "08", title: "Discharge & Follow-up", desc: "Discharge summary, medication, scheduled follow-up", color: "indigo" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  blue: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  teal: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", dot: "bg-teal-500" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", dot: "bg-violet-500" },
  pink: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", dot: "bg-pink-500" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-500" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", dot: "bg-indigo-500" },
};

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Seamless Patient Journey
          </div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
            End-to-End Patient{" "}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent">
              Workflow
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Every step of the patient journey is digitized, automated, and connected — from first contact to successful discharge.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-200 via-emerald-200 to-transparent -translate-x-1/2" />
          
          <div className="space-y-12">
            {steps.map((step, i) => {
              const colors = colorMap[step.color];
              const isEven = i % 2 === 0;
              return (
                <div key={step.step} className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Content */}
                  <div className={`flex-1 w-full ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`inline-block rounded-2xl ${colors.bg} ${colors.border} border p-6 hover:shadow-lg transition-all duration-300 w-full max-w-md bg-white hover:-translate-y-1 relative z-10`}>
                      <div className={`flex items-center gap-3 mb-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {!isEven && <span className={`w-3 h-3 rounded-full ${colors.dot}`} />}
                        <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                        {isEven && <span className={`w-3 h-3 rounded-full ${colors.dot}`} />}
                      </div>
                      <p className="text-sm text-slate-500">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center justify-center z-20">
                    <div className={`w-14 h-14 rounded-full ${colors.bg} ${colors.border} border-4 flex items-center justify-center shadow-xl bg-white`}>
                      <span className={`text-base font-black ${colors.text}`}>{step.step}</span>
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
