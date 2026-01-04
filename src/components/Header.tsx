import { motion } from 'framer-motion';
import { Linkedin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onSyncAll: () => void;
  syncedCount: number;
  totalCount: number;
}

export function Header({ onSyncAll, syncedCount, totalCount }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl gradient-hero p-8 mb-8"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white rounded-full translate-y-1/2" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary-foreground/80" />
            <span className="text-sm font-medium text-primary-foreground/80">
              Extracurricular Tracker
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Your Activities Dashboard
          </h1>
          <p className="text-primary-foreground/80 max-w-lg">
            Track your extracurriculars and sync them to LinkedIn with one click.
            Keep your professional profile up to date effortlessly.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <Button
            onClick={onSyncAll}
            size="lg"
            className="bg-card text-primary hover:bg-card/90 shadow-lg"
          >
            <Linkedin className="h-5 w-5 mr-2" />
            Sync All to LinkedIn
          </Button>
          <p className="text-sm text-primary-foreground/70">
            {syncedCount} of {totalCount} activities synced
          </p>
        </div>
      </div>
    </motion.header>
  );
}
