
import React, { useState } from 'react';
import { format, differenceInDays, isPast, isToday } from 'date-fns';
import { Calendar, Clock, Edit3, Trash2, GraduationCap, User, CheckCircle2, Circle } from 'lucide-react';
import { Task } from '../types/Task';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const daysUntilDue = differenceInDays(task.dueDate, new Date());
  const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;
  const isOverdue = isPast(task.dueDate) && !isToday(task.dueDate);
  
  const getCardClasses = () => {
    let baseClasses = "glass-effect transition-all duration-300 hover:scale-[1.02] cursor-pointer";
    
    if (task.completed) {
      baseClasses += " opacity-60";
    } else if (isOverdue) {
      baseClasses += " overdue-glow border-red-500/30";
    } else if (isDueSoon) {
      baseClasses += " due-soon-glow border-yellow-500/30";
    } else {
      baseClasses += " task-glow border-primary/20";
    }
    
    return baseClasses;
  };
  
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusText = () => {
    if (task.completed) return 'Completed';
    if (isOverdue) return 'Overdue';
    if (isDueSoon) return 'Due Soon';
    return `${daysUntilDue} days left`;
  };
  
  const getStatusColor = () => {
    if (task.completed) return 'text-green-400';
    if (isOverdue) return 'text-red-400';
    if (isDueSoon) return 'text-yellow-400';
    return 'text-blue-400';
  };

  return (
    <Card 
      className={getCardClasses()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggleComplete(task.id)}
              className="text-primary hover:text-accent transition-colors"
            >
              {task.completed ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <Circle className="h-6 w-6" />
              )}
            </button>
            <div>
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getPriorityColor()}`} />
            {task.category === 'school' ? (
              <GraduationCap className="h-5 w-5 text-primary" />
            ) : (
              <User className="h-5 w-5 text-accent" />
            )}
          </div>
        </div>
        
        {/* Due Date and Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(task.dueDate, 'MMM dd, yyyy')}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>
        
        {/* Category and Actions */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="capitalize">
            {task.category}
          </Badge>
          
          {isHovered && (
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(task)}
                className="hover:bg-primary/20"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(task.id)}
                className="hover:bg-red-500/20 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
