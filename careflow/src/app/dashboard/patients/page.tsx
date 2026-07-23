"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Search, Plus, Filter, Download, MoreHorizontal, QrCode, Phone, MapPin, 
  Calendar, ChevronRight, Users, X, Printer, Share2, FileText, Activity, 
  Pill, AlertCircle, Check 
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const initialPatients = [
  { id: "P-9001", name: "Sarah Mensah", age: 34, gender: "F", blood: "O+", dept: "Cardiology", doctor: "Dr. Rashid A.", status: "Admitted", phone: "+233 24 555 0101", location: "Ward 3, Bed 12", registered: "2025-01-15", avatar: "SM", color: "from-emerald-500 to-teal-500", conditions: ["Hypertension", "Diabetes"] },
  { id: "P-9002", name: "James Kofi", age: 52, gender: "M", blood: "A-", dept: "Emergency", doctor: "Dr. Ama B.", status: "Critical", phone: "+233 20 555 0202", location: "ICU Room 3", registered: "2025-01-16", avatar: "JK", color: "from-red-500 to-rose-500", conditions: ["Chest Pain", "Arrhythmia"] },
  { id: "P-9003", name: "Grace Amara", age: 28, gender: "F", blood: "B+", dept: "Maternity", doctor: "Dr. Clara M.", status: "Stable", phone: "+233 50 555 0303", location: "Maternity Ward 1", registered: "2025-01-16", avatar: "GA", color: "from-pink-500 to-rose-400", conditions: ["Pregnancy – 38 weeks"] },
  { id: "P-9004", name: "David Osei", age: 67, gender: "M", blood: "AB+", dept: "Orthopedics", doctor: "Dr. Kweku F.", status: "Discharged", phone: "+233 27 555 0404", location: "Outpatient", registered: "2025-01-14", avatar: "DO", color: "from-green-500 to-teal-500", conditions: ["Knee Replacement Recovery"] },
  { id: "P-9005", name: "Fatima Al-Said", age: 41, gender: "F", blood: "O-", dept: "Radiology", doctor: "Dr. Ibrahim S.", status: "In Progress", phone: "+233 26 555 0505", location: "Radiology Suite", registered: "2025-01-16", avatar: "FA", color: "from-violet-500 to-purple-500", conditions: ["Suspected Tumor", "Headaches"] },
  { id: "P-9006", name: "Emmanuel Boateng", age: 23, gender: "M", blood: "A+", dept: "Pediatrics", doctor: "Dr. Nana A.", status: "Admitted", phone: "+233 24 555 0606", location: "Ward 7, Bed 3", registered: "2025-01-15", avatar: "EB", color: "from-amber-500 to-orange-500", conditions: ["Malaria", "Anemia"] },
  { id: "P-9007", name: "Mary Asante", age: 58, gender: "F", blood: "B-", dept: "Nephrology", doctor: "Dr. Kwame O.", status: "Stable", phone: "+233 20 555 0707", location: "Ward 5, Bed 8", registered: "2025-01-12", avatar: "MA", color: "from-indigo-500 to-emerald-500", conditions: ["Kidney Disease Stage 3"] },
  { id: "P-9008", name: "Kwesi Mensah", age: 44, gender: "M", blood: "O+", dept: "Neurology", doctor: "Dr. Esi A.", status: "Admitted", phone: "+233 24 555 0808", location: "Ward 4, Bed 6", registered: "2025-01-13", avatar: "KM", color: "from-cyan-500 to-teal-500", conditions: ["Stroke", "Hypertension"] },
];

const statusMap: Record<string, "success" | "error" | "warning" | "info" | "default"> = {
  Admitted: "info",
  Critical: "error",
  Stable: "success",
  Discharged: "default",
  "In Progress": "warning",
};

function PatientsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [patientList, setPatientList] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof initialPatients[0] | null>(null);

  // Modals
  const [showQRModal, setShowQRModal] = useState(false);
  const [showFullRecordModal, setShowFullRecordModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Registration Form State
  const [regForm, setRegForm] = useState({
    name: "",
    age: "",
    gender: "M",
    blood: "O+",
    dept: "Cardiology",
    doctor: "Dr. Rashid A.",
    phone: "",
    admissionType: "Admitted", // "Admitted", "Outpatient", "Critical"
    ward: "Ward 3",
    bed: "Bed 12",
    location: "Ward 3, Bed 12",
    conditions: "",
  });

  // Handle Admission Status Change for existing patient
  const handleStatusChange = (patientId: string, newStatus: string, newLocation?: string) => {
    setPatientList((prev) =>
      prev.map((p) =>
        p.id === patientId
          ? { ...p, status: newStatus, location: newLocation || (newStatus === "Outpatient" ? "Outpatient" : p.location) }
          : p
      )
    );
    if (selected && selected.id === patientId) {
      setSelected((prev) =>
        prev
          ? { ...prev, status: newStatus, location: newLocation || (newStatus === "Outpatient" ? "Outpatient" : prev.location) }
          : null
      );
    }
  };


  // Pre-fill search from URL query param ?q=
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams]);

  // Sync URL when search changes
  const handleSearchChange = (val: string) => {
    setSearch(val);
    if (val.trim()) {
      router.replace(`/dashboard/patients?q=${encodeURIComponent(val.trim())}`, { scroll: false });
    } else {
      router.replace(`/dashboard/patients`, { scroll: false });
    }
  };

  const filtered = patientList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.dept.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Export CSV
  const handleExportCSV = () => {
    const headers = ["ID,Name,Age,Gender,Blood,Department,Doctor,Status,Phone,Location,Registered"];
    const rows = patientList.map(
      (p) => `${p.id},"${p.name}",${p.age},${p.gender},${p.blood},${p.dept},"${p.doctor}",${p.status},"${p.phone}","${p.location}",${p.registered}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CareFlow_Patients_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle New Patient Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name || !regForm.age) return;

    const newId = `P-${9000 + patientList.length + 1}`;
    const initials = regForm.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const status = regForm.admissionType;
    let location = regForm.location;
    if (regForm.admissionType === "Outpatient") {
      location = "Outpatient Clinic OPD";
    } else if (regForm.admissionType === "Critical") {
      location = "ICU Emergency Bed 1";
    } else {
      location = `${regForm.ward}, ${regForm.bed}`;
    }

    const newPatient = {
      id: newId,
      name: regForm.name,
      age: parseInt(regForm.age) || 30,
      gender: regForm.gender,
      blood: regForm.blood,
      dept: regForm.dept,
      doctor: regForm.doctor,
      status: status,
      phone: regForm.phone || "+233 24 000 0000",
      location: location,
      registered: new Date().toISOString().split("T")[0],
      avatar: initials || "NP",
      color: status === "Critical" ? "from-red-500 to-rose-500" : status === "Outpatient" ? "from-blue-500 to-indigo-500" : "from-emerald-500 to-teal-500",
      conditions: regForm.conditions ? regForm.conditions.split(",").map((c) => c.trim()) : ["Observation"],
    };

    setPatientList([newPatient, ...patientList]);
    setSelected(newPatient);
    setShowRegisterModal(false);
    setRegForm({
      name: "",
      age: "",
      gender: "M",
      blood: "O+",
      dept: "Cardiology",
      doctor: "Dr. Rashid A.",
      phone: "",
      admissionType: "Admitted",
      ward: "Ward 3",
      bed: "Bed 12",
      location: "Ward 3, Bed 12",
      conditions: "",
    });
  };


  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patients Directory</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage patient admissions, records, and emergency badges.</p>
        </div>
        <Button 
          size="md" 
          icon={<Plus size={16} />} 
          onClick={() => setShowRegisterModal(true)}
          className="bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 shadow-md shadow-emerald-100"
        >
          Register New Patient
        </Button>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Total Patients", value: patientList.length, color: "text-slate-900", bg: "bg-white" },
          { label: "Admitted", value: patientList.filter(p => p.status === "Admitted").length, color: "text-emerald-600", bg: "bg-emerald-50/40" },
          { label: "Critical Care", value: patientList.filter(p => p.status === "Critical").length, color: "text-red-600", bg: "bg-red-50/40" },
          { label: "Discharged", value: patientList.filter(p => p.status === "Discharged").length, color: "text-slate-600", bg: "bg-slate-50" },
          { label: "Stable", value: patientList.filter(p => p.status === "Stable").length, color: "text-teal-600", bg: "bg-teal-50/40" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} p-4 rounded-2xl border border-slate-200/80 shadow-xs`}>
            <div className="text-xs text-slate-500 font-medium">{s.label}</div>
            <div className={`text-xl font-extrabold ${s.color} mt-1`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Main Section: Table + Details Split View */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Patient Table Card */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" />
              <input
                type="text"
                placeholder="Search patients by name, ID or department..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                style={{ paddingLeft: "38px" }}
                className="w-full pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                icon={<Plus size={13} />} 
                onClick={() => setShowRegisterModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
              >
                Register Patient
              </Button>
              <Button variant="outline" size="sm" icon={<Filter size={13} />}>Filter</Button>
              <Button variant="outline" size="sm" icon={<Download size={13} />} onClick={handleExportCSV}>Export CSV</Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Registered</th>
                  <th className="px-4 py-3.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-3 text-slate-400">
                        <Search size={36} className="text-slate-200" />
                        <p className="text-sm font-semibold text-slate-600">No patients found for &ldquo;{search}&rdquo;</p>
                        <p className="text-xs text-slate-400">Try searching for a different name, patient ID, or medical department.</p>
                        <button
                          onClick={() => handleSearchChange("")}
                          className="mt-1 text-xs text-emerald-600 hover:underline font-medium"
                        >
                          Clear Search
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => setSelected(p)}
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${selected?.id === p.id ? "bg-emerald-50/60" : ""}`}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-xs`}>
                            {p.avatar}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{p.name}</div>
                            <div className="text-xs text-slate-400">{p.age}y · {p.gender} · Blood {p.blood}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-500">{p.id}</td>
                      <td className="px-4 py-3.5 text-slate-700 font-medium">{p.dept}</td>
                      <td className="px-4 py-3.5 text-slate-600">{p.doctor}</td>
                      <td className="px-4 py-3.5">
                        <Badge variant={statusMap[p.status]} dot>{p.status}</Badge>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500">{p.registered}</td>
                      <td className="px-4 py-3.5 text-right">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patient Profile Side Drawer Card */}
        {selected && (
          <div className="w-full lg:w-80 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex-shrink-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Profile</span>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">&times;</button>
            </div>

            {/* Avatar & Info */}
            <div className="text-center mb-5">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-white text-xl font-bold mx-auto mb-3 shadow-lg`}>
                {selected.avatar}
              </div>
              <h2 className="text-base font-bold text-slate-900">{selected.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{selected.id} · {selected.dept}</p>
              <div className="flex justify-center mt-2">
                <Badge variant={statusMap[selected.status]} dot>{selected.status}</Badge>
              </div>
            </div>

            {/* Vitals Cards */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Age", value: `${selected.age}y` },
                  { label: "Gender", value: selected.gender === "M" ? "Male" : "Female" },
                  { label: "Blood", value: selected.blood },
                ].map((i) => (
                  <div key={i.label} className="bg-slate-50 rounded-xl p-2 border border-slate-100">
                    <div className="text-sm font-bold text-slate-800">{i.value}</div>
                    <div className="text-[10px] text-slate-400">{i.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                {[
                  { icon: Phone, label: selected.phone },
                  { icon: MapPin, label: selected.location },
                  { icon: Calendar, label: `Registered: ${selected.registered}` },
                  { icon: Users, label: selected.doctor },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2.5">
                      <Icon size={14} className="text-slate-400 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Diagnoses */}
              <div>
                <div className="text-xs font-bold text-slate-700 mb-1.5">Diagnoses</div>
                <div className="flex flex-wrap gap-1">
                  {selected.conditions.map((c) => (
                    <span key={c} className="text-[11px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg font-medium border border-emerald-100">{c}</span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                {selected.status === "Outpatient" ? (
                  <Button 
                    size="sm" 
                    onClick={() => handleStatusChange(selected.id, "Admitted", "Ward 1, Bed 1 (Newly Admitted)")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 border-0 shadow-sm text-white" 
                    icon={<Activity size={13} />} 
                  >
                    Admit to Ward
                  </Button>
                ) : selected.status === "Admitted" || selected.status === "Critical" ? (
                  <Button 
                    size="sm" 
                    onClick={() => handleStatusChange(selected.id, "Outpatient")}
                    className="w-full bg-slate-800 hover:bg-slate-900 border-0 shadow-sm text-white" 
                    icon={<MapPin size={13} />} 
                  >
                    Discharge Patient
                  </Button>
                ) : null}

                <Button 
                  size="sm" 
                  onClick={() => setShowFullRecordModal(true)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 shadow-sm" 
                  icon={<ChevronRight size={13} />} 
                  iconPosition="right"
                >
                  View Full Record
                </Button>

                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setShowQRModal(true)}
                  className="w-full border-slate-200 text-slate-700 hover:bg-slate-50" 
                  icon={<QrCode size={13} />}
                >
                  Generate QR Code
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: Full EMR Record Modal */}
      {showFullRecordModal && selected && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                  {selected.avatar}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selected.name} — Full EMR Record</h3>
                  <p className="text-xs text-slate-500">{selected.id} · {selected.dept} · Doctor: {selected.doctor}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowFullRecordModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
              {/* Vitals Summary */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Activity size={14} className="text-emerald-500" /> Current Vitals & Baseline
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Blood Pressure", val: "120/80 mmHg", status: "Normal" },
                    { label: "Heart Rate", val: "72 bpm", status: "Stable" },
                    { label: "Temperature", val: "36.8 °C", status: "Normal" },
                    { label: "Oxygen SpO2", val: "99%", status: "Optimal" },
                  ].map((v, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                      <div className="text-xs text-slate-500">{v.label}</div>
                      <div className="text-sm font-bold text-slate-900 mt-1">{v.val}</div>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {v.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnoses */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-amber-500" /> Primary Diagnoses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.conditions.map((c) => (
                    <span key={c} className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200/60 rounded-xl text-xs font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation Logs */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <FileText size={14} className="text-indigo-500" /> Physician Consultation Log
                </h4>
                <div className="space-y-3">
                  {[
                    { date: "2025-01-16 10:30 AM", doctor: selected.doctor, note: "Patient reported mild discomfort. Administered IV fluids and vitals remain steady. Scheduled routine follow-up scan." },
                    { date: "2025-01-15 02:15 PM", doctor: "Dr. Ama B.", note: "Initial admission assessment completed. Baseline labs requested (CBC, BMP, LFT). Patient in good spirits." },
                  ].map((n, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1">
                        <span>{n.doctor}</span>
                        <span className="text-slate-400 font-normal">{n.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{n.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medications */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Pill size={14} className="text-teal-500" /> Active Medications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "Amoxicillin 500mg", freq: "3x daily with meals", duration: "7 days" },
                    { name: "Paracetamol 1000mg", freq: "As needed for pain", duration: "Ongoing" },
                  ].map((m, idx) => (
                    <div key={idx} className="p-3 bg-teal-50/40 rounded-2xl border border-teal-100 flex items-start gap-3">
                      <Pill size={16} className="text-teal-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{m.name}</div>
                        <div className="text-[11px] text-slate-500">{m.freq} ({m.duration})</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <Button variant="outline" size="sm" icon={<Printer size={13} />} onClick={() => window.print()}>
                Print Full EMR
              </Button>
              <Button size="sm" onClick={() => setShowFullRecordModal(false)}>
                Close Record
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: QR Code Badge Modal */}
      {showQRModal && selected && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-150">
            <button 
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100"
            >
              <X size={18} />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">CareFlow Health</span>
              <h3 className="text-base font-extrabold text-slate-900">Digital Patient ID Badge</h3>
            </div>

            <div className="bg-emerald-50/60 border-2 border-dashed border-emerald-200 rounded-3xl p-6 my-4 flex flex-col items-center justify-center relative">
              <div className="w-40 h-40 bg-white p-3 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center justify-center relative">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                  <path fill="currentColor" d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,0 h20 v10 h-20 z M40,20 h10 v10 h-10 z M50,40 h20 v20 h-20 z M0,40 h20 v20 h-20 z M70,40 h30 v10 h-30 z M80,60 h20 v40 h-20 z M40,70 h20 v30 h-20 z M20,90 h10 v10 h-10 z" />
                </svg>
              </div>
              <span className="mt-3 text-xs font-mono font-bold text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200">
                {selected.id}
              </span>
            </div>

            <div className="space-y-1 text-slate-700 text-xs mb-6">
              <div className="font-extrabold text-sm text-slate-900">{selected.name}</div>
              <div className="text-slate-500">{selected.dept} · Blood: <span className="font-bold text-red-600">{selected.blood}</span></div>
              <div className="text-slate-400 text-[11px]">{selected.phone}</div>
            </div>

            <div className="space-y-2">
              <Button 
                size="sm" 
                className="w-full bg-emerald-600 hover:bg-emerald-700" 
                icon={copiedLink ? <Check size={14} /> : <Share2 size={14} />}
                onClick={() => {
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
              >
                {copiedLink ? "Link Copied!" : "Copy Digital Access Link"}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full" 
                icon={<Printer size={14} />}
                onClick={() => window.print()}
              >
                Print Emergency Badge
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: New Patient Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Register New Patient</h3>
                <p className="text-xs text-slate-500">Enter demographic & medical details to add patient</p>
              </div>
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Patient Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Kwame Mensah"
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age *</label>
                  <input 
                    type="number" 
                    required
                    placeholder="35"
                    value={regForm.age}
                    onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                  <select 
                    value={regForm.gender}
                    onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
                  <select 
                    value={regForm.blood}
                    onChange={(e) => setRegForm({ ...regForm, blood: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                  >
                    {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select 
                    value={regForm.dept}
                    onChange={(e) => setRegForm({ ...regForm, dept: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                  >
                    {["Cardiology", "Emergency", "Maternity", "Orthopedics", "Radiology", "Pediatrics", "Nephrology", "Neurology"].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Doctor</label>
                  <input 
                    type="text" 
                    placeholder="Dr. Rashid A."
                    value={regForm.doctor}
                    onChange={(e) => setRegForm({ ...regForm, doctor: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="+233 24 000 0000"
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Admission Type</label>
                  <select 
                    value={regForm.admissionType}
                    onChange={(e) => setRegForm({ ...regForm, admissionType: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500 font-semibold bg-slate-50"
                  >
                    <option value="Outpatient">🩺 Outpatient (OPD)</option>
                    <option value="Admitted">🏥 Admitted (Wards)</option>
                    <option value="Critical">🚨 Emergency / ICU</option>
                  </select>
                </div>
              </div>

              {regForm.admissionType === "Admitted" && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                  <div>
                    <label className="block text-xs font-bold text-indigo-900 mb-1">Assign Ward</label>
                    <select 
                      value={regForm.ward}
                      onChange={(e) => setRegForm({ ...regForm, ward: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-indigo-200 outline-none focus:border-indigo-500"
                    >
                      {["Ward 1", "Ward 2", "Ward 3", "Ward 4", "Maternity Ward", "Pediatric Ward"].map(w => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-indigo-900 mb-1">Assign Bed</label>
                    <input 
                      type="text" 
                      placeholder="Bed 12"
                      value={regForm.bed}
                      onChange={(e) => setRegForm({ ...regForm, bed: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-indigo-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}


              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Initial Conditions / Symptoms</label>
                <input 
                  type="text" 
                  placeholder="e.g. Fever, Hypertension (comma separated)"
                  value={regForm.conditions}
                  onChange={(e) => setRegForm({ ...regForm, conditions: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <Button variant="outline" size="sm" className="flex-1" type="button" onClick={() => setShowRegisterModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700" type="submit">
                  Save & Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PatientsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Patients Directory...</div>}>
      <PatientsContent />
    </Suspense>
  );
}

