'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '#features', label: 'Recursos' },
  { href: '#steps', label: 'Como funciona' },
  { href: '#plans', label: 'Planos' },
  { href: '#contact', label: 'Contato' },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-lg font-black text-white shadow-lg">
            DP
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">Dom Pedro Delivery</p>
            <p className="text-xs text-gray-500">Tecnologia para restaurantes</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-gray-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="primary">
            <Link href="/auth/login">
              Login
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <div className="space-y-1">
            <div className={cn(
              "h-0.5 w-6 bg-gray-600 transition-all",
              isMobileMenuOpen && "rotate-45 translate-y-1.5"
            )} />
            <div className={cn(
              "h-0.5 w-6 bg-gray-600 transition-all",
              isMobileMenuOpen && "opacity-0"
            )} />
            <div className={cn(
              "h-0.5 w-6 bg-gray-600 transition-all",
              isMobileMenuOpen && "-rotate-45 -translate-y-1.5"
            )} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col gap-4 border-t border-orange-100 px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4">
              <Button asChild variant="primary" className="w-full">
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

