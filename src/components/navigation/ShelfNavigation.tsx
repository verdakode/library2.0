'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const shelves = [
  { id: '000', name: 'Generalities' },
  { id: '100', name: 'Philosophy' },
  { id: '200', name: 'Spirituality' },
  { id: '300', name: 'Social' },
  { id: '400', name: 'Language' },
  { id: '500', name: 'Science' },
  { id: '600', name: 'Technology' },
  { id: '700', name: 'Arts' },
  { id: '800', name: 'Literature' },
  { id: '900', name: 'History' },
];

export const ShelfNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-amber-800/10 p-4 rounded-lg">
      <ul className="flex flex-col gap-2">
        {shelves.map((shelf) => {
          const href = `/shelves/${shelf.id}-${shelf.name.toLowerCase()}`;
          const isActive = pathname === href;

          return (
            <li key={shelf.id}>
              <Link
                href={href}
                className={`block px-4 py-2 rounded-lg transition-colors
                          ${isActive 
                            ? 'bg-amber-800 text-white' 
                            : 'hover:bg-amber-800/20 text-amber-900'
                          }`}
              >
                <span className="font-mono text-sm mr-2">{shelf.id}</span>
                {shelf.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}; 