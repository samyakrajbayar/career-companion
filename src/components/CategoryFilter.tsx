import { motion } from 'framer-motion';
import { ActivityCategory, categoryLabels, categoryIcons } from '@/types/activity';
import { Button } from '@/components/ui/button';
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
      {categories.map((cat) => (
        <motion.div
          key={cat}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant={selected === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(cat)}
            className={cn(
              "transition-all",
              selected === cat && "gradient-primary border-0"
            )}
          >
            {cat !== 'all' && (
              <span className="mr-1.5">{categoryIcons[cat]}</span>
            )}
            {cat === 'all' ? 'All' : categoryLabels[cat]}
            <span className={cn(
              "ml-2 px-1.5 py-0.5 rounded-full text-xs",
              selected === cat 
                ? "bg-primary-foreground/20 text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            )}>
              {counts[cat]}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
