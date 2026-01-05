'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const navigation = [
  {
    name: 'Meus Pedidos',
    href: '/dashboard',
  },
];

interface SidebarNavContentProps {
  mobile?: boolean;
  pathname: string;
  onClose: () => void;
}

function SidebarNavContent({ mobile = false, pathname, onClose }: SidebarNavContentProps) {
  return (
    <div className="flex flex-col h-full bg-orange-600">
      {/* Logo */}
      <div className="relative flex items-center justify-center p-6 border-b border-white/20">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
          <Image
            src="/logo.png"
            alt="Dom Pedro Delivery"
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
        </div>
        {mobile && (
          <button
            onClick={onClose}
            className="absolute right-6 p-1 rounded-md hover:bg-white/10"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <div key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm ${
                  isActive
                    ? 'bg-white text-orange-700'
                    : 'bg-white/95 text-gray-900 hover:bg-white'
                }`}
                onClick={() => mobile && onClose()}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4"
                  />
                </svg>
                <span>{item.name}</span>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
            <span className="text-sm font-medium text-white">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-white/80 truncate">admin@exemplo.com</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
          <SidebarNavContent mobile pathname={pathname} onClose={closeSidebar} />
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64">
        <SidebarNavContent pathname={pathname} onClose={closeSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="relative flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Floating mobile menu button (no header bar) */}
          <Button
            variant="ghost"
            size="sm"
            className="fixed left-3 top-3 z-50 bg-white/90 text-gray-700 shadow-sm hover:bg-white lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
          {children}
        </main>
      </div>
    </div>
  );
}
