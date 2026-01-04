import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Activity, ActivityCategory } from '@/types/activity';
import { useActivities } from '@/hooks/useActivities';
import { Header } from '@/components/Header';
import { StatsOverview } from '@/components/StatsOverview';
import { ActivityCard } from '@/components/ActivityCard';
import { ActivityModal } from '@/components/ActivityModal';
import { CategoryFilter } from '@/components/CategoryFilter';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { activities, addActivity, updateActivity, deleteActivity, toggleLinkedInSync } = useActivities();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | 'all'>('all');
  const { toast } = useToast();

  const filteredActivities = useMemo(() => {
    if (selectedCategory === 'all') return activities;
    return activities.filter(a => a.category === selectedCategory);
  }, [activities, selectedCategory]);

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
      title: 'Activity Added',
      description: `"${data.name}" has been added to your activities.`,
    });
  };

  const handleEditActivity = (data: Omit<Activity, 'id' | 'createdAt' | 'linkedInSynced'>) => {
    if (editingActivity) {
      updateActivity(editingActivity.id, data);
      toast({
        title: 'Activity Updated',
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
      title: 'LinkedIn Sync',
      description: unsyncedCount > 0 
        ? `${unsyncedCount} activities marked for sync. Enable Cloud to connect to LinkedIn API.`
        : 'All activities are already synced!',
    });
  };

  const syncedCount = activities.filter(a => a.linkedInSynced).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl py-8 px-4">
        <Header 
          onSyncAll={handleSyncAll}
          syncedCount={syncedCount}
          totalCount={activities.length}
        />

        <StatsOverview activities={activities} />

        <div className="mt-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CategoryFilter
            selected={selectedCategory}
            onChange={setSelectedCategory}
            counts={categoryCounts}
          />
          <Button 
            onClick={() => {
              setEditingActivity(null);
              setModalOpen(true);
            }}
            className="gradient-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Activity
          </Button>
        </div>

        {filteredActivities.length === 0 ? (
          <EmptyState onAddActivity={() => setModalOpen(true)} />
        ) : (
          <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
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
