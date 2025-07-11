
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  category: 'school' | 'personal';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: Date;
}

export type TaskCategory = 'school' | 'personal';
export type TaskPriority = 'low' | 'medium' | 'high';
