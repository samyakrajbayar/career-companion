import { useState, useEffect } from 'react';
import { Activity } from '@/types/activity';

const STORAGE_KEY = 'extracurriculars';

const defaultActivities: Activity[] = [
  {
    id: '1',
    name: 'Student Government',
    organization: 'University Student Association',
    role: 'Vice President',
    category: 'leadership',
    startDate: '2023-09',
    isOngoing: true,
    description: 'Lead initiatives to improve campus life, organize events, and represent student interests to administration.',
    hours: 320,
    linkedInSynced: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Habitat for Humanity',
    organization: 'Local Chapter',
    role: 'Build Team Lead',
    category: 'volunteer',
    startDate: '2022-06',
    endDate: '2023-08',
    isOngoing: false,
    description: 'Coordinated weekend builds and managed volunteer teams of 15+ members.',
    hours: 200,
    linkedInSynced: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Machine Learning Research',
    organization: 'Computer Science Department',
    role: 'Research Assistant',
    category: 'research',
    startDate: '2024-01',
    isOngoing: true,
    description: 'Conducting research on natural language processing applications in healthcare.',
    hours: 150,
    linkedInSynced: true,
    createdAt: new Date().toISOString(),
  },
];

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setActivities(JSON.parse(stored));
    } else {
      setActivities(defaultActivities);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultActivities));
    }
    setIsLoading(false);
  }, []);

  const saveActivities = (newActivities: Activity[]) => {
    setActivities(newActivities);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newActivities));
  };

  const addActivity = (activity: Omit<Activity, 'id' | 'createdAt' | 'linkedInSynced'>) => {
    const newActivity: Activity = {
      ...activity,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      linkedInSynced: false,
    };
    saveActivities([newActivity, ...activities]);
    return newActivity;
  };

  const updateActivity = (id: string, updates: Partial<Activity>) => {
    const updated = activities.map(a => 
      a.id === id ? { ...a, ...updates } : a
    );
    saveActivities(updated);
  };

  const deleteActivity = (id: string) => {
    saveActivities(activities.filter(a => a.id !== id));
  };

  const toggleLinkedInSync = (id: string) => {
    const activity = activities.find(a => a.id === id);
    if (activity) {
      updateActivity(id, { linkedInSynced: !activity.linkedInSynced });
    }
  };

  return {
    activities,
    isLoading,
    addActivity,
    updateActivity,
    deleteActivity,
    toggleLinkedInSync,
  };
}
