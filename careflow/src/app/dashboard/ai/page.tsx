"use client";
import { useState } from "react";
import { Brain, Send, Mic, ChevronRight, AlertTriangle, CheckCircle2, FlaskConical, Pill, Stethoscope, Sparkles, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const suggestions = [
  "Suggest diagnosis for fever, headache, and joint pain",
  "Check drug interactions for Metformin + Lisinopril",
  "Interpret CBC results for Patient P-9001",
  "Generate SOAP note for consultation",
  "Dosage recommendation for pediatric patient (8kg)",
];

const demoMessages = [
  {
    role: "assistant",
    content: "Hello, Dr. Rashid! I'm your CareFlow AI Medical Assistant. I can help you with:\n\n• **Diagnostic suggestions** based on symptoms\n• **Drug interaction checks**\n• **Lab result interpretation**\n• **Clinical note generation**\n• **ICD-10 / CPT coding assistance**\n• **Treatment plan recommendations**\n\nHow can I assist you today?",
    time: "09:00",
  },
  {
    role: "user",
    content: "Patient presents with fever (39.2°C), severe headache, neck stiffness, and photophobia for 2 days. What could this be?",
    time: "09:12",
  },
  {
    role: "assistant",
    content: null,
    structured: {
      type: "diagnosis",
      title: "Differential Diagnosis",
      items: [
        { label: "Bacterial Meningitis", confidence: 87, severity: "Critical", urgent: true },
        { label: "Viral Meningitis", confidence: 72, severity: "Moderate", urgent: true },
        { label: "Subarachnoid Hemorrhage", confidence: 45, severity: "Critical", urgent: true },
        { label: "Severe Migraine", confidence: 28, severity: "Mild", urgent: false },
      ],
      recommendation: "Immediate LP (Lumbar Puncture) is strongly recommended. Empirical antibiotics (Ceftriaxone 2g IV) should be initiated immediately pending CSF results. CT head before LP if focal neuro signs present.",
      warning: "⚠️ This presentation is CRITICAL. Do not delay treatment.",
    },
    time: "09:12",
  },
];

function AssistantMessage({ msg }: { msg: typeof demoMessages[0] }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md">
          <p className="text-sm leading-relaxed">{msg.content}</p>
          <span className="text-[10px] text-emerald-200 mt-1 block text-right">{msg.time}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
        <Brain size={14} className="text-white" />
      </div>
      <div className="flex-1 max-w-[85%]">
        {msg.content && (
          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 border border-slate-100 shadow-sm">
            <div
              className="text-sm text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: msg.content
                  .replace(/\n/g, "<br/>")
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/^•/gm, "&bull;"),
              }}
            />
            <span className="text-[10px] text-slate-400 mt-2 block">{msg.time}</span>
          </div>
        )}
        {msg.structured?.type === "diagnosis" && (
          <div className="bg-white rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-violet-600 to-emerald-600 px-4 py-3 flex items-center gap-2">
              <Sparkles size={14} className="text-white" />
              <span className="text-sm font-bold text-white">{msg.structured.title}</span>
            </div>
            <div className="p-4 space-y-3">
              {msg.structured.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                      {item.urgent && <Badge variant="error" size="sm">Urgent</Badge>}
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-slate-900">{item.confidence}%</div>
                    <div className="text-[10px] text-slate-500">{item.severity}</div>
                  </div>
                </div>
              ))}

              {msg.structured.warning && (
                <div className="flex items-start gap-2 p-3 bg-red-50 rounded-xl border border-red-100">
                  <AlertTriangle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700 font-semibold">{msg.structured.warning}</p>
                </div>
              )}

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700">Recommended Action</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{msg.structured.recommendation}</p>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 px-4 pb-3 block">{msg.time}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(demoMessages);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) },
      {
        role: "assistant",
        content: "I'm analyzing your query... In a production environment, I would connect to our clinical AI engine to provide evidence-based recommendations. This demo shows the interface capability.",
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-slate-100 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-600 flex items-center justify-center">
              <Brain size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">AI Medical Assistant</h2>
              <p className="text-[10px] text-slate-500">Powered by CareFlow AI</p>
            </div>
          </div>
          <Button size="sm" className="w-full bg-gradient-to-r from-violet-600 to-emerald-600 border-0 text-xs" icon={<Sparkles size={12} />}>
            New Consultation
          </Button>
        </div>

        <div className="p-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Quick Actions</p>
          <div className="space-y-1.5">
            {[
              { icon: Stethoscope, label: "Diagnose Symptoms", color: "text-emerald-500" },
              { icon: Pill, label: "Drug Interaction Check", color: "text-teal-500" },
              { icon: FlaskConical, label: "Interpret Lab Results", color: "text-violet-500" },
              { icon: CheckCircle2, label: "Generate Clinical Notes", color: "text-green-500" },
              { icon: AlertTriangle, label: "Allergy Warning Check", color: "text-amber-500" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 text-left transition-colors group">
                  <Icon size={14} className={item.color} />
                  <span className="text-xs text-slate-700 group-hover:text-slate-900">{item.label}</span>
                  <ChevronRight size={11} className="ml-auto text-slate-300" />
                </button>
              );
            })}
          </div>

          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-6 mb-3">Suggested Queries</p>
          <div className="space-y-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="w-full text-left text-[11px] text-slate-600 px-3 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-transparent hover:border-emerald-100"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-slate-100">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
              ⚕️ AI suggestions are clinical decision <strong>support tools</strong>, not replacements for physician judgment.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-800">Active Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success" dot>AI Ready</Badge>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg, i) => (
            <AssistantMessage key={i} msg={msg as typeof demoMessages[0]} />
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-slate-100 p-4 flex-shrink-0">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Describe symptoms, ask about drugs, request a clinical note..."
                rows={2}
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 resize-none focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-50 bg-slate-50"
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                  <Mic size={14} />
                </button>
              </div>
            </div>
            <Button
              onClick={handleSend}
              size="md"
              disabled={!input.trim()}
              className="bg-gradient-to-r from-violet-600 to-emerald-600 border-0 shadow-md px-4 self-end"
              icon={<Send size={15} />}
              iconPosition="right"
            >
              Send
            </Button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-center">
            CareFlow AI · Evidence-based clinical decision support · Always consult guidelines
          </p>
        </div>
      </div>
    </div>
  );
}
