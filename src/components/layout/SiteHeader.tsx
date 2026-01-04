'use client';

import { useState } from 'react';
import Image from 'next/image';
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
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
            <Image
              src="/logo.png"
              alt="Dom Pedro Delivery"
              width={48}
              height={48}
              className="h-full w-full object-contain"
              priority
            />
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
          <a
            href="/auth/login"
            className="rounded-2xl bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700"
          >
            Login
          </a>
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
              <a
                href="/auth/login"
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors text-center block"
              >
                Login
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

