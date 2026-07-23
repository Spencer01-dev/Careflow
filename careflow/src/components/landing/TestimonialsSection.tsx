"use client";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Emmanuel Osei",
    role: "Medical Director",
    hospital: "Accra General Hospital",
    avatar: "EO",
    rating: 5,
    quote: "CareFlow has completely transformed how we run our 800-bed hospital. The AI diagnostic assistant alone has improved our diagnostic accuracy by 34%. Absolutely world-class software.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Mrs. Amaka Eze",
    role: "Hospital CEO",
    hospital: "Nnewi Medical Centre",
    avatar: "AE",
    rating: 5,
    quote: "Before CareFlow, we had 6 different systems that didn't talk to each other. Now everything is unified. Revenue collection improved by 60% in the first quarter.",
    color: "from-violet-500 to-pink-500",
  },
  {
    name: "Dr. Fatima Al-Hassan",
    role: "Chief of Surgery",
    hospital: "Lagos Teaching Hospital",
    avatar: "FA",
    rating: 5,
    quote: "The theatre scheduling module is phenomenal. We've reduced surgical delays by 45% and the operation notes generation saves each surgeon 2+ hours per day.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    name: "Mr. James Mwangi",
    role: "Healthcare Administrator",
    hospital: "Nairobi Private Hospital",
    avatar: "JM",
    rating: 5,
    quote: "The multi-tenant architecture means we can manage all 4 of our branches from a single dashboard. The reporting capabilities are simply unmatched in the industry.",
    color: "from-orange-500 to-amber-500",
  },
  {
    name: "Dr. Sarah Nakibuka",
    role: "Consultant Cardiologist",
    hospital: "Kampala Heart Institute",
    avatar: "SN",
    rating: 5,
    quote: "As a doctor, I love that I can access patient records, lab results, and AI suggestions from my phone between consultations. CareFlow understands clinical workflows.",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Mr. David Mensah",
    role: "Finance Director",
    hospital: "Kumasi Regional Hospital",
    avatar: "DM",
    rating: 5,
    quote: "The insurance claim management has reduced our rejection rate from 22% to under 3%. The financial reports are exactly what our board needs every month.",
    color: "from-indigo-500 to-violet-500",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-sm font-semibold mb-4">
            <Star size={14} className="fill-amber-500 text-amber-500" />
            Loved by Healthcare Professionals
          </div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
            What Hospital Leaders{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Are Saying</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Join hundreds of healthcare organizations that trust CareFlow to run their operations every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                    <div className="text-xs text-emerald-600 font-medium">{t.hospital}</div>
                  </div>
                </div>
                <Quote size={20} className="text-slate-200" />
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
