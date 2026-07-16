'use client';

import { useState } from 'react';
import AuthGuard from '@/components/layout/AuthGuard';
import Navbar from '@/components/layout/Navbar';
import SideNavbar from '@/components/layout/SideNavbar';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="print:hidden">
        <Navbar onToggleSidebar={() => setSidebarOpen(o => !o)} />
        <SideNavbar open={sidebarOpen} />
      </div>
      <main className={`app-main print:m-0 print:p-0 print:min-h-0${sidebarOpen ? ' sb-open' : ''}`}>
        {children}
      </main>
    </AuthGuard>
  );
}
