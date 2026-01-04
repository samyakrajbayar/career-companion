import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddActivity: () => void;
}

export function EmptyState({ onAddActivity }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-6">
        <Sparkles className="h-10 w-10 text-primary-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No activities yet
      </h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        Start tracking your extracurriculars to build an impressive profile
        and keep your LinkedIn updated automatically.
      </p>
      <Button onClick={onAddActivity} className="gradient-primary">
        <Plus className="h-5 w-5 mr-2" />
        Add Your First Activity
      </Button>
    </motion.div>
  );
}
