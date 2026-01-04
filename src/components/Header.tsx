import { motion } from 'framer-motion';
import { Linkedin, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onSyncAll: () => void;
  syncedCount: number;
  totalCount: number;
}

export function Header({ onSyncAll, syncedCount, totalCount }: HeaderProps) {
  const syncPercentage = totalCount > 0 ? (syncedCount / totalCount) * 100 : 0;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-10 mb-8"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-4">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">
              Extracurricular Tracker
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Your Activities
            <br />
            <span className="text-white/80">Dashboard</span>
          </motion.h1>
          
          <motion.p 
            className="text-white/70 max-w-md text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Track achievements, log hours, and keep your LinkedIn profile 
            updated automatically.
          </motion.p>
        </div>

        <motion.div 
          className="flex flex-col items-start lg:items-end gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={onSyncAll}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-6 group"
          >
            <Linkedin className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Sync to LinkedIn
            <Zap className="h-4 w-4 ml-2 text-warning" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="h-2 w-32 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${syncPercentage}%` }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <span className="text-sm font-medium text-white/80">
              {syncedCount}/{totalCount} synced
            </span>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
