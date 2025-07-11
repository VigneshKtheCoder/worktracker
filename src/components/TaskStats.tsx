
import React from 'react';
import { Task } from '../types/Task';
import { differenceInDays, isPast, isToday } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertTriangle, BookOpen } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const dueSoonTasks = pendingTasks.filter(task => {
    const days = differenceInDays(task.dueDate, new Date());
    return days <= 3 && days >= 0;
  });
  const overdueTasks = pendingTasks.filter(task => 
    isPast(task.dueDate) && !isToday(task.dueDate)
  );
  const schoolTasks = tasks.filter(task => task.category === 'school');
  const personalTasks = tasks.filter(task => task.category === 'personal');

  const stats = [
    {
      label: 'Completed',
      value: completedTasks.length,
      total: tasks.length,
      icon: CheckCircle2,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Due Soon',
      value: dueSoonTasks.length,
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Overdue',
      value: overdueTasks.length,
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      label: 'School Work',
      value: schoolTasks.length,
      icon: BookOpen,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-effect p-4 text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor} mb-3`}>
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
          </div>
          <div className="space-y-1">
            <p className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
              {stat.total && (
                <span className="text-sm text-muted-foreground">/{stat.total}</span>
              )}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TaskStats;
