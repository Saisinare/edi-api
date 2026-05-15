'use client';

import Link from 'next/link';
import { Thermometer } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border/30 bg-gradient-to-r from-card to-card/50 backdrop-blur-sm sticky top-0 z-40 shadow-lg">
      <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition-opacity">
          <div className="p-2 bg-gradient-to-br from-primary to-primary/70 rounded-lg">
            <Thermometer className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Monitor</span>
        </Link>
        
        <ul className="flex items-center gap-8">
          <li>
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/70 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium relative group">
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/70 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link href="/alerts" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium relative group">
              Alerts
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/70 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
