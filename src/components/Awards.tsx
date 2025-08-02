import React from 'react';
import { Trophy, Medal, Crown, Star, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Award {
  id: string;
  name: string;
  description: string;
  requirement: number;
  icon: React.ReactNode;
  bgClass: string;
  textClass: string;
  achieved: boolean;
}

interface AwardsProps {
  isOpen: boolean;
  onClose: () => void;
  totalCompleted: number;
}

const Awards: React.FC<AwardsProps> = ({ isOpen, onClose, totalCompleted }) => {
  const awards: Award[] = [
    {
      id: 'first-step',
      name: 'First Step',
      description: 'Complete your first task',
      requirement: 1,
      icon: <Star className="h-6 w-6" />,
      bgClass: 'bg-gradient-to-br from-slate-100 to-slate-200',
      textClass: 'text-slate-800',
      achieved: totalCompleted >= 1,
    },
    {
      id: 'getting-started',
      name: 'Getting Started',
      description: 'Complete 10 tasks',
      requirement: 10,
      icon: <Trophy className="h-6 w-6" />,
      bgClass: 'bg-gradient-to-br from-amber-100 to-amber-200',
      textClass: 'text-amber-800',
      achieved: totalCompleted >= 10,
    },
    {
      id: 'task-master',
      name: 'Task Master',
      description: 'Complete 100 tasks',
      requirement: 100,
      icon: <Medal className="h-6 w-6" />,
      bgClass: 'bg-gradient-to-br from-orange-200 to-red-300',
      textClass: 'text-red-800',
      achieved: totalCompleted >= 100,
    },
    {
      id: 'productivity-hero',
      name: 'Productivity Hero',
      description: 'Complete 500 tasks',
      requirement: 500,
      icon: <Crown className="h-6 w-6" />,
      bgClass: 'bg-gradient-to-br from-purple-200 to-purple-400',
      textClass: 'text-purple-900',
      achieved: totalCompleted >= 500,
    },
    {
      id: 'legendary-achiever',
      name: 'Legendary Achiever',
      description: 'Complete 1,000 tasks',
      requirement: 1000,
      icon: <Sparkles className="h-6 w-6" />,
      bgClass: 'bg-gradient-to-br from-blue-300 to-cyan-400',
      textClass: 'text-blue-900',
      achieved: totalCompleted >= 1000,
    },
    {
      id: 'ultimate-legend',
      name: 'Ultimate Legend',
      description: 'Complete 10,000 tasks',
      requirement: 10000,
      icon: <Crown className="h-8 w-8" />,
      bgClass: 'bg-gradient-to-br from-emerald-300 to-teal-400 shadow-lg shadow-emerald-500/50',
      textClass: 'text-emerald-900',
      achieved: totalCompleted >= 10000,
    },
    {
      id: 'cosmic-master',
      name: 'Cosmic Master',
      description: 'Complete 100,000 tasks',
      requirement: 100000,
      icon: <Star className="h-10 w-10" />,
      bgClass: 'bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 shadow-xl shadow-purple-500/50 animate-pulse',
      textClass: 'text-white',
      achieved: totalCompleted >= 100000,
    },
    {
      id: 'godlike-entity',
      name: 'Godlike Entity',
      description: 'Complete 1,000,000 tasks',
      requirement: 1000000,
      icon: <Crown className="h-12 w-12" />,
      bgClass: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 shadow-2xl shadow-orange-500/70 animate-pulse border-4 border-yellow-300',
      textClass: 'text-white font-bold',
      achieved: totalCompleted >= 1000000,
    },
  ];

  if (!isOpen) return null;

  const achievedCount = awards.filter(award => award.achieved).length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-effect rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">🏆 Awards</h2>
            <p className="text-muted-foreground">
              You've achieved {achievedCount} out of {awards.length} awards • {totalCompleted.toLocaleString()} tasks completed
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-destructive/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {awards.map((award) => (
            <div
              key={award.id}
              className={`
                relative p-6 rounded-xl transition-all duration-300 hover:scale-105
                ${award.bgClass}
                ${award.achieved ? 'opacity-100' : 'opacity-40 grayscale'}
              `}
            >
              {award.achieved && (
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white border-green-600">
                  ✓ Unlocked
                </Badge>
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className={`${award.textClass} mb-3`}>
                  {award.icon}
                </div>
                
                <h3 className={`text-lg font-bold mb-2 ${award.textClass}`}>
                  {award.name}
                </h3>
                
                <p className={`text-sm mb-3 ${award.textClass} opacity-80`}>
                  {award.description}
                </p>
                
                <div className={`text-xs font-semibold ${award.textClass}`}>
                  {award.requirement.toLocaleString()} tasks
                </div>
                
                {!award.achieved && (
                  <div className="mt-2 w-full bg-black/20 rounded-full h-2">
                    <div 
                      className="bg-current h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min((totalCompleted / award.requirement) * 100, 100)}%` 
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Awards;