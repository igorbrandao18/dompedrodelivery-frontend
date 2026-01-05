import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  actions?: ReactNode;
  className?: string;
}

export function DashboardLayout({ 
  children, 
  title, 
  actions, 
  className 
}: DashboardLayoutProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between">
          {title && (
            <h1 className="text-2xl font-bold text-gray-900">
              {title}
            </h1>
          )}
          {actions && (
            <div className="flex items-center gap-3">
              {actions}
            </div>
          )}
        </div>
      )}
      
      {children}
    </div>
  );
}
