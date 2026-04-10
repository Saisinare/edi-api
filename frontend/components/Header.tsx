'use client';

import Link from 'next/link';
import { Thermometer } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-40">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Thermometer className="w-6 h-6 text-primary" />
          <span className="text-foreground">Monitor</span>
        </Link>
        
        <ul className="flex items-center gap-8">
          <li>
            <Link href="/" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/alerts" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Alerts
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
