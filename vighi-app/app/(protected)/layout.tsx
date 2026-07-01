'use client';

import { useState } from 'react';
import AuthGuard from '@/components/layout/AuthGuard';
import Navbar from '@/components/layout/Navbar';
import SideNavbar from '@/components/layout/SideNavbar';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <Navbar onToggleSidebar={() => setSidebarOpen(o => !o)} />
      <SideNavbar open={sidebarOpen} />
      <main className={`app-main${sidebarOpen ? ' sb-open' : ''}`}>
        {children}
      </main>
    </AuthGuard>
  );
}
