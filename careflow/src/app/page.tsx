import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      {/* Trusted By */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by leading healthcare organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-50">
            {[
              "Lagos University Hospital",
              "Aga Khan Health",
              "Nairobi Hospital",
              "Kenyatta National",
              "Korle Bu Teaching",
              "Chris Hani Baragwanath",
            ].map((name) => (
              <div key={name} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-600 to-teal-500" />
                <span className="text-sm font-bold text-slate-700">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FeaturesSection />
      <WorkflowSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
