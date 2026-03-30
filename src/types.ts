export interface Tool {
  id: string;
  title: string;
  url: string;
  icon: string;
  description: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  timestamp: number;
}

export type TabType = 'home' | 'notes' | 'quiz' | 'tools' | 'youtube' | 'timer';
