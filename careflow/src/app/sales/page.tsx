"use client";
import { useState } from "react";
import { Building2, Phone, Mail, Clock, MapPin, CheckCircle2, MessageSquare, Plus, Minus, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const faqs = [
  { q: "How is CareFlow pricing structured?", a: "Our pricing is tiered based on the size of your facility, number of active beds, and the specific modules you require. Custom enterprise pricing is available for large multi-site networks." },
  { q: "How long does implementation take?", a: "Standard implementation for a single mid-sized hospital takes 4-8 weeks. Complex multi-branch deployments typically take 3-6 months, including full data migration and staff training." },
  { q: "Is CareFlow HIPAA compliant?", a: "Yes, CareFlow is fully HIPAA and ISO 27001 compliant. We use military-grade AES-256 encryption for data at rest and TLS 1.3 for data in transit." },
  { q: "Do you offer on-premise deployment?", a: "While CareFlow is designed as a cloud-native platform to maximize uptime and performance, we do offer dedicated private cloud or hybrid deployments for enterprise clients." },
];

export default function ContactSalesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold mb-6">
            <Building2 size={16} /> Enterprise Healthcare Solutions
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-6">
            Let's Transform Your <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Hospital Together</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Our healthcare specialists will help you find the perfect CareFlow solution for your organization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              Schedule a Demo
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
              Speak to Sales
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Form Side */}
            <div>
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-100">
                {submitted ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Request Submitted Successfully</h3>
                    <p className="text-slate-500 mb-8">
                      Thank you for your interest in CareFlow. A dedicated healthcare solutions specialist will contact you within 24 hours.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline">Submit Another Request</Button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Request a Consultation</h3>
                    <p className="text-slate-500 mb-8">Fill out the form below and we'll tailor a custom demo for your facility.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-8">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Hospital Name</label>
                          <input required type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Hospital Type</label>
                          <select required className="w-full px-5 py-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all bg-white">
                            <option value="">Select Type...</option>
                            <option>Private Hospital</option>
                            <option>Teaching Hospital</option>
                            <option>Specialist Hospital</option>
                            <option>Medical Centre</option>
                            <option>Healthcare Network</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Contact Person</label>
                          <input required type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Job Title</label>
                          <input required type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Work Email</label>
                          <input required type="email" className="w-full px-5 py-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Phone Number</label>
                          <input required type="tel" className="w-full px-5 py-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Company Size</label>
                          <select required className="w-full px-5 py-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all bg-white">
                            <option value="">Select Size...</option>
                            <option>1–50 Staff</option>
                            <option>51–200 Staff</option>
                            <option>201–500 Staff</option>
                            <option>501–1000 Staff</option>
                            <option>1000+ Staff</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Location (City, Country)</label>
                          <input required type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">How can we help?</label>
                        <textarea rows={4} className="w-full px-5 py-4 rounded-xl border border-slate-200 text-base focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all resize-none"></textarea>
                      </div>

                      <div className="flex items-start gap-4">
                        <input required type="checkbox" id="privacy" className="mt-1 w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" />
                        <label htmlFor="privacy" className="text-base text-slate-600 leading-relaxed">
                          I agree to the <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a> and consent to having CareFlow contact me regarding my inquiry.
                        </label>
                      </div>

                      <Button type="submit" size="lg" loading={loading} className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 h-14 text-base font-bold">
                        {loading ? "Submitting..." : "Request Consultation"}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Info Side */}
            <div className="space-y-12 lg:pl-24">
              


              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Direct Contact</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Email Us</h4>
                      <p className="text-sm text-slate-500 mb-1">Our friendly team is here to help.</p>
                      <a href="mailto:oscarmunene900@gmail.com" className="text-emerald-600 font-semibold text-sm">oscarmunene900@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-teal-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Call Sales</h4>
                      <p className="text-sm text-slate-500 mb-1">Mon-Fri from 8am to 5pm GMT.</p>
                      <a href="tel:+254706656544" className="text-emerald-600 font-semibold text-sm">+254 706 656 544</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-violet-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Location</h4>
                      <p className="text-sm text-slate-500">60400 Meru, Kenya</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know about the product and billing.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
                <button 
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-bold text-slate-900">{faq.q}</span>
                  {openFaq === i ? <Minus size={18} className="text-slate-400" /> : <Plus size={18} className="text-slate-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
