import { Link } from 'react-router-dom';
import {
  ArrowRight, FileText, Tags, Copy, ArrowUpDown, UserCheck,
  Map, Route, CheckSquare, BarChart3, ShieldCheck, Bell, Star,
  Users, ClipboardList, CheckCircle2, MapPin,
} from 'lucide-react';
import { LogoMark } from '@/components/ui/Logo';

const featureGroups = [
  {
    group: 'Report & capture',
    items: [
      { icon: <FileText className="w-[18px] h-[18px]" />, title: 'Report an issue', desc: 'Describe the problem, attach photos, and drop a pin on the map in under a minute.' },
      { icon: <Tags className="w-[18px] h-[18px]" />, title: 'Automatic categorization', desc: 'Reports are sorted into the right category so they reach the right team.' },
      { icon: <Copy className="w-[18px] h-[18px]" />, title: 'Duplicate detection', desc: 'Similar reports from the same area are grouped instead of piling up separately.' },
    ],
  },
  {
    group: 'Coordinate & assign',
    items: [
      { icon: <ArrowUpDown className="w-[18px] h-[18px]" />, title: 'Priority scheduling', desc: 'Urgent issues rise to the top, so the most pressing problems get handled first.' },
      { icon: <UserCheck className="w-[18px] h-[18px]" />, title: 'Volunteer matching', desc: 'Tasks go to the nearest volunteer with the right skills for the job.' },
      { icon: <Map className="w-[18px] h-[18px]" />, title: 'Live map view', desc: 'See every open report and assigned task plotted on one shared map.' },
      { icon: <Route className="w-[18px] h-[18px]" />, title: 'Smart routing', desc: 'Volunteers get the fastest path between the tasks assigned to them.' },
    ],
  },
  {
    group: 'Verify & resolve',
    items: [
      { icon: <CheckSquare className="w-[18px] h-[18px]" />, title: 'Before & after proof', desc: 'Every fix is confirmed with photo evidence and a supervisor sign-off.' },
      { icon: <ShieldCheck className="w-[18px] h-[18px]" />, title: 'Role-based access', desc: 'Citizens, volunteers, supervisors, and admins each see exactly what they need.' },
    ],
  },
  {
    group: 'Track & improve',
    items: [
      { icon: <BarChart3 className="w-[18px] h-[18px]" />, title: 'Analytics', desc: 'Track response times, resolution rates, and trends across your community.' },
      { icon: <Bell className="w-[18px] h-[18px]" />, title: 'Notifications', desc: 'Stay updated the moment your report status changes.' },
      { icon: <Star className="w-[18px] h-[18px]" />, title: 'Community feedback', desc: "Rate the resolution, or reopen a report if the issue comes back." },
    ],
  },
];

const steps = [
  'Citizen reports an issue',
  'Evidence and location are captured',
  'Issue is categorized',
  'Duplicate reports are checked',
  'Priority is calculated',
  'Supervisor verifies the report',
  'Suitable volunteer is recommended',
  'Task is assigned',
  'Volunteer accepts the task',
  'Volunteer updates progress',
  'Evidence is uploaded',
  'Supervisor verifies the evidence',
  'Issue is marked resolved',
  'Feedback and analytics are updated',
];

const roles = [
  { icon: <Users className="w-6 h-6" />, title: 'Citizen', desc: "Report issues, track status, and give feedback once they're fixed." },
  { icon: <UserCheck className="w-6 h-6" />, title: 'Volunteer', desc: 'Browse open tasks, accept assignments, and upload proof of work.' },
  { icon: <ShieldCheck className="w-6 h-6" />, title: 'Supervisor', desc: 'Review incoming reports, assign tasks, and verify finished work.' },
  { icon: <ClipboardList className="w-6 h-6" />, title: 'Administrator', desc: 'Manage users, configure the system, and monitor analytics.' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center">
              <LogoMark className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-heading font-bold text-charcoal-800">CivicSync</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/login" className="btn-ghost text-sm">Login</Link>
            <Link to="/register" className="btn-primary text-sm">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-accent-700 text-xs font-medium mb-6 animate-fade-in">
              <MapPin className="w-3.5 h-3.5" />
              Report it. Route it. Get it resolved.
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-heading font-bold text-charcoal-800 leading-[1.08] animate-slide-up">
              Community problems, tracked from report to repair
            </h1>
            <p className="mt-6 text-base sm:text-lg text-charcoal-500 max-w-lg animate-slide-up">
              CivicSync connects citizens, volunteers, and local staff on one platform
              &mdash; so every pothole, streetlight, and complaint gets seen, assigned, and verified fixed.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 animate-slide-up">
              <Link to="/register" className="btn-primary w-full sm:w-auto">
                Report an issue
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#how-it-works" className="btn-secondary w-full sm:w-auto">
                See how it works
              </a>
            </div>
          </div>

          {/* Hero illustration: a report's journey across a map, start to resolved */}
          <div className="relative hidden sm:block">
            <div
              className="relative rounded-3xl border border-charcoal-200 bg-charcoal-50 aspect-[6/5] shadow-elevated overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(23,46,82,0.10) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            >
              <svg viewBox="0 0 400 340" className="absolute inset-0 w-full h-full" fill="none">
                <path
                  d="M60 260 C 140 260, 130 150, 200 130 S 300 90, 330 60"
                  stroke="#e7a53a"
                  strokeWidth="2.5"
                  strokeDasharray="7 7"
                  strokeLinecap="round"
                />
              </svg>

              {/* Start marker: new report */}
              <div className="absolute" style={{ left: '46px', top: '234px' }}>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-accent-500 animate-pulse-soft" />
                  <div className="absolute -inset-1.5 rounded-full border-2 border-accent-300" />
                </div>
              </div>
              <div className="absolute bg-white rounded-lg shadow-card border border-charcoal-200 px-3 py-2" style={{ left: '16px', top: '196px' }}>
                <p className="text-[11px] font-semibold text-charcoal-700">Pothole reported</p>
                <p className="text-[10px] text-charcoal-400">2nd Ave &amp; Oak St</p>
              </div>

              {/* End marker: resolved */}
              <div className="absolute w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center shadow-elevated" style={{ left: '312px', top: '42px' }}>
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bg-white rounded-lg shadow-card border border-charcoal-200 px-3 py-2 text-right" style={{ right: '18px', top: '84px' }}>
                <p className="text-[11px] font-semibold text-charcoal-700">Marked resolved</p>
                <p className="text-[10px] text-charcoal-400">Verified by supervisor</p>
              </div>

              {/* Floating credibility chip */}
              <div className="absolute left-6 bottom-6 bg-white rounded-xl shadow-elevated border border-charcoal-200 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-[18px] h-[18px]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal-800 leading-none">14-step workflow</p>
                  <p className="text-xs text-charcoal-400 mt-1">from first report to verified fix</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-navy-900 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '4', label: 'User roles' },
            { value: '10', label: 'Issue categories' },
            { value: '14', label: 'Workflow steps' },
            { value: '100%', label: 'Transparent tracking' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-heading font-bold text-white">{stat.value}</p>
              <p className="text-sm text-navy-300 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features, grouped by workflow stage */}
      <section className="py-20 px-4 sm:px-6 bg-charcoal-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-charcoal-800">Everything a report needs to get fixed</h2>
            <p className="text-charcoal-500 mt-2">Built around the actual path an issue takes, from first report to verified resolution</p>
          </div>
          <div>
            {featureGroups.map((g, gi) => (
              <div
                key={g.group}
                className={`grid md:grid-cols-[180px_1fr] gap-4 md:gap-10 py-10 ${gi === 0 ? 'pt-0' : ''} ${gi < featureGroups.length - 1 ? 'border-b border-charcoal-200' : 'pb-0'}`}
              >
                <div>
                  <h3 className="font-heading text-base font-semibold text-charcoal-800">{g.group}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                  {g.items.map((item) => (
                    <div key={item.title} className="flex gap-3.5">
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent-50 text-accent-700 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-charcoal-800 text-sm mb-1">{item.title}</h4>
                        <p className="text-sm text-charcoal-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-charcoal-800">How it works</h2>
            <p className="text-charcoal-500 mt-2">From report to resolution in 14 steps</p>
          </div>
          <div className="relative">
            <div className="absolute left-5 top-5 bottom-5 w-px bg-charcoal-200" />
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="relative flex items-center gap-4">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 card p-4">
                    <p className="text-sm font-medium text-charcoal-700">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 px-4 sm:px-6 bg-navy-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">Built for every role</h2>
            <p className="text-navy-300 mt-2">Each person sees only the dashboard they need</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {roles.map((r) => (
              <div key={r.title} className="bg-navy-800 rounded-xl p-5 border border-navy-700 hover:border-accent-500 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary-600 text-white flex items-center justify-center mb-4">
                  {r.icon}
                </div>
                <h3 className="font-heading font-semibold text-white mb-1">{r.title}</h3>
                <p className="text-sm text-navy-300">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-charcoal-800">Ready to make a difference?</h2>
          <p className="text-charcoal-500 mt-3 mb-8">
            Join CivicSync and help your community resolve issues faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register" className="btn-primary w-full sm:w-auto">
              Get started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/login" className="btn-secondary w-full sm:w-auto">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-800 text-charcoal-300 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <LogoMark className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-semibold text-white">CivicSync</span>
          </div>
          <p className="text-sm text-charcoal-400">
            From community problems to verified solutions.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/login" className="hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="hover:text-white transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}