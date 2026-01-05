'use client';

import type { ReactNode } from 'react';

interface SplitLayoutProps {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function SplitLayout({ left, right, className, containerClassName }: SplitLayoutProps) {
  return (
    <div className={className ?? 'flex items-center justify-center px-4 py-12 min-h-screen'}>
      <div className={containerClassName ?? 'w-full max-w-6xl'}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {left}
          {right}
        </div>
      </div>
    </div>
  );
}
