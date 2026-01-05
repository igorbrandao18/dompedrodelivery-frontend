'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormCardProps {
  logoSrc: string;
  logoAlt: string;
  title: string;
  subtitle?: string;
  message?: string;
  children: ReactNode;
}

export function FormCard({ logoSrc, logoAlt, title, subtitle, message, children }: FormCardProps) {
  return (
    <div className="w-full max-w-md">
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={80}
              height={80}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
          {subtitle ? <p className="text-gray-600">{subtitle}</p> : null}
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          {message ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-green-800 text-sm font-medium">{message}</p>
            </div>
          ) : null}

          {children}
        </CardContent>
      </Card>
    </div>
  );
}
