import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SectionTitle({ children, className, size = 'md' }: SectionTitleProps) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <h3 className={cn(
      'font-semibold text-gray-900',
      sizes[size],
      className
    )}>
      {children}
    </h3>
  );
}
