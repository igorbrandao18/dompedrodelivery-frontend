import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function PageTitle({ children, className, size = 'lg' }: PageTitleProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <h1 className={cn(
      'font-bold text-gray-900',
      sizes[size],
      className
    )}>
      {children}
    </h1>
  );
}
