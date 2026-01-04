import { motion } from 'framer-motion';
import { Calendar, Clock, Linkedin, MoreVertical, Pencil, Trash2, CheckCircle2 } from 'lucide-react';
import { Activity, categoryLabels, categoryIcons } from '@/types/activity';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
  index: number;
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
  onToggleSync: (id: string) => void;
}

const categoryColorMap: Record<string, string> = {
  leadership: 'bg-category-leadership/10 text-category-leadership border-category-leadership/30',
  volunteer: 'bg-category-volunteer/10 text-category-volunteer border-category-volunteer/30',
  sports: 'bg-category-sports/10 text-category-sports border-category-sports/30',
  clubs: 'bg-category-clubs/10 text-category-clubs border-category-clubs/30',
  research: 'bg-category-research/10 text-category-research border-category-research/30',
  arts: 'bg-category-arts/10 text-category-arts border-category-arts/30',
};

const categoryBorderMap: Record<string, string> = {
  leadership: 'hover:border-category-leadership/40',
  volunteer: 'hover:border-category-volunteer/40',
  sports: 'hover:border-category-sports/40',
  clubs: 'hover:border-category-clubs/40',
  research: 'hover:border-category-research/40',
  arts: 'hover:border-category-arts/40',
};

export function ActivityCard({ activity, index, onEdit, onDelete, onToggleSync }: ActivityCardProps) {
  const formatDate = (date: string) => {
    const [year, month] = date.split('-');
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <Card className={cn(
        "group relative overflow-hidden border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300",
        categoryBorderMap[activity.category]
      )}>
        {/* Synced indicator */}
        {activity.linkedInSynced && (
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-2 -right-6 w-20 bg-linkedin text-white text-[10px] font-semibold text-center py-0.5 rotate-45 shadow-sm">
              Synced
            </div>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <motion.span 
                className="text-3xl mt-0.5"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {categoryIcons[activity.category]}
              </motion.span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground truncate text-lg group-hover:text-primary transition-colors">
                  {activity.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate mt-0.5">
                  {activity.organization}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-xl transition-all duration-300",
                  activity.linkedInSynced 
                    ? "text-linkedin bg-linkedin/10 hover:bg-linkedin/20" 
                    : "text-muted-foreground hover:text-linkedin hover:bg-linkedin/10"
                )}
                onClick={() => onToggleSync(activity.id)}
                title={activity.linkedInSynced ? 'Synced to LinkedIn' : 'Click to sync'}
              >
                {activity.linkedInSynced ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Linkedin className="h-4 w-4" />
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => onEdit(activity)} className="gap-2">
                    <Pencil className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(activity.id)}
                    className="gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-4">
          <Badge 
            variant="outline" 
            className={cn("font-semibold px-3 py-1", categoryColorMap[activity.category])}
          >
            {activity.role}
          </Badge>
          
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {activity.description}
          </p>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(activity.startDate)} - {activity.isOngoing ? (
                  <span className="text-success font-medium">Present</span>
                ) : formatDate(activity.endDate!)}
              </span>
              {activity.hours && (
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  {activity.hours}h
                </span>
              )}
            </div>
          </div>
          
          <Badge 
            variant="secondary" 
            className={cn("text-xs font-medium", categoryColorMap[activity.category])}
          >
            {categoryLabels[activity.category]}
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
}
