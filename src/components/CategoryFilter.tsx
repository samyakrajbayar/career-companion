import { motion } from 'framer-motion';
import { ActivityCategory, categoryLabels, categoryIcons } from '@/types/activity';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selected: ActivityCategory | 'all';
  onChange: (category: ActivityCategory | 'all') => void;
  counts: Record<ActivityCategory | 'all', number>;
}

const categories: (ActivityCategory | 'all')[] = [
  'all',
  'leadership',
  'volunteer',
  'sports',
  'clubs',
  'research',
  'arts',
];

export function CategoryFilter({ selected, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isSelected = selected === cat;
        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              isSelected 
                ? "text-white shadow-md" 
                : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-border hover:shadow-sm"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 gradient-primary rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {cat !== 'all' && (
                <span className="text-base">{categoryIcons[cat]}</span>
              )}
              {cat === 'all' ? 'All' : categoryLabels[cat]}
              <span className={cn(
                "px-1.5 py-0.5 rounded-full text-xs font-semibold transition-colors",
                isSelected 
                  ? "bg-white/20" 
                  : "bg-muted"
              )}>
                {counts[cat]}
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
