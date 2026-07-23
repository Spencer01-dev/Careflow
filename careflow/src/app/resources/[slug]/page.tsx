import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ArrowRight, BookOpen, Users } from "lucide-react";

const resourcesData: Record<string, { title: string; subtitle: string; description: string; icon: string; sections: { heading: string; body: string }[] }> = {
  documentation: {
    title: "Documentation", subtitle: "Everything You Need to Get Started", icon: "📖",
    description: "Comprehensive technical and end-user documentation for every CareFlow module — from installation guides and API references to user manuals and video tutorials.",
    sections: [
      { heading: "Getting Started Guide", body: "Step-by-step setup and onboarding instructions for new CareFlow implementations, including environment setup, user provisioning, and initial configuration." },
      { heading: "Module Documentation", body: "Detailed documentation for every CareFlow module: EMR, Pharmacy, Laboratory, Billing, HR, and more — written for both clinical staff and system administrators." },
      { heading: "API Reference", body: "Complete REST API documentation with endpoint definitions, request/response schemas, authentication guides, and code samples in Python, JavaScript, and curl." },
      { heading: "Integration Guides", body: "Step-by-step guides for integrating CareFlow with HL7 systems, DICOM devices, insurance payers, and third-party applications." },
      { heading: "Video Tutorials", body: "A growing library of video walkthroughs covering every feature — from basic patient registration to advanced analytics configuration." },
      { heading: "Release Notes", body: "Detailed release notes for every CareFlow version, including new features, bug fixes, security patches, and migration instructions." },
    ],
  },
  "developer-api": {
    title: "Developer API", subtitle: "Build on CareFlow", icon: "⚙️",
    description: "A comprehensive, secure REST API that lets developers build custom integrations, third-party applications, and automation workflows on top of the CareFlow platform.",
    sections: [
      { heading: "RESTful API", body: "Fully documented REST API with versioned endpoints covering Patients, Appointments, Clinical Records, Billing, Lab, Pharmacy, and more." },
      { heading: "FHIR R4 Compliance", body: "CareFlow supports the HL7 FHIR R4 standard — enabling seamless interoperability with any FHIR-compatible health system." },
      { heading: "OAuth 2.0 Authentication", body: "Secure API access using OAuth 2.0 with JWT bearer tokens, scoped permissions, and refresh token management." },
      { heading: "Webhooks", body: "Subscribe to real-time webhook events for patient admissions, lab results, prescription issuance, and more — build reactive integrations." },
      { heading: "Sandbox Environment", body: "A fully functional sandbox environment with sample data for testing and development — no production data required." },
      { heading: "SDKs & Libraries", body: "Official SDKs for Python, JavaScript/Node.js, and Java to accelerate integration development." },
    ],
  },
  "knowledge-base": {
    title: "Knowledge Base", subtitle: "Answers at Your Fingertips", icon: "🔍",
    description: "A searchable library of how-to articles, FAQs, troubleshooting guides, and best practices — organized by module and user role.",
    sections: [
      { heading: "How-To Articles", body: "Step-by-step guides for common tasks: registering a patient, generating a report, processing a claim, scheduling a procedure, and more." },
      { heading: "FAQs", body: "Answers to the most common questions from administrators, clinicians, and IT teams across all CareFlow modules." },
      { heading: "Troubleshooting Guides", body: "Structured troubleshooting guides for common issues — from login problems and print errors to integration failures." },
      { heading: "Best Practices", body: "Recommendations from healthcare IT experts and CareFlow implementation teams for optimizing workflows and system configuration." },
      { heading: "Video Walkthroughs", body: "Short, focused screen-recording videos showing exactly how to complete specific tasks in CareFlow." },
      { heading: "Community Forum", body: "Join thousands of CareFlow users sharing tips, asking questions, and building a community of healthcare IT professionals." },
    ],
  },
  "case-studies": {
    title: "Hospital Case Studies", subtitle: "Real Results from Real Hospitals", icon: "📊",
    description: "In-depth case studies from hospitals and health networks that have transformed their operations with CareFlow — with real data, timelines, and outcomes.",
    sections: [
      { heading: "Nairobi General Hospital", body: "How Nairobi General reduced patient wait times by 58% and increased revenue by 32% within 6 months of CareFlow implementation." },
      { heading: "West Africa Health Network (12 Branches)", body: "How a 12-branch health network unified patient records, standardized clinical workflows, and reduced inter-branch referral time from 3 days to 4 hours." },
      { heading: "Aga Khan University Hospital", body: "How one of East Africa's premier teaching hospitals implemented CareFlow across 5 departments with zero disruption to ongoing patient care." },
      { heading: "Kenyatta National Hospital", body: "How a 1,200-bed national referral hospital digitized its entire laboratory operation — processing 3x more tests with the same staff." },
      { heading: "MedGroupe International (50 Clinics)", body: "A 50-clinic specialty network's journey from paper records to a fully digital, cloud-native operation — completed in 4 months." },
      { heading: "Download Full Case Studies", body: "All case studies are available as downloadable PDFs, including full implementation details, cost-benefit analysis, and ROI calculations." },
    ],
  },
  blog: {
    title: "CareFlow Blog", subtitle: "Insights for Healthcare Leaders", icon: "✍️",
    description: "Expert articles, industry trends, product updates, and practical guides for hospital administrators, clinical leaders, and healthcare IT professionals.",
    sections: [
      { heading: "Healthcare Technology Trends", body: "Analysis of the latest trends shaping healthcare technology — from AI in diagnostics to cloud-native hospital systems and interoperability standards." },
      { heading: "CareFlow Product Updates", body: "In-depth articles explaining new features, module enhancements, and upcoming roadmap items — straight from the product team." },
      { heading: "Clinical Workflow Optimization", body: "Best practice guides for improving clinical workflows, reducing documentation burden, and enhancing patient safety." },
      { heading: "Revenue Cycle Management", body: "Expert articles on maximizing revenue, reducing denials, improving AR days, and navigating insurance complexities." },
      { heading: "Digital Health Leadership", body: "Interviews and thought leadership from hospital CEOs, CMOs, and CIOs who have successfully led digital transformation programs." },
      { heading: "Compliance & Regulatory Updates", body: "Stay current on HIPAA changes, JCI standards, HL7 FHIR updates, and national health information policies affecting your hospital." },
    ],
  },
  support: {
    title: "Support Center", subtitle: "We Are Here When You Need Us", icon: "🎧",
    description: "CareFlow's enterprise support team is available 24/7 to help your clinical and technical teams resolve issues quickly and keep your hospital running smoothly.",
    sections: [
      { heading: "24/7 Enterprise Support", body: "Critical issues are handled around the clock by our dedicated healthcare IT support team — with a 1-hour SLA for Priority 1 incidents." },
      { heading: "Support Ticket Portal", body: "Log, track, and manage support tickets online — with real-time status updates and resolution timelines." },
      { heading: "Live Chat", body: "Get instant answers from a support specialist via live chat during business hours — average response time under 2 minutes." },
      { heading: "Phone Support", body: "Dedicated phone support line for enterprise clients: +1 (800) 123-4567. Available 8am–8pm GMT, with on-call for critical issues." },
      { heading: "Customer Success Manager", body: "Every enterprise client is assigned a dedicated Customer Success Manager who proactively monitors your implementation and escalates issues." },
      { heading: "Training & Onboarding", body: "On-site and remote training programs for clinical staff, administrators, and IT teams — tailored to your workflows and user roles." },
    ],
  },
  status: {
    title: "System Status", subtitle: "CareFlow Infrastructure Status", icon: "✅",
    description: "Real-time status and historical uptime information for all CareFlow platform components, APIs, and regional deployments.",
    sections: [
      { heading: "Current Status: All Systems Operational", body: "All CareFlow platform components are currently operating normally. Last checked: just now." },
      { heading: "API Gateway", body: "✅ Operational — 99.99% uptime over the last 90 days. Average response time: 87ms." },
      { heading: "Web Application", body: "✅ Operational — 99.98% uptime over the last 90 days. Deployed across 3 global regions." },
      { heading: "Database Services", body: "✅ Operational — Redundant PostgreSQL cluster with automatic failover. RTO: <30 seconds." },
      { heading: "HL7/FHIR Integration Hub", body: "✅ Operational — Processing 2M+ HL7 messages per day with <100ms average latency." },
      { heading: "Incident History", body: "No major incidents in the past 90 days. Minor scheduled maintenance windows are published 72 hours in advance via email notification." },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(resourcesData).map((slug) => ({ slug }));
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = resourcesData[resolvedParams.slug];
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="relative pt-32 pb-24 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">{data.icon}</div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold mb-6">
            <BookOpen size={14} /> CareFlow Resources
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{data.title}</h1>
          <p className="text-xl text-emerald-300 font-semibold mb-4">{data.subtitle}</p>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-10">{data.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sales"><button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all flex items-center gap-2">Talk to Sales <ArrowRight size={16} /></button></Link>
            <Link href="/auth/login"><button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">Sign In to Support</button></Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-8">
          {data.sections.map((s) => (
            <div key={s.heading} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{s.heading}</h3>
              <p className="text-slate-600 leading-relaxed text-base">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-500">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-emerald-100 mb-10 text-lg">Our team is ready to assist you with anything you need.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sales"><button className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-all">Contact Sales</button></Link>
            <Link href="/auth/login"><button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"><Users size={16} /> Open Support Ticket</button></Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
