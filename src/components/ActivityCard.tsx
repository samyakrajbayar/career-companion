import { motion } from 'framer-motion';
import { Calendar, Clock, Linkedin, MoreVertical, Pencil, Trash2 } from 'lucide-react';
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
  leadership: 'bg-category-leadership/10 text-category-leadership border-category-leadership/20',
  volunteer: 'bg-category-volunteer/10 text-category-volunteer border-category-volunteer/20',
  sports: 'bg-category-sports/10 text-category-sports border-category-sports/20',
  clubs: 'bg-category-clubs/10 text-category-clubs border-category-clubs/20',
  research: 'bg-category-research/10 text-category-research border-category-research/20',
  arts: 'bg-category-arts/10 text-category-arts border-category-arts/20',
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
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card className="group shadow-card hover:shadow-card-hover transition-all duration-300 border-border/50 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <span className="text-2xl">{categoryIcons[activity.category]}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{activity.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{activity.organization}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 transition-colors",
                  activity.linkedInSynced 
                    ? "text-primary bg-primary/10 hover:bg-primary/20" 
                    : "text-muted-foreground hover:text-primary"
                )}
                onClick={() => onToggleSync(activity.id)}
                title={activity.linkedInSynced ? 'Synced to LinkedIn' : 'Click to sync'}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(activity)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(activity.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <Badge 
            variant="outline" 
            className={cn("font-medium", categoryColorMap[activity.category])}
          >
            {activity.role}
          </Badge>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {activity.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(activity.startDate)} - {activity.isOngoing ? 'Present' : formatDate(activity.endDate!)}
            </span>
            {activity.hours && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {activity.hours} hrs
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 pt-1">
            <Badge 
              variant="secondary" 
              className={cn("text-xs", categoryColorMap[activity.category])}
            >
              {categoryLabels[activity.category]}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
