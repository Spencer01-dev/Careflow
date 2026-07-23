"use client";
import { Check, Zap, Shield, Building2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: 299,
    period: "month",
    description: "Perfect for small clinics and private practices with up to 500 patients.",
    color: "blue",
    gradient: "from-emerald-500 to-emerald-600",
    popular: false,
    features: [
      "Up to 5 doctors & 20 staff",
      "500 active patients",
      "Patient Management (EMR)",
      "Appointment Scheduling",
      "Basic Billing",
      "Laboratory Module",
      "Pharmacy Module",
      "Email & SMS reminders",
      "Mobile App Access",
      "Standard Support",
    ],
  },
  {
    name: "Professional",
    icon: Shield,
    price: 799,
    period: "month",
    description: "Ideal for medium hospitals with multi-department operations.",
    color: "violet",
    gradient: "from-violet-600 to-emerald-600",
    popular: true,
    features: [
      "Up to 50 doctors & 200 staff",
      "10,000 active patients",
      "All Starter features",
      "Radiology & Imaging",
      "ICU & Emergency Dept",
      "Advanced Billing + Insurance",
      "HR & Payroll",
      "Inventory Management",
      "AI Medical Assistant",
      "Telemedicine Module",
      "Analytics Dashboard",
      "Priority Support",
    ],
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: 1999,
    period: "month",
    description: "For large hospitals, teaching hospitals, and multi-branch networks.",
    color: "teal",
    gradient: "from-teal-500 to-cyan-600",
    popular: false,
    features: [
      "Unlimited doctors & staff",
      "Unlimited patients",
      "All Professional features",
      "Multi-branch management",
      "Custom branding & domain",
      "PACS & Machine Integration",
      "Blood Bank & Dialysis",
      "Theatre & Operation Suite",
      "Executive Dashboard",
      "Advanced AI & Analytics",
      "SSO & Active Directory",
      "Dedicated Account Manager",
      "24/7 Premium Support",
      "SLA Guarantee (99.99%)",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Simple, Transparent Pricing
          </div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Choose the Plan That{" "}
            <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Fits Your Hospital</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            All plans include a 30-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border ${plan.popular
                    ? "border-violet-300 shadow-2xl shadow-violet-100 scale-105"
                    : "border-slate-200 shadow-sm"
                  } bg-white overflow-hidden`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-violet-600 to-emerald-600 text-center py-2">
                    <span className="text-xs font-bold text-white tracking-widest uppercase">Most Popular</span>
                  </div>
                )}

                <div className="p-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4 shadow-md`}>
                    <Icon size={22} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mb-6">{plan.description}</p>

                  <div className="mb-8">
                    <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                    <span className="text-slate-500 ml-1">/{plan.period}</span>
                  </div>

                  <Link href="/auth/login">
                    <Button
                      size="lg"
                      className={`w-full ${plan.popular
                          ? "bg-gradient-to-r from-violet-600 to-emerald-600 border-0 shadow-lg shadow-violet-200"
                          : "bg-gradient-to-r from-slate-800 to-slate-700 border-0"
                        }`}
                    >
                      Start Free Trial
                    </Button>
                  </Link>

                  <div className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check size={10} className="text-white" />
                        </div>
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom plan */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Need a Custom Plan?</h3>
            <p className="text-slate-400 text-sm max-w-lg">
              Government hospitals, national health systems, and large multi-site organizations get custom pricing, deployment, and dedicated implementation support.
            </p>
          </div>
          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 flex-shrink-0">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
