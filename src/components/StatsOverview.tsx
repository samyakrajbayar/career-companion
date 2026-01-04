import { motion } from 'framer-motion';
import { Activity as ActivityType, ActivityCategory } from '@/types/activity';
import { Trophy, Clock, Linkedin, TrendingUp } from 'lucide-react';

interface StatsOverviewProps {
  activities: ActivityType[];
}

export function StatsOverview({ activities }: StatsOverviewProps) {
  const totalActivities = activities.length;
  const totalHours = activities.reduce((sum, a) => sum + (a.hours || 0), 0);
  const syncedCount = activities.filter(a => a.linkedInSynced).length;
  const ongoingCount = activities.filter(a => a.isOngoing).length;

  const stats = [
    {
      label: 'Total Activities',
      value: totalActivities,
      icon: Trophy,
      color: 'from-primary to-secondary',
    },
    {
      label: 'Hours Logged',
      value: totalHours,
      icon: Clock,
      color: 'from-category-volunteer to-secondary',
    },
    {
      label: 'LinkedIn Synced',
      value: `${syncedCount}/${totalActivities}`,
      icon: Linkedin,
      color: 'from-primary to-category-clubs',
    },
    {
      label: 'Active Now',
      value: ongoingCount,
      icon: TrendingUp,
      color: 'from-category-sports to-warning',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="relative overflow-hidden rounded-xl bg-card border border-border/50 p-5 shadow-card"
        >
          <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
          <div className="relative">
            <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${stat.color} mb-3`}>
              <stat.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
