import { motion } from 'framer-motion';
import { Activity as ActivityType } from '@/types/activity';
import { Trophy, Clock, Linkedin, TrendingUp, ArrowUpRight } from 'lucide-react';

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
      gradient: 'from-primary to-secondary',
      bgGradient: 'from-primary/10 to-secondary/10',
      change: '+2 this month',
    },
    {
      label: 'Hours Logged',
      value: totalHours.toLocaleString(),
      icon: Clock,
      gradient: 'from-category-volunteer to-secondary',
      bgGradient: 'from-category-volunteer/10 to-secondary/10',
      change: '+45 this week',
    },
    {
      label: 'LinkedIn Synced',
      value: `${syncedCount}/${totalActivities}`,
      icon: Linkedin,
      gradient: 'from-linkedin to-primary',
      bgGradient: 'from-linkedin/10 to-primary/10',
      change: 'Auto-sync on',
    },
    {
      label: 'Active Now',
      value: ongoingCount,
      icon: TrendingUp,
      gradient: 'from-category-sports to-warning',
      bgGradient: 'from-category-sports/10 to-warning/10',
      change: 'In progress',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={item}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-5 shadow-card hover:shadow-card-hover transition-all duration-300"
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Decorative circle */}
          <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-[0.08] rounded-full group-hover:scale-150 transition-transform duration-500`} />
          
          <div className="relative">
            <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            
            <div className="mt-4 space-y-1">
              <p className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
            
            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-success" />
              <span>{stat.change}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
