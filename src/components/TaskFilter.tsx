
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, User, CheckCircle2, Clock, AlertTriangle, List, Trash2 } from 'lucide-react';

interface TaskFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onClearCompleted: () => void;
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

const TaskFilter: React.FC<TaskFilterProps> = ({ 
  activeFilter, 
  onFilterChange, 
  onClearCompleted,
  taskCounts 
}) => {
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
    <div className="flex justify-center mb-6">
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {filters.map((filter) => (
          <div key={filter.key} className="flex items-center gap-2">
            <Button
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
            
            {/* Clear Completed Button - only show in completed section */}
            {filter.key === 'completed' && activeFilter === 'completed' && taskCounts.completed > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearCompleted}
                className="glass-effect hover:bg-destructive/10 hover:text-destructive border-destructive/20 p-2 group"
                title="Clear all completed tasks"
              >
                <Trash2 className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
