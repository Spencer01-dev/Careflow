"use client";
import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Users, Video, Search, Filter, Plus, ChevronLeft, ChevronRight, MoreHorizontal, CheckCircle2, XCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

const appointments = [
  { id: "APT-201", patient: "Sarah Mensah", patientId: "P-9001", doctor: "Dr. Rashid A.", type: "In-Person", status: "Scheduled", time: "09:00", date: new Date(), color: "from-emerald-500 to-teal-500", avatar: "SM" },
  { id: "APT-202", patient: "James Kofi", patientId: "P-9002", doctor: "Dr. Rashid A.", type: "Telemedicine", status: "In Progress", time: "10:30", date: new Date(), color: "from-violet-500 to-purple-500", avatar: "JK" },
  { id: "APT-203", patient: "Grace Amara", patientId: "P-9003", doctor: "Dr. Clara M.", type: "Follow-up", status: "Completed", time: "08:15", date: new Date(), color: "from-pink-500 to-rose-400", avatar: "GA" },
  { id: "APT-204", patient: "David Osei", patientId: "P-9004", doctor: "Dr. Kweku F.", type: "In-Person", status: "Cancelled", time: "14:00", date: new Date(), color: "from-green-500 to-teal-500", avatar: "DO" },
  { id: "APT-205", patient: "Fatima Al-Said", patientId: "P-9005", doctor: "Dr. Ibrahim S.", type: "In-Person", status: "Scheduled", time: "15:45", date: addDays(new Date(), 1), color: "from-amber-500 to-orange-500", avatar: "FA" },
];

const statusColors: Record<string, "info" | "success" | "warning" | "error" | "default"> = {
  Scheduled: "info",
  "In Progress": "warning",
  Completed: "success",
  Cancelled: "error",
};

export default function AppointmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("day");

  const todayStr = format(new Date(), "yyyy-MM-dd");
  const filteredApps = appointments.filter(a => format(a.date, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd"));

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden bg-slate-50">

      {/* Header & Controls */}
      <div className="bg-white border-b border-slate-100 px-6 py-4 flex-shrink-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
            <p className="text-sm text-slate-500">Manage patient bookings and doctor schedules</p>
          </div>
          <Button size="md" icon={<Plus size={16} />} className="bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 shadow-md">
            New Appointment
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 flex-wrap">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              <button
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${view === "day" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
                onClick={() => setView("day")}
              >
                Day
              </button>
              <button
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${view === "week" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
                onClick={() => setView("week")}
              >
                Week
              </button>
              <button
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${view === "month" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
                onClick={() => setView("month")}
              >
                Month
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-slate-600">
              <button onClick={() => setCurrentDate(addDays(currentDate, -1))} className="p-1.5 rounded-lg hover:bg-slate-100"><ChevronLeft size={18} /></button>
              <span className="text-sm font-bold min-w-[140px] text-center">
                {view === "day" ? format(currentDate, "EEEE, MMM d, yyyy") : `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`}
              </span>
              <button onClick={() => setCurrentDate(addDays(currentDate, 1))} className="p-1.5 rounded-lg hover:bg-slate-100"><ChevronRight size={18} /></button>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:flex-none">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" />
              <input type="text" placeholder="Search doctor or patient" style={{ paddingLeft: "38px" }} className="pr-4 py-1.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-300 w-full sm:w-60" />
            </div>
            <Button variant="outline" size="sm" icon={<Filter size={14} />}>Filters</Button>
          </div>

        </div>
      </div>


      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
               <h3 className="text-sm font-bold text-slate-900 mb-3">Mini Calendar</h3>
               <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => <div key={d} className="text-xs font-semibold text-slate-400">{d}</div>)}
               </div>
               <div className="grid grid-cols-7 gap-1">
                  {weekDays.map(day => (
                    <button
                      key={day.toISOString()}
                      onClick={() => setCurrentDate(day)}
                      className={`h-8 w-full rounded-lg text-sm flex items-center justify-center transition-colors ${format(day, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd") ? "bg-emerald-600 text-white font-bold shadow-md" : format(day, "yyyy-MM-dd") === todayStr ? "text-emerald-600 font-bold bg-emerald-50" : "text-slate-700 hover:bg-slate-100"}`}
                    >
                      {format(day, "d")}
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Doctors on Duty</h3>
              <div className="space-y-3">
                {[
                  { name: "Dr. Rashid A.", role: "Cardiology", status: "Available" },
                  { name: "Dr. Clara M.", role: "Maternity", status: "In Surgery" },
                  { name: "Dr. Kweku F.", role: "Orthopedics", status: "Consulting" }
                ].map(doc => (
                  <div key={doc.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                      {doc.name.split(" ")[1][0]}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-800">{doc.name}</div>
                      <div className="text-[10px] text-slate-500">{doc.role}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${doc.status === "Available" ? "bg-green-500" : doc.status === "In Surgery" ? "bg-red-500" : "bg-amber-500"}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Schedule View */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
               <h2 className="text-base font-bold text-slate-900">Schedule for {format(currentDate, "MMM d, yyyy")}</h2>
               <span className="text-sm text-slate-500">{filteredApps.length} Appointments</span>
            </div>
            
            <div className="flex-1 overflow-y-auto">
               {filteredApps.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-slate-400">
                   <CalendarIcon size={48} className="mb-4 text-slate-200" />
                   <p>No appointments scheduled for this date.</p>
                 </div>
               ) : (
                 <div className="divide-y divide-slate-100">
                   {filteredApps.map(app => (
                     <div key={app.id} className="flex items-start gap-4 p-5 hover:bg-slate-50 transition-colors group cursor-pointer">
                       <div className="text-right flex-shrink-0 w-16 pt-1">
                         <div className="text-sm font-bold text-slate-900">{app.time}</div>
                         <div className="text-[10px] text-slate-500">{app.type}</div>
                       </div>
                       
                       <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm`}>
                         {app.avatar}
                       </div>
                       
                       <div className="flex-1">
                         <div className="flex items-center gap-2 mb-1">
                           <span className="text-base font-semibold text-slate-900">{app.patient}</span>
                           <span className="text-xs text-slate-400 font-mono">({app.patientId})</span>
                         </div>
                         <div className="flex items-center gap-4 text-xs text-slate-600">
                           <span className="flex items-center gap-1"><Users size={14} className="text-slate-400" /> {app.doctor}</span>
                           {app.type === "Telemedicine" && <span className="flex items-center gap-1 text-emerald-600"><Video size={14} /> Virtual Link</span>}
                         </div>
                       </div>

                       <div className="flex flex-col items-end gap-2">
                         <Badge variant={statusColors[app.status]} dot>{app.status}</Badge>
                         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-1 text-slate-400 hover:text-green-600 transition-colors" title="Check In"><CheckCircle2 size={16}/></button>
                           <button className="p-1 text-slate-400 hover:text-red-600 transition-colors" title="Cancel"><XCircle size={16}/></button>
                           <button className="p-1 text-slate-400 hover:text-slate-900 transition-colors"><MoreHorizontal size={16}/></button>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
