'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useLogout } from '@/application/hooks/useLogout';

const navigation = [
  {
    name: 'Meus Pedidos',
    href: '/dashboard',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />
      </svg>
    ),
  },
  {
    name: 'Categorias',
    href: '/dashboard/categorias',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
];

interface SidebarNavContentProps {
  mobile?: boolean;
  pathname: string;
  onClose: () => void;
  onLogout: () => void;
  isLoggingOut: boolean;
}

function SidebarLogo({ mobile, onClose }: { mobile: boolean; onClose: () => void }) {
  return (
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
          className="absolute right-6 p-1 rounded-md hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

function SidebarNav({ pathname, mobile, onClose }: { pathname: string; mobile: boolean; onClose: () => void }) {
  return (
    <nav className="flex-1 px-4 py-2">
      <div className="space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (pathname !== item.href && pathname.startsWith(item.href + '/'));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => mobile && onClose()}
            >
              <div className={`transition-transform duration-200 ${
                isActive ? 'scale-110' : 'group-hover:scale-105'
              }`}>
                {item.icon}
              </div>
              <span className="flex-1 font-medium">{item.name}</span>
              {isActive && (
                <div className="w-2 h-2 rounded-full bg-white/80" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function SidebarUserSection({ onLogout, isLoggingOut }: { onLogout: () => void; isLoggingOut: boolean }) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const loadUser = () => {
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            const parsedUser = JSON.parse(userData);
            setUser({
              name: parsedUser.name || 'User',
              email: parsedUser.email || 'user@example.com'
            });
          } catch {
            setUser({
              name: 'User',
              email: 'user@example.com'
            });
          }
        }
      }
    };

    loadUser();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="p-4 border-t border-white/20">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center ring-2 ring-white/20">
            <span className="text-sm font-semibold text-white">
              {user ? getInitials(user.name) : 'U'}
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-orange-600"></div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {user?.name || 'User'}
          </p>
          <p className="text-xs text-white/70 truncate">
            {user?.email || 'user@example.com'}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          onClick={onLogout}
          disabled={isLoggingOut}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

function SidebarNavContent({
  mobile = false,
  pathname,
  onClose,
  onLogout,
  isLoggingOut,
}: SidebarNavContentProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-orange-600 to-orange-700">
      <SidebarLogo mobile={mobile} onClose={onClose} />
      <SidebarNav pathname={pathname} mobile={mobile} onClose={onClose} />
      <SidebarUserSection onLogout={onLogout} isLoggingOut={isLoggingOut} />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, isLoggingOut } = useLogout();

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden">
          <SidebarNavContent
            mobile
            pathname={pathname}
            onClose={closeSidebar}
            onLogout={logout}
            isLoggingOut={isLoggingOut}
          />
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-72">
        <SidebarNavContent
          pathname={pathname}
          onClose={closeSidebar}
          onLogout={logout}
          isLoggingOut={isLoggingOut}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="relative flex-1 overflow-y-auto bg-gray-50">
          {/* Floating mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="fixed left-4 top-4 z-50 bg-white/90 backdrop-blur-sm text-gray-700 shadow-lg hover:bg-white lg:hidden border border-gray-200"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
