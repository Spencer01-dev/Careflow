"use client";
import { Construction } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ComingSoon() {
  const pathname = usePathname();
  const title = pathname.split("/").pop()?.replace(/-/g, " ") || "Module";
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6 shadow-inner">
        <Construction size={40} className="text-slate-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{formattedTitle} Module</h2>
      <p className="text-slate-500 max-w-md">
        This module is currently under development. It will be available in the next major release of CareFlow.
      </p>
    </div>
  );
}
