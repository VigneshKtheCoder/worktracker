
import React, { useState, useEffect } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Task } from '../types/Task';
import { differenceInDays, isPast, isToday } from 'date-fns';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskStats from '../components/TaskStats';
import TaskFilter from '../components/TaskFilter';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [activeFilter, setActiveFilter] = useState('all');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('study-tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        dueDate: new Date(task.dueDate),
        createdAt: new Date(task.createdAt),
      }));
      setTasks(parsedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('study-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...taskData, id: editingTask.id, createdAt: editingTask.createdAt }
          : task
      ));
      toast({
        title: "Task Updated! ✨",
        description: "Your task has been successfully updated.",
      });
    } else {
      // Create new task
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setTasks([newTask, ...tasks]);
      toast({
        title: "Task Created! 🎉",
        description: "Your new task has been added to your list.",
      });
    }
    
    setShowForm(false);
    setEditingTask(undefined);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task Deleted",
      description: "Task has been removed from your list.",
      variant: "destructive",
    });
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ));
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task Reopened" : "Task Completed! 🎉",
        description: task.completed 
          ? "Task has been marked as incomplete." 
          : "Great job on completing your task!",
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'school':
        return tasks.filter(task => task.category === 'school');
      case 'personal':
        return tasks.filter(task => task.category === 'personal');
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'dueSoon':
        return tasks.filter(task => {
          if (task.completed) return false;
          const days = differenceInDays(task.dueDate, new Date());
          return days <= 3 && days >= 0;
        });
      case 'overdue':
        return tasks.filter(task => 
          !task.completed && isPast(task.dueDate) && !isToday(task.dueDate)
        );
      default:
        return tasks;
    }
  };

  const getTaskCounts = () => {
    const pendingTasks = tasks.filter(task => !task.completed);
    const dueSoonTasks = pendingTasks.filter(task => {
      const days = differenceInDays(task.dueDate, new Date());
      return days <= 3 && days >= 0;
    });
    const overdueTasks = pendingTasks.filter(task => 
      isPast(task.dueDate) && !isToday(task.dueDate)
    );

    return {
      all: tasks.length,
      school: tasks.filter(task => task.category === 'school').length,
      personal: tasks.filter(task => task.category === 'personal').length,
      completed: tasks.filter(task => task.completed).length,
      pending: pendingTasks.length,
      dueSoon: dueSoonTasks.length,
      overdue: overdueTasks.length,
    };
  };

  const filteredTasks = getFilteredTasks();
  const taskCounts = getTaskCounts();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent">
              StudyFlow
            </h1>
            <Sparkles className="h-8 w-8 text-accent ml-3" />
          </div>
          <p className="text-xl text-muted-foreground">
            Master your time, ace your goals ✨
          </p>
        </div>

        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Add Task Button */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={() => setShowForm(true)}
            className="gradient-primary hover:opacity-90 transition-all duration-300 hover:scale-105 px-8 py-3 text-lg font-semibold"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Task
          </Button>
        </div>

        {/* Filters */}
        <TaskFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          taskCounts={taskCounts}
        />

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-4">
                {activeFilter === 'all' 
                  ? "Start by creating your first task!" 
                  : `No ${activeFilter} tasks yet.`}
              </p>
              {activeFilter === 'all' && (
                <Button
                  onClick={() => setShowForm(true)}
                  variant="outline"
                  className="hover:bg-primary/10"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}

        {/* Task Form Modal */}
        {showForm && (
          <TaskForm
            task={editingTask}
            onSave={handleSaveTask}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
