"use client";
import { useState } from "react";
import { FlaskConical, Search, Filter, CheckCircle2, AlertTriangle, Clock, Download, Plus, ChevronRight, FileText } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const labRequests = [
  { id: "LAB-4091", patient: "James Kofi", patientId: "P-9002", test: "Complete Blood Count", doctor: "Dr. Ama B.", priority: "Stat", status: "Results Ready", time: "10:15", date: "Today" },
  { id: "LAB-4092", patient: "Sarah Mensah", patientId: "P-9001", test: "Lipid Panel", doctor: "Dr. Rashid A.", priority: "Routine", status: "In Progress", time: "11:30", date: "Today" },
  { id: "LAB-4093", patient: "Fatima Al-Said", patientId: "P-9005", test: "Comprehensive Metabolic Panel", doctor: "Dr. Ibrahim S.", priority: "Routine", status: "Pending Sample", time: "12:00", date: "Today" },
  { id: "LAB-4094", patient: "David Osei", patientId: "P-9004", test: "Hemoglobin A1c", doctor: "Dr. Kweku F.", priority: "Routine", status: "Results Ready", time: "09:45", date: "Yesterday" },
  { id: "LAB-4095", patient: "Grace Amara", patientId: "P-9003", test: "Urinalysis", doctor: "Dr. Clara M.", priority: "Routine", status: "Verified", time: "14:20", date: "Yesterday" },
];

const statusStyles: Record<string, "info" | "warning" | "success" | "default" | "primary"> = {
  "Pending Sample": "default",
  "In Progress": "warning",
  "Results Ready": "info",
  Verified: "success",
};

export default function LaboratoryPage() {
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<typeof labRequests[0] | null>(null);

  const filtered = labRequests.filter(
    (req) => req.patient.toLowerCase().includes(search.toLowerCase()) || req.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-6 py-4 flex-shrink-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Laboratory</h1>
            <p className="text-sm text-slate-500">Manage lab orders, samples, and results</p>
          </div>
          <Button size="md" icon={<Plus size={16} />} className="bg-gradient-to-r from-violet-600 to-violet-500 border-0 shadow-md shadow-violet-100 text-white">
            New Test Request
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 max-w-4xl mb-4">
           {[
             { label: "Pending Samples", value: 12, color: "text-slate-600", bg: "bg-slate-100" },
             { label: "In Progress", value: 8, color: "text-amber-600", bg: "bg-amber-50" },
             { label: "Results Ready", value: 24, color: "text-emerald-600", bg: "bg-emerald-50" },
             { label: "Stat (Urgent)", value: 3, color: "text-red-600", bg: "bg-red-50" },
           ].map(stat => (
             <div key={stat.label} className={`rounded-xl px-4 py-3 border border-slate-100 shadow-sm ${stat.bg}`}>
                <div className="text-2xl font-bold stat-value" style={{ color: stat.color === "text-slate-600" ? "#475569" : undefined }}>
                  <span className={stat.color}>{stat.value}</span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5">{stat.label}</div>
             </div>
           ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search request ID or patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-50"
            />
          </div>
          <Button variant="outline" size="sm" icon={<Filter size={13} />}>Filters</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* List */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
             <table className="w-full text-sm">
               <thead className="bg-slate-50/50 border-b border-slate-100">
                 <tr>
                   <th className="px-6 py-4 text-left font-semibold text-slate-600">Request ID</th>
                   <th className="px-6 py-4 text-left font-semibold text-slate-600">Patient</th>
                   <th className="px-6 py-4 text-left font-semibold text-slate-600">Test Ordered</th>
                   <th className="px-6 py-4 text-left font-semibold text-slate-600">Priority</th>
                   <th className="px-6 py-4 text-left font-semibold text-slate-600">Status</th>
                   <th className="px-6 py-4 text-left font-semibold text-slate-600">Date</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {filtered.map(req => (
                   <tr 
                     key={req.id} 
                     onClick={() => setSelectedRequest(req)}
                     className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedRequest?.id === req.id ? "bg-violet-50/30" : ""}`}
                   >
                     <td className="px-6 py-4 font-mono text-slate-500 text-xs">{req.id}</td>
                     <td className="px-6 py-4">
                       <div className="font-semibold text-slate-900">{req.patient}</div>
                       <div className="text-xs text-slate-400 font-mono">{req.patientId}</div>
                     </td>
                     <td className="px-6 py-4">
                       <div className="font-medium text-slate-800">{req.test}</div>
                       <div className="text-xs text-slate-500">Ord: {req.doctor}</div>
                     </td>
                     <td className="px-6 py-4">
                       {req.priority === "Stat" ? (
                         <span className="flex items-center gap-1 text-xs font-bold text-red-600"><AlertTriangle size={12}/> STAT</span>
                       ) : (
                         <span className="text-xs text-slate-500">Routine</span>
                       )}
                     </td>
                     <td className="px-6 py-4">
                       <Badge variant={statusStyles[req.status]} size="sm">{req.status}</Badge>
                     </td>
                     <td className="px-6 py-4 text-xs text-slate-500">
                       <div>{req.date}</div>
                       <div>{req.time}</div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        {/* Side Panel */}
        {selectedRequest && (
          <div className="w-96 bg-white border-l border-slate-100 overflow-y-auto flex-shrink-0">
             <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-2">
                     <FlaskConical size={18} className="text-violet-500" />
                     <span className="font-bold text-slate-900">Lab Request Detail</span>
                   </div>
                   <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-slate-600">&times;</button>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-4 mb-6">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-sm font-bold text-slate-900">{selectedRequest.patient}</div>
                        <div className="text-xs font-mono text-slate-500">{selectedRequest.patientId}</div>
                      </div>
                      <Badge variant={statusStyles[selectedRequest.status]}>{selectedRequest.status}</Badge>
                   </div>
                   
                   <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Test:</span>
                        <span className="font-medium text-slate-900 text-right">{selectedRequest.test}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Request ID:</span>
                        <span className="font-mono text-slate-900">{selectedRequest.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Requested by:</span>
                        <span className="text-slate-900">{selectedRequest.doctor}</span>
                      </div>
                   </div>
                </div>

                {selectedRequest.status === "Results Ready" || selectedRequest.status === "Verified" ? (
                   <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <FileText size={16} className="text-emerald-500"/>
                        Test Results
                      </h4>
                      {/* Mock result table */}
                      <div className="border border-slate-200 rounded-lg overflow-hidden mb-6">
                        <table className="w-full text-xs">
                           <thead className="bg-slate-100">
                             <tr>
                               <th className="text-left px-3 py-2 text-slate-600">Parameter</th>
                               <th className="text-right px-3 py-2 text-slate-600">Result</th>
                               <th className="text-right px-3 py-2 text-slate-600">Ref. Range</th>
                             </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100 bg-white">
                             <tr>
                               <td className="px-3 py-2 font-medium">WBC Count</td>
                               <td className="px-3 py-2 text-right font-bold text-red-600">12.5 H</td>
                               <td className="px-3 py-2 text-right text-slate-500">4.5 - 11.0</td>
                             </tr>
                             <tr>
                               <td className="px-3 py-2 font-medium">RBC Count</td>
                               <td className="px-3 py-2 text-right font-bold">4.8</td>
                               <td className="px-3 py-2 text-right text-slate-500">4.2 - 5.4</td>
                             </tr>
                             <tr>
                               <td className="px-3 py-2 font-medium">Hemoglobin</td>
                               <td className="px-3 py-2 text-right font-bold text-emerald-600">11.2 L</td>
                               <td className="px-3 py-2 text-right text-slate-500">12.0 - 15.5</td>
                             </tr>
                           </tbody>
                        </table>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 border-0" icon={<CheckCircle2 size={14}/>}>Verify Results</Button>
                        <Button variant="outline" className="flex-none px-3 text-slate-600"><Download size={16}/></Button>
                      </div>
                   </div>
                ) : (
                  <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                    <Clock size={32} className="mx-auto text-slate-300 mb-3" />
                    <h4 className="text-sm font-semibold text-slate-700">Awaiting Results</h4>
                    <p className="text-xs text-slate-500 mt-1">Samples are currently being processed.</p>
                    {selectedRequest.status === "Pending Sample" && (
                       <Button size="sm" className="mt-4 bg-slate-800 border-0">Collect Sample</Button>
                    )}
                  </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
