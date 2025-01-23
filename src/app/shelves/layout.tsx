import React from 'react';
import { ShelfNavigation } from '@/components/navigation/ShelfNavigation';

export default function ShelvesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <ShelfNavigation />
          </aside>
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 