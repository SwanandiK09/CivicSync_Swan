import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, CheckCircle2, Clock, PlusCircle, Bell, MapPin,
  Coins, Trophy, Award, BarChart3, Gift, Compass, AlertTriangle,
  Zap, ShieldCheck, Lock,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { EmptyState, LoadingState, ErrorState } from '@/components/ui/States';
import { fetchReportsByReporter, fetchNotifications } from '@/services/api';
import { formatDate, timeAgo } from '@/lib/utils';
import type { Report, Notification } from '@/types';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function CitizenDashboard() {
  const { user, profile } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const [rpts, notifs] = await Promise.all([
        fetchReportsByReporter(user.id),
        fetchNotifications(user.id),
      ]);
      setReports(rpts);
      setNotifications(notifs.slice(0, 5));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const totalReports = reports.length;
  const activeReports = reports.filter(r => !['resolved', 'cancelled', 'rejected', 'duplicate'].includes(r.status)).length;
  const resolvedReports = reports.filter(r => r.status === 'resolved').length;

  if (loading) return <LoadingState message="Loading your dashboard..." />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  const firstName = profile?.full_name?.split(' ')[0] || 'there';
  // Community points are a display-only estimate based on activity — not a stored or tracked value yet.
  const points = 150 + resolvedReports * 40 + totalReports * 15;
  const encouragement =
    resolvedReports >= 5
      ? 'Community hero in the making!'
      : totalReports >= 1
      ? 'Keep going — every report helps your neighborhood!'
      : 'Report your first issue to get started!';

  return (
    <div className="space-y-6">
      {/* Greeting header */}
      <div className="rounded-2xl bg-gradient-to-br from-primary-50 via-white to-accent-50 border border-charcoal-100 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-charcoal-500 text-sm">{getGreeting()},</p>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-charcoal-800">{firstName}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-accent-500 text-white rounded-full pl-2.5 pr-3 py-1.5 shadow-sm">
              <Coins className="w-4 h-4" />
              <span className="text-sm font-semibold">{points.toLocaleString()}</span>
            </div>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold ring-2 ring-white shadow-sm flex-shrink-0">
              {firstName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 bg-white/70 rounded-xl px-4 py-2.5 border border-charcoal-100">
          <Trophy className="w-4 h-4 text-accent-600 flex-shrink-0" />
          <p className="text-sm text-charcoal-700 font-medium">{encouragement}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="card divide-x divide-charcoal-100 grid grid-cols-3">
        {[
          { icon: <FileText className="w-5 h-5" />, value: totalReports, label: 'Issues Reported', color: 'bg-primary-50 text-primary-600' },
          { icon: <Clock className="w-5 h-5" />, value: activeReports, label: 'Active', color: 'bg-amber-50 text-amber-600' },
          { icon: <CheckCircle2 className="w-5 h-5" />, value: resolvedReports, label: 'Resolved', color: 'bg-green-50 text-green-600' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center py-5 px-2">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-xl font-heading font-bold text-charcoal-800">{stat.value}</p>
            <p className="text-xs text-charcoal-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick action icons — Explore is real, the rest are visual previews of upcoming features */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {[
          { icon: <Award className="w-5 h-5" />, label: 'Badges', color: 'bg-amber-100 text-amber-600', soon: true },
          { icon: <BarChart3 className="w-5 h-5" />, label: 'Leaderboard', color: 'bg-indigo-100 text-indigo-600', soon: true },
          { icon: <Gift className="w-5 h-5" />, label: 'Rewards', color: 'bg-pink-100 text-pink-600', soon: true },
          { icon: <Compass className="w-5 h-5" />, label: 'Explore', color: 'bg-teal-100 text-teal-600', soon: false, to: '/app/map' },
        ].map((item) =>
          item.to ? (
            <Link key={item.label} to={item.to} className="flex flex-col items-center gap-2 group">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color} transition-transform group-hover:scale-105`}>
                {item.icon}
              </div>
              <span className="text-xs font-medium text-charcoal-600">{item.label}</span>
            </Link>
          ) : (
            <div key={item.label} className="relative flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center opacity-70 ${item.color}`}>
                {item.icon}
              </div>
              <span className="text-xs font-medium text-charcoal-500">{item.label}</span>
              {item.soon && (
                <span className="absolute -top-1 right-1 bg-charcoal-700 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                  Soon
                </span>
              )}
            </div>
          )
        )}
      </div>

      {/* Big action cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          to="/app/citizen/report"
          className="relative rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 text-white overflow-hidden group"
        >
          <div className="relative">
            <div className="relative inline-flex">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                <PlusCircle className="w-3.5 h-3.5 text-green-900" />
              </div>
            </div>
            <h3 className="text-lg font-heading font-bold mt-4">Report an Issue</h3>
            <p className="text-sm text-white/75 mt-1">Help improve your city</p>
            <span className="inline-flex items-center gap-1.5 mt-4 bg-white/15 rounded-full px-3 py-1.5 text-xs font-medium group-hover:bg-white/25 transition-colors">
              <Coins className="w-3.5 h-3.5" /> Earn points
            </span>
          </div>
        </Link>

        <Link
          to="/app/map"
          className="relative rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600 p-6 text-white overflow-hidden group"
        >
          <span className="absolute top-5 right-5 inline-flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-soft" /> Live
          </span>
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-heading font-bold mt-4">Community Map</h3>
          <p className="text-sm text-white/75 mt-1">Track issues nearby</p>
          <span className="inline-flex items-center gap-1.5 mt-4 bg-white/15 rounded-full px-3 py-1.5 text-xs font-medium group-hover:bg-white/25 transition-colors">
            <MapPin className="w-3.5 h-3.5" /> Real-time
          </span>
        </Link>
      </div>

      {/* Trust row */}
      <div className="card p-4 flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left">
        {[
          { icon: <Zap className="w-4 h-4" />, label: 'Quick Report' },
          { icon: <ShieldCheck className="w-4 h-4" />, label: 'Smart Categorization' },
          { icon: <Lock className="w-4 h-4" />, label: 'Safe & Secure' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
              {item.icon}
            </div>
            <span className="text-sm font-medium text-charcoal-700">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-lg font-heading font-bold text-charcoal-800 mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-charcoal-600 mb-3">Recent Reports</h3>
            {reports.length === 0 ? (
              <Card><CardBody>
                <EmptyState
                  icon={<FileText className="w-8 h-8" />}
                  title="No reports yet"
                  description="Start reporting community issues to track their progress"
                  action={<Link to="/app/citizen/report" className="btn-primary"><PlusCircle className="w-4 h-4" /> Report an Issue</Link>}
                />
              </CardBody></Card>
            ) : (
              <div className="space-y-3">
                {reports.slice(0, 5).map((report) => (
                  <Link key={report.id} to={`/app/reports/${report.id}`}>
                    <Card hoverable className="rounded-2xl">
                      <CardBody className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-charcoal-800 truncate">{report.title}</p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <StatusBadge status={report.status} />
                            {report.category && <span className="text-xs text-charcoal-500">{report.category.name}</span>}
                            <span className="text-xs text-charcoal-400">{formatDate(report.created_at)}</span>
                          </div>
                        </div>
                        <PriorityBadge level={report.priority_level} />
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-charcoal-600 mb-3">Recent Notifications</h3>
            {notifications.length === 0 ? (
              <Card><CardBody>
                <EmptyState icon={<Bell className="w-8 h-8" />} title="No notifications" />
              </CardBody></Card>
            ) : (
              <Card className="rounded-2xl">
                <div className="divide-y divide-charcoal-100">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`p-4 ${!notif.is_read ? 'bg-primary-50/50' : ''}`}>
                      <div className="flex items-start gap-2">
                        {!notif.is_read && <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal-700">{notif.title}</p>
                          {notif.description && <p className="text-xs text-charcoal-500 mt-0.5">{notif.description}</p>}
                          <p className="text-xs text-charcoal-400 mt-1">{timeAgo(notif.created_at)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            <Link to="/app/notifications" className="btn-ghost w-full mt-3 text-sm">View All Notifications</Link>
          </div>
        </div>
      </div>
    </div>
  );
}