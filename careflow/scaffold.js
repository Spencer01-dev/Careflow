const fs = require('fs');
const path = require('path');

const routes = [
  'records', 'consultations', 'icu', 'wards', 'theatre', 'radiology',
  'pharmacy', 'inventory', 'blood-bank', 'billing', 'insurance', 'hr',
  'departments', 'ambulance', 'analytics', 'telemedicine', 'settings',
  'notifications'
];

const content = `import ComingSoon from "@/components/dashboard/ComingSoon";
export default function Page() { return <ComingSoon />; }`;

routes.forEach(r => {
  const p = path.join('src', 'app', 'dashboard', r);
  fs.mkdirSync(p, { recursive: true });
  fs.writeFileSync(path.join(p, 'page.tsx'), content);
});
console.log("Scaffolded placeholder pages.");
