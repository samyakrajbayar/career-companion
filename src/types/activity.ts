export type ActivityCategory = 
  | 'leadership'
  | 'volunteer'
  | 'sports'
  | 'clubs'
  | 'research'
  | 'arts';

export interface Activity {
  id: string;
  name: string;
  organization: string;
  role: string;
  category: ActivityCategory;
  startDate: string;
  endDate?: string;
  isOngoing: boolean;
  description: string;
  hours?: number;
  linkedInSynced: boolean;
  createdAt: string;
}

export const categoryLabels: Record<ActivityCategory, string> = {
  leadership: 'Leadership',
  volunteer: 'Volunteer',
  sports: 'Sports',
  clubs: 'Clubs & Organizations',
  research: 'Research',
  arts: 'Arts & Creative',
};

export const categoryIcons: Record<ActivityCategory, string> = {
  leadership: '👑',
  volunteer: '🤝',
  sports: '⚽',
  clubs: '🎯',
  research: '🔬',
  arts: '🎨',
};
