'use client';

import type { ReactNode } from 'react';

export interface IconCardItem {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

interface IconCardsGridProps {
  items: IconCardItem[];
  className?: string;
}

export function IconCardsGrid({ items, className }: IconCardsGridProps) {
  return (
    <div className={className ?? 'grid grid-cols-3 gap-6 max-w-sm mx-auto'}>
      {items.map((item) => (
        <div key={item.title} className="text-center p-4 bg-white rounded-xl shadow-sm">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            {item.icon}
          </div>
          <div className="text-lg font-bold text-gray-900">{item.title}</div>
          {item.subtitle ? <p className="text-sm text-gray-500">{item.subtitle}</p> : null}
        </div>
      ))}
    </div>
  );
}
