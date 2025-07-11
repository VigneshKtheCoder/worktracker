
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, User, CheckCircle2, Clock, AlertTriangle, List } from 'lucide-react';

interface TaskFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  taskCounts: {
    all: number;
    school: number;
    personal: number;
    completed: number;
    pending: number;
    dueSoon: number;
    overdue: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', icon: List, count: taskCounts.all },
    { key: 'school', label: 'School', icon: GraduationCap, count: taskCounts.school },
    { key: 'personal', label: 'Personal', icon: User, count: taskCounts.personal },
    { key: 'pending', label: 'Pending', icon: Clock, count: taskCounts.pending },
    { key: 'completed', label: 'Completed', icon: CheckCircle2, count: taskCounts.completed },
    { key: 'dueSoon', label: 'Due Soon', icon: AlertTriangle, count: taskCounts.dueSoon },
    { key: 'overdue', label: 'Overdue', icon: AlertTriangle, count: taskCounts.overdue },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.key)}
          className={`relative ${
            activeFilter === filter.key 
              ? 'gradient-primary text-white' 
              : 'glass-effect hover:bg-primary/10'
          }`}
        >
          <filter.icon className="h-4 w-4 mr-2" />
          {filter.label}
          {filter.count > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5"
            >
              {filter.count}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
};

export default TaskFilter;
