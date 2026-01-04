import { motion } from 'framer-motion';
import { Plus, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddActivity: () => void;
}

export function EmptyState({ onAddActivity }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-mesh opacity-50 rounded-3xl" />
      
      <motion.div 
        className="relative z-10"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mb-8 mx-auto shadow-glow"
          animate={{ 
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="h-12 w-12 text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-foreground mb-3">
          No activities yet
        </h3>
        <p className="text-muted-foreground max-w-md mb-8 text-base leading-relaxed">
          Start tracking your extracurriculars to build an impressive profile
          and keep your LinkedIn updated automatically.
        </p>
        
        <Button 
          onClick={onAddActivity} 
          size="lg"
          className="gradient-primary font-semibold px-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Your First Activity
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
