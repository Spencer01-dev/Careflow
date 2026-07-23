"use client";
import { useState } from "react";
import { Building2, Phone, Mail, Clock, MapPin, CheckCircle2, MessageSquare, Plus, Minus, ArrowRight, MessageCircle } from "lucide-react";
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
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);

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
                      <a href="mailto:bluewhaletechnologies1@gmail.com" className="text-emerald-600 font-semibold text-sm">bluewhaletechnologies1@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex gap-4 relative">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-teal-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Call Sales</h4>
                      <p className="text-sm text-slate-500 mb-1">Mon-Fri from 8am to 5pm GMT.</p>
                      
                      <button 
                        onClick={() => setShowPhoneOptions(!showPhoneOptions)}
                        className="text-emerald-600 font-semibold text-sm hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0"
                      >
                        +254 706 656 544
                      </button>

                      {showPhoneOptions && (
                        <div className="absolute top-full left-16 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
                          <a 
                            href="tel:+254706656544" 
                            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700 transition-colors border-b border-slate-50"
                            onClick={() => setShowPhoneOptions(false)}
                          >
                            <Phone size={16} className="text-slate-400" />
                            <span className="text-sm font-medium">Phone Call</span>
                          </a>
                          <a 
                            href="https://wa.me/254706656544" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 text-slate-700 transition-colors"
                            onClick={() => setShowPhoneOptions(false)}
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            <span className="text-sm font-medium">WhatsApp</span>
                          </a>
                        </div>
                      )}
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
