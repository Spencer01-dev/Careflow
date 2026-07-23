"use client";

import React, { useState } from "react";
import { 
  CreditCard, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  X, 
  Printer, 
  ChevronRight,
  Receipt,
  User,
  ShieldCheck
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

// Initial Mock Invoice Data
const initialInvoices = [
  { id: "INV-2025-001", patient: "Kwame Mensah", patientId: "PAT-1082", items: "Consultation + CBC Lab Test", amount: 185.00, method: "Mobile Money (MTN)", date: "2025-01-16", status: "Paid" },
  { id: "INV-2025-002", patient: "Ama Boateng", patientId: "PAT-1094", items: "Ward 3 Admission (3 Days) + IV Drip", amount: 620.00, method: "National Insurance (NHIS)", date: "2025-01-16", status: "Claim Pending" },
  { id: "INV-2025-003", patient: "Kofi Owusu", patientId: "PAT-1102", items: "Emergency Triage + X-Ray Scan", amount: 340.00, method: "Credit Card (Visa)", date: "2025-01-15", status: "Paid" },
  { id: "INV-2025-004", patient: "Abena Serwaa", patientId: "PAT-1115", items: "Cardiology ECG + Amoxicillin", amount: 150.00, method: "Pending Cash", date: "2025-01-15", status: "Unpaid" },
  { id: "INV-2025-005", patient: "Emmanuel Addo", patientId: "PAT-1120", items: "Ultrasound Scan + Blood Panel", amount: 290.00, method: "Private Insurance (Enterprise)", date: "2025-01-14", status: "Claim Pending" },
  { id: "INV-2025-006", patient: "Grace Kwarteng", patientId: "PAT-1132", items: "Outpatient Consultation", amount: 75.00, method: "Cash", date: "2025-01-14", status: "Paid" },
];

export default function BillingPage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all", "paid", "unpaid", "claims"
  const [selectedInvoice, setSelectedInvoice] = useState<typeof initialInvoices[0] | null>(null);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Create Invoice Form State
  const [invoiceForm, setInvoiceForm] = useState({
    patient: "",
    patientId: "",
    consultationFee: "50",
    labFee: "0",
    pharmacyFee: "0",
    wardFee: "0",
    method: "Mobile Money (MTN)",
    isInsurance: false,
  });

  // Filtered Invoices
  const filtered = invoices.filter((inv) => {
    const matchesSearch = inv.patient.toLowerCase().includes(search.toLowerCase()) ||
                          inv.id.toLowerCase().includes(search.toLowerCase()) ||
                          inv.patientId.toLowerCase().includes(search.toLowerCase()) ||
                          inv.items.toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === "paid") return matchesSearch && inv.status === "Paid";
    if (activeTab === "unpaid") return matchesSearch && inv.status === "Unpaid";
    if (activeTab === "claims") return matchesSearch && inv.status === "Claim Pending";
    return matchesSearch;
  });

  // Handle Create Invoice
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceForm.patient) return;

    const total = (parseFloat(invoiceForm.consultationFee) || 0) +
                  (parseFloat(invoiceForm.labFee) || 0) +
                  (parseFloat(invoiceForm.pharmacyFee) || 0) +
                  (parseFloat(invoiceForm.wardFee) || 0);

    const itemsArr = [];
    if (parseFloat(invoiceForm.consultationFee) > 0) itemsArr.push("Consultation");
    if (parseFloat(invoiceForm.labFee) > 0) itemsArr.push("Lab Test");
    if (parseFloat(invoiceForm.pharmacyFee) > 0) itemsArr.push("Pharmacy");
    if (parseFloat(invoiceForm.wardFee) > 0) itemsArr.push("Ward Stay");

    const newInv = {
      id: `INV-2025-${Math.floor(100 + Math.random() * 900)}`,
      patient: invoiceForm.patient,
      patientId: invoiceForm.patientId || `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      items: itemsArr.join(" + ") || "General Medical Services",
      amount: total,
      method: invoiceForm.isInsurance ? "National Insurance (NHIS)" : invoiceForm.method,
      date: new Date().toISOString().split("T")[0],
      status: invoiceForm.isInsurance ? "Claim Pending" : "Paid",
    };

    setInvoices([newInv, ...invoices]);
    setShowCreateModal(false);
    setInvoiceForm({ patient: "", patientId: "", consultationFee: "50", labFee: "0", pharmacyFee: "0", wardFee: "0", method: "Mobile Money (MTN)", isInsurance: false });
  };

  // Handle Mark as Paid
  const handleMarkPaid = (id: string) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: "Paid" } : inv));
    if (selectedInvoice && selectedInvoice.id === id) {
      setSelectedInvoice(prev => prev ? { ...prev, status: "Paid" } : null);
    }
  };

  const totalCollected = invoices.filter(i => i.status === "Paid").reduce((acc, i) => acc + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "Unpaid").reduce((acc, i) => acc + i.amount, 0);
  const totalClaims = invoices.filter(i => i.status === "Claim Pending").reduce((acc, i) => acc + i.amount, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="text-emerald-600" size={26} /> Patient Billing & Claims
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Process invoices, manage insurance claims, and track revenue collections.
          </p>
        </div>
        <Button 
          size="md" 
          icon={<Plus size={16} />} 
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 border-0 shadow-md shadow-emerald-100 text-white font-semibold"
        >
          Create New Invoice
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Revenue Paid", value: `$${totalCollected.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, sub: "Collected Today", color: "text-emerald-600", bg: "bg-emerald-50/40", icon: CheckCircle },
          { label: "Unpaid Invoices", value: `$${totalPending.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, sub: "Pending Collections", color: "text-amber-600", bg: "bg-amber-50/40", icon: Clock },
          { label: "Insurance Claims", value: `$${totalClaims.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, sub: "Awaiting NHIS Approval", color: "text-indigo-600", bg: "bg-indigo-50/40", icon: ShieldCheck },
          { label: "Total Invoices", value: invoices.length, sub: "Recorded Invoices", color: "text-slate-900", bg: "bg-white", icon: Receipt },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`${card.bg} p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between`}>
              <div>
                <div className="text-xs text-slate-500 font-medium">{card.label}</div>
                <div className={`text-xl font-extrabold ${card.color} mt-0.5`}>{card.value}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{card.sub}</div>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-slate-100 shadow-2xs">
                <Icon size={18} className={card.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Table Card */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" />
              <input
                type="text"
                placeholder="Search patient, invoice #, or service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: "38px" }}
                className="w-full pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50"
              />
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${activeTab === "all" ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                All Invoices
              </button>
              <button 
                onClick={() => setActiveTab("paid")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${activeTab === "paid" ? "bg-emerald-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                Paid
              </button>
              <button 
                onClick={() => setActiveTab("unpaid")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${activeTab === "unpaid" ? "bg-amber-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                Unpaid
              </button>
              <button 
                onClick={() => setActiveTab("claims")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${activeTab === "claims" ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                Insurance Claims
              </button>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Invoice #</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Patient Name</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Services Rendered</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Total Amount</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Payment Method</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                      No invoices found matching &ldquo;{search}&rdquo;
                    </td>
                  </tr>
                ) : (
                  filtered.map((inv) => (
                    <tr 
                      key={inv.id}
                      onClick={() => setSelectedInvoice(inv)}
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${selectedInvoice?.id === inv.id ? "bg-emerald-50/60" : ""}`}
                    >
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-slate-800">
                        {inv.id}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-slate-900">
                        {inv.patient}
                        <div className="text-xs text-slate-400 font-mono font-normal">{inv.patientId}</div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600 font-medium">
                        {inv.items}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-slate-900">
                        ${inv.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 font-medium">
                        {inv.method}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500">{inv.date}</td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                          inv.status === "Paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                          inv.status === "Unpaid" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                          "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        {inv.status === "Unpaid" ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkPaid(inv.id);
                            }}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-2xs"
                          >
                            Mark Paid
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInvoice(inv);
                              setShowReceiptModal(true);
                            }}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold"
                          >
                            Receipt
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Invoice Details Side Panel */}
        {selectedInvoice && (
          <div className="w-full lg:w-80 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex-shrink-0 animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice Summary</span>
              <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">&times;</button>
            </div>

            <div className="text-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-2 shadow-xs">
                <Receipt size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900">{selectedInvoice.patient}</h3>
              <p className="text-xs text-slate-500">{selectedInvoice.id} · {selectedInvoice.patientId}</p>
            </div>

            <div className="space-y-3 text-xs border-t border-b border-slate-100 py-3 mb-4">
              <div className="flex justify-between text-slate-600">
                <span>Items:</span>
                <span className="font-semibold text-slate-800 text-right">{selectedInvoice.items}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Method:</span>
                <span className="font-semibold text-slate-800">{selectedInvoice.method}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Billing Date:</span>
                <span className="font-semibold text-slate-800">{selectedInvoice.date}</span>
              </div>
              <div className="flex justify-between items-center text-slate-900 pt-2 border-t border-slate-100 font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-emerald-600">${selectedInvoice.amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              {selectedInvoice.status === "Unpaid" && (
                <Button 
                  size="sm" 
                  onClick={() => handleMarkPaid(selectedInvoice.id)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
                  icon={<CheckCircle size={14} />}
                >
                  Confirm Cash Payment
                </Button>
              )}

              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowReceiptModal(true)}
                className="w-full border-slate-200 text-slate-700"
                icon={<Printer size={14} />}
              >
                Print Official Receipt
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: Create New Invoice */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Create Patient Invoice</h3>
                <p className="text-xs text-slate-500">Generate itemized billing for services rendered</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Kwame Mensah"
                  value={invoiceForm.patient}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, patient: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Consultation ($)</label>
                  <input 
                    type="number" 
                    value={invoiceForm.consultationFee}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, consultationFee: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lab Tests ($)</label>
                  <input 
                    type="number" 
                    value={invoiceForm.labFee}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, labFee: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pharmacy / Meds ($)</label>
                  <input 
                    type="number" 
                    value={invoiceForm.pharmacyFee}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, pharmacyFee: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ward / Bed Stay ($)</label>
                  <input 
                    type="number" 
                    value={invoiceForm.wardFee}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, wardFee: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Channel</label>
                <select 
                  value={invoiceForm.method}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, method: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                >
                  <option value="Mobile Money (MTN)">Mobile Money (MTN / Telecel)</option>
                  <option value="Credit Card (Visa)">Credit Card (Visa / Mastercard)</option>
                  <option value="Cash">Cash at Counter</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox" 
                  id="insurance_check"
                  checked={invoiceForm.isInsurance}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, isInsurance: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="insurance_check" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Submit as National Health Insurance (NHIS) Claim
                </label>
              </div>

              <div className="pt-3 flex gap-3">
                <Button variant="outline" size="sm" className="flex-1" type="button" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" type="submit">
                  Generate Invoice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Printable Receipt */}
      {showReceiptModal && selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative text-center animate-in zoom-in-95 duration-150">
            <button onClick={() => setShowReceiptModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100">
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 font-bold">
              <Receipt size={24} />
            </div>

            <h3 className="text-base font-bold text-slate-900">CAREFLOW HEALTHCARE</h3>
            <p className="text-xs text-slate-500">Official Payment Receipt</p>

            <div className="my-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-left space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Invoice:</span>
                <span className="font-bold text-slate-800">{selectedInvoice.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Patient:</span>
                <span className="font-bold text-slate-800">{selectedInvoice.patient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Method:</span>
                <span className="text-slate-700">{selectedInvoice.method}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm text-slate-900 font-sans">
                <span>Total Paid:</span>
                <span className="text-emerald-600">${selectedInvoice.amount.toFixed(2)}</span>
              </div>
            </div>

            <Button size="sm" onClick={() => window.print()} className="w-full bg-slate-900 hover:bg-slate-800 text-white" icon={<Printer size={14} />}>
              Print Official Copy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
