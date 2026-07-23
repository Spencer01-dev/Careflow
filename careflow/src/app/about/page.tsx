"use client";
import { Activity, Target, Eye, Shield, Users, Globe2, Building2, Server, Lock, HeartHandshake, Zap, BrainCircuit, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Button from "@/components/ui/Button";

const stats = [
  { label: "Hospitals", value: "500+" },
  { label: "Doctors", value: "25,000+" },
  { label: "Patients Managed", value: "10M+" },
  { label: "System Uptime", value: "99.99%" },
];

const team = [
  { name: "Dr. Sarah Johnson", role: "Chief Executive Officer", desc: "Former Chief Medical Officer with 15+ years of clinical experience." },
  { name: "David Chen", role: "Chief Technology Officer", desc: "Ex-Google engineer specializing in scalable cloud infrastructure." },
  { name: "Dr. Amina K.", role: "Chief Medical Advisor", desc: "Leading healthcare policy expert and practicing surgeon." },
  { name: "Michael Osei", role: "Head of Product", desc: "Product visionary with a track record in health-tech startups." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Reimagining Healthcare <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Through Technology</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-10">
            CareFlow is an enterprise Healthcare Operating System built to help hospitals deliver safer, faster, and smarter patient care while streamlining administration, finance, human resources, inventory, and clinical operations.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                <Target size={28} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                "To empower healthcare providers with intelligent technology that improves patient outcomes, operational efficiency, and decision-making."
              </p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-6">
                <Eye size={28} className="text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                "To become Africa's leading Healthcare Operating System powering modern hospitals and healthcare organizations globally."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div key={i} className={`text-center ${i === 0 ? '' : 'pl-8'}`}>
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-emerald-200 text-sm font-semibold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
          <p className="text-slate-500 mb-16 max-w-2xl mx-auto">The principles that guide our product development and customer relationships.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, label: "Innovation" },
              { icon: Shield, label: "Trust & Security" },
              { icon: HeartHandshake, label: "Compassion" },
              { icon: Users, label: "Patient First" },
            ].map((val, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                  <val.icon size={24} className="text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900">{val.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Security */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Enterprise-Grade Architecture</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                CareFlow is built on a modern, cloud-native stack designed for maximum scalability, high availability, and strict healthcare compliance.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Military-Grade Encryption", desc: "AES-256 encryption for data at rest and TLS 1.3 for data in transit." },
                  { title: "Multi-Tenant Isolation", desc: "Complete logical separation of hospital databases ensuring absolute privacy." },
                  { title: "AI-Powered", desc: "Integrated clinical LLMs for predictive analytics and diagnostic support." },
                  { title: "HIPAA Compliant", desc: "Fully audited infrastructure adhering to international healthcare standards." },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1"><CheckCircle2 className="text-green-500" size={20} /></div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-3xl transform rotate-3" />
              <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-6 rounded-2xl text-center">
                    <Server size={32} className="mx-auto mb-3 text-slate-700" />
                    <span className="font-bold text-slate-900 text-sm">Cloud Infrastructure</span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl text-center">
                    <Lock size={32} className="mx-auto mb-3 text-emerald-600" />
                    <span className="font-bold text-slate-900 text-sm">Role-Based Access</span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl text-center">
                    <BrainCircuit size={32} className="mx-auto mb-3 text-teal-600" />
                    <span className="font-bold text-slate-900 text-sm">AI Engine</span>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl text-center">
                    <Globe2 size={32} className="mx-auto mb-3 text-indigo-600" />
                    <span className="font-bold text-slate-900 text-sm">Open APIs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership Team</h2>
            <p className="text-slate-500">Built by a team of healthcare veterans and world-class engineers.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:-translate-y-1 transition-transform">
                <div className="w-24 h-24 mx-auto rounded-full bg-slate-200 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400" /> {/* Placeholder photo */}
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
                <p className="text-emerald-600 text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Join Our Mission</h3>
            <Button variant="outline" size="md">View Open Positions</Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0B1F3A] text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Modernize Your Hospital?</h2>
        <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg">
          Join hundreds of leading healthcare organizations transforming patient care with CareFlow.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 shadow-[0_0_20px_rgba(37,99,235,0.3)] px-8">
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8">
            Contact Sales
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
