import { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ActivityCategory } from '@/types/activity';
import { useActivities } from '@/hooks/useActivities';
import { Header } from '@/components/Header';
import { StatsOverview } from '@/components/StatsOverview';
import { ActivityCard } from '@/components/ActivityCard';
import { ActivityModal } from '@/components/ActivityModal';
import { CategoryFilter } from '@/components/CategoryFilter';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { activities, addActivity, updateActivity, deleteActivity, toggleLinkedInSync } = useActivities();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredActivities = useMemo(() => {
    let result = activities;
    
    if (selectedCategory !== 'all') {
      result = result.filter(a => a.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.name.toLowerCase().includes(query) ||
        a.organization.toLowerCase().includes(query) ||
        a.role.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [activities, selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<ActivityCategory | 'all', number> = {
      all: activities.length,
      leadership: 0,
      volunteer: 0,
      sports: 0,
      clubs: 0,
      research: 0,
      arts: 0,
    };
    activities.forEach(a => {
      counts[a.category]++;
    });
    return counts;
  }, [activities]);

  const handleAddActivity = (data: Omit<Activity, 'id' | 'createdAt' | 'linkedInSynced'>) => {
    addActivity(data);
    toast({
      title: '🎉 Activity Added!',
      description: `"${data.name}" has been added to your activities.`,
    });
  };

  const handleEditActivity = (data: Omit<Activity, 'id' | 'createdAt' | 'linkedInSynced'>) => {
    if (editingActivity) {
      updateActivity(editingActivity.id, data);
      toast({
        title: '✨ Activity Updated',
        description: `"${data.name}" has been updated.`,
      });
      setEditingActivity(null);
    }
  };

  const handleDelete = (id: string) => {
    const activity = activities.find(a => a.id === id);
    deleteActivity(id);
    toast({
      title: 'Activity Deleted',
      description: activity ? `"${activity.name}" has been removed.` : 'Activity removed.',
    });
  };

  const handleSyncAll = () => {
    const unsyncedCount = activities.filter(a => !a.linkedInSynced).length;
    activities.forEach(a => {
      if (!a.linkedInSynced) {
        toggleLinkedInSync(a.id);
      }
    });
    toast({
      title: '🔗 LinkedIn Sync',
      description: unsyncedCount > 0 
        ? `${unsyncedCount} activities marked for sync! Enable Cloud for auto-updates.`
        : 'All activities are already synced!',
    });
  };

  const syncedCount = activities.filter(a => a.linkedInSynced).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Background mesh gradient */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      
      <div className="relative z-10 container max-w-7xl py-8 px-4 md:px-6">
        <Header 
          onSyncAll={handleSyncAll}
          syncedCount={syncedCount}
          totalCount={activities.length}
        />

        <StatsOverview activities={activities} />

        <motion.div 
          className="mt-10 mb-6 flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-foreground">Your Activities</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-card border-border/50 focus-visible:ring-primary/50"
                />
              </div>
              <Button 
                onClick={() => {
                  setEditingActivity(null);
                  setModalOpen(true);
                }}
                className="gradient-primary font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Activity
              </Button>
            </div>
          </div>
          
          <CategoryFilter
            selected={selectedCategory}
            onChange={setSelectedCategory}
            counts={categoryCounts}
          />
        </motion.div>

        {activities.length === 0 ? (
          <EmptyState onAddActivity={() => setModalOpen(true)} />
        ) : filteredActivities.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">No activities match your search.</p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredActivities.map((activity, index) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  index={index}
                  onEdit={(a) => {
                    setEditingActivity(a);
                    setModalOpen(true);
                  }}
                  onDelete={handleDelete}
                  onToggleSync={toggleLinkedInSync}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <ActivityModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          activity={editingActivity}
          onSubmit={editingActivity ? handleEditActivity : handleAddActivity}
        />
      </div>
    </div>
  );
};

export default Index;
