"use client";

import React, { useState } from "react";
import { 
  Pill, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Package, 
  X, 
  Printer, 
  ChevronRight,
  TrendingUp,
  FileText
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

// Initial Mock Inventory Data
const initialInventory = [
  { id: "MED-001", name: "Amoxicillin 500mg", category: "Antibiotics", stock: 450, minStock: 100, price: "$12.50", expiry: "2026-11-15", batch: "BT-8842", status: "In Stock" },
  { id: "MED-002", name: "Paracetamol 1000mg", category: "Analgesics", stock: 1200, minStock: 200, price: "$4.00", expiry: "2027-03-20", batch: "BT-9011", status: "In Stock" },
  { id: "MED-003", name: "Insulin Glargine 100U/ml", category: "Chronic Care", stock: 18, minStock: 30, price: "$65.00", expiry: "2025-09-01", batch: "BT-3321", status: "Low Stock" },
  { id: "MED-004", name: "Metformin 850mg", category: "Chronic Care", stock: 680, minStock: 150, price: "$8.20", expiry: "2026-08-10", batch: "BT-4512", status: "In Stock" },
  { id: "MED-005", name: "Epinephrine 1mg/ml", category: "Emergency", stock: 8, minStock: 25, price: "$35.00", expiry: "2025-06-30", batch: "BT-1109", status: "Critical Low" },
  { id: "MED-006", name: "Omeprazole 20mg", category: "Gastroenterology", stock: 520, minStock: 100, price: "$15.00", expiry: "2026-12-05", batch: "BT-7734", status: "In Stock" },
  { id: "MED-007", name: "Ciprofloxacin 500mg", category: "Antibiotics", stock: 95, minStock: 100, price: "$18.00", expiry: "2026-04-18", batch: "BT-6621", status: "Low Stock" },
];

export default function PharmacyPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all", "low_stock", "emergency"
  const [selectedMed, setSelectedMed] = useState<typeof initialInventory[0] | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDispenseModal, setShowDispenseModal] = useState(false);

  // New Med Form State
  const [newMed, setNewMed] = useState({
    name: "",
    category: "Antibiotics",
    stock: "",
    minStock: "50",
    price: "",
    expiry: "",
    batch: "",
  });

  // Dispense Form State
  const [dispenseForm, setDispenseForm] = useState({
    patientName: "",
    patientId: "",
    quantity: "1",
    instructions: "1 tablet after meals twice daily",
  });

  // Filtered Items
  const filtered = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.id.toLowerCase().includes(search.toLowerCase()) ||
                          item.category.toLowerCase().includes(search.toLowerCase()) ||
                          item.batch.toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === "low_stock") return matchesSearch && (item.status === "Low Stock" || item.status === "Critical Low");
    if (activeTab === "emergency") return matchesSearch && item.category === "Emergency";
    return matchesSearch;
  });

  // Handle Add New Drug
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.name) return;

    const stockNum = parseInt(newMed.stock) || 0;
    const minNum = parseInt(newMed.minStock) || 50;
    let status = "In Stock";
    if (stockNum <= minNum / 2) status = "Critical Low";
    else if (stockNum <= minNum) status = "Low Stock";

    const item = {
      id: `MED-${Math.floor(100 + Math.random() * 900)}`,
      name: newMed.name,
      category: newMed.category,
      stock: stockNum,
      minStock: minNum,
      price: newMed.price.startsWith("$") ? newMed.price : `$${newMed.price || "10.00"}`,
      expiry: newMed.expiry || "2027-01-01",
      batch: newMed.batch || `BT-${Math.floor(1000 + Math.random() * 9000)}`,
      status,
    };

    setInventory([item, ...inventory]);
    setShowAddModal(false);
    setNewMed({ name: "", category: "Antibiotics", stock: "", minStock: "50", price: "", expiry: "", batch: "" });
  };

  // Handle Dispense Medication
  const handleDispenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMed) return;

    const qty = parseInt(dispenseForm.quantity) || 1;
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === selectedMed.id) {
          const newStock = Math.max(0, item.stock - qty);
          let newStatus = item.status;
          if (newStock <= item.minStock / 2) newStatus = "Critical Low";
          else if (newStock <= item.minStock) newStatus = "Low Stock";
          return { ...item, stock: newStock, status: newStatus };
        }
        return item;
      })
    );

    setShowDispenseModal(false);
    setDispenseForm({ patientName: "", patientId: "", quantity: "1", instructions: "1 tablet after meals twice daily" });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Pill className="text-teal-600" size={26} /> Pharmacy & Medication Management
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor drug inventory, dispense prescriptions, and track stock replenishment.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="md" 
            icon={<Plus size={16} />} 
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-teal-600 to-emerald-600 border-0 shadow-md shadow-teal-100 text-white font-semibold"
          >
            Add New Medication
          </Button>
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total SKU Items", value: inventory.length, sub: "Active Inventory", color: "text-slate-900", bg: "bg-white", icon: Package },
          { label: "Low Stock Alerts", value: inventory.filter(i => i.status !== "In Stock").length, sub: "Requires Reorder", color: "text-amber-600", bg: "bg-amber-50/40", icon: AlertTriangle },
          { label: "Dispensed Today", value: "142 Prescriptions", sub: "$3,420 Revenue", color: "text-teal-600", bg: "bg-teal-50/40", icon: CheckCircle },
          { label: "Critical Shortage", value: inventory.filter(i => i.status === "Critical Low").length, sub: "Immediate Action", color: "text-rose-600", bg: "bg-rose-50/40", icon: Clock },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.bg} p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between`}>
              <div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                <div className={`text-xl font-extrabold ${stat.color} mt-0.5`}>{stat.value}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{stat.sub}</div>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-slate-100 shadow-2xs">
                <Icon size={18} className={stat.color} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Inventory Table Card */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" />
              <input
                type="text"
                placeholder="Search medication, batch #, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: "38px" }}
                className="w-full pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-50"
              />
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${activeTab === "all" ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                All Items
              </button>
              <button 
                onClick={() => setActiveTab("low_stock")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${activeTab === "low_stock" ? "bg-amber-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                Low Stock ({inventory.filter(i => i.status !== "In Stock").length})
              </button>
              <button 
                onClick={() => setActiveTab("emergency")}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${activeTab === "emergency" ? "bg-rose-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                Emergency Supplies
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Medication Name</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">SKU / Batch</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Stock Level</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Expiry</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                      No medication records matching &ldquo;{search}&rdquo;
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr 
                      key={item.id} 
                      onClick={() => setSelectedMed(item)}
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${selectedMed?.id === item.id ? "bg-teal-50/60" : ""}`}
                    >
                      <td className="px-4 py-3.5 font-bold text-slate-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-500">
                        {item.id} · <span className="text-slate-400">{item.batch}</span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 font-medium">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-slate-800">
                        {item.stock} units
                      </td>
                      <td className="px-4 py-3.5 font-bold text-teal-700">{item.price}</td>
                      <td className="px-4 py-3.5 text-xs text-slate-500">{item.expiry}</td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                          item.status === "In Stock" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                          item.status === "Low Stock" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                          "bg-rose-50 text-rose-700 border border-rose-200 animate-pulse"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMed(item);
                            setShowDispenseModal(true);
                          }}
                          className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-2xs"
                        >
                          Dispense
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Drug Side Details Panel */}
        {selectedMed && (
          <div className="w-full lg:w-80 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex-shrink-0 animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Medication Profile</span>
              <button onClick={() => setSelectedMed(null)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">&times;</button>
            </div>

            <div className="text-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mx-auto mb-2 shadow-xs">
                <Pill size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900">{selectedMed.name}</h3>
              <p className="text-xs text-slate-500">{selectedMed.id} · {selectedMed.category}</p>
            </div>

            <div className="space-y-3 text-xs border-t border-b border-slate-100 py-3 mb-4">
              <div className="flex justify-between text-slate-600">
                <span>Unit Price:</span>
                <span className="font-bold text-slate-900">{selectedMed.price}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Available Stock:</span>
                <span className="font-bold text-slate-900">{selectedMed.stock} units</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Min Threshold:</span>
                <span className="font-bold text-slate-900">{selectedMed.minStock} units</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Batch Number:</span>
                <span className="font-mono text-slate-800">{selectedMed.batch}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Expiry Date:</span>
                <span className="font-semibold text-slate-800">{selectedMed.expiry}</span>
              </div>
            </div>

            <Button 
              size="sm" 
              onClick={() => setShowDispenseModal(true)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-sm"
              icon={<FileText size={14} />}
            >
              Dispense Prescription
            </Button>
          </div>
        )}
      </div>

      {/* MODAL 1: Add New Medication */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add New Medication</h3>
                <p className="text-xs text-slate-500">Restock or add new drug SKU to inventory</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Medication Name & Strength *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Azithromycin 250mg"
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select 
                    value={newMed.category}
                    onChange={(e) => setNewMed({ ...newMed, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                  >
                    {["Antibiotics", "Analgesics", "Chronic Care", "Emergency", "Gastroenterology", "Pediatrics"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Unit Price ($)</label>
                  <input 
                    type="text" 
                    placeholder="15.00"
                    value={newMed.price}
                    onChange={(e) => setNewMed({ ...newMed, price: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Initial Quantity</label>
                  <input 
                    type="number" 
                    placeholder="500"
                    value={newMed.stock}
                    onChange={(e) => setNewMed({ ...newMed, stock: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Min Threshold</label>
                  <input 
                    type="number" 
                    placeholder="50"
                    value={newMed.minStock}
                    onChange={(e) => setNewMed({ ...newMed, minStock: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Batch Number</label>
                  <input 
                    type="text" 
                    placeholder="BT-9901"
                    value={newMed.batch}
                    onChange={(e) => setNewMed({ ...newMed, batch: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                  <input 
                    type="date" 
                    value={newMed.expiry}
                    onChange={(e) => setNewMed({ ...newMed, expiry: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <Button variant="outline" size="sm" className="flex-1" type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white" type="submit">
                  Save SKU
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Dispense Prescription */}
      {showDispenseModal && selectedMed && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Dispense Medication</h3>
                <p className="text-xs text-slate-500">Record patient prescription & update stock</p>
              </div>
              <button onClick={() => setShowDispenseModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">{selectedMed.name}</div>
                <div className="text-[11px] text-slate-500">Stock: {selectedMed.stock} units available</div>
              </div>
              <div className="text-sm font-extrabold text-teal-700">{selectedMed.price}</div>
            </div>

            <form onSubmit={handleDispenseSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name / ID *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Kwame Mensah (PAT-1082)"
                  value={dispenseForm.patientName}
                  onChange={(e) => setDispenseForm({ ...dispenseForm, patientName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quantity Dispensed</label>
                <input 
                  type="number" 
                  min="1"
                  max={selectedMed.stock}
                  required
                  value={dispenseForm.quantity}
                  onChange={(e) => setDispenseForm({ ...dispenseForm, quantity: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dosage & Usage Instructions</label>
                <textarea 
                  rows={2}
                  value={dispenseForm.instructions}
                  onChange={(e) => setDispenseForm({ ...dispenseForm, instructions: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <Button variant="outline" size="sm" className="flex-1" type="button" onClick={() => setShowDispenseModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white" type="submit">
                  Dispense & Print Receipt
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
