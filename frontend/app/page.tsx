import { Header } from '@/components/Header';
import Link from 'next/link';
import { Thermometer, TrendingUp, AlertCircle, BarChart3, Database, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Unified Asset & Environmental Monitoring Platform
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Monitor temperature, humidity, and critical parameters across your entire operation. Track medicines, equipment, storage facilities, and more with real-time data visualization and intelligent alert management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
              >
                View Dashboard
              </Link>
              <Link
                href="/alerts"
                className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-center"
              >
                Check Alerts
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-lg p-6 border border-border/50 hover:border-primary/50 transition-colors">
              <Thermometer className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Temperature Monitoring</h3>
              <p className="text-sm text-muted-foreground">Precise readings with safe range alerts</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border/50 hover:border-primary/50 transition-colors">
              <TrendingUp className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Real-Time Tracking</h3>
              <p className="text-sm text-muted-foreground">Live data updates and insights</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border/50 hover:border-primary/50 transition-colors">
              <AlertCircle className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Smart Alerts</h3>
              <p className="text-sm text-muted-foreground">Multi-condition event notifications</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border/50 hover:border-primary/50 transition-colors">
              <Database className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Data Management</h3>
              <p className="text-sm text-muted-foreground">Comprehensive record archiving</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-secondary border-t border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Why Choose Our Monitoring System?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Thermometer className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Precision Monitoring</h3>
              <p className="text-muted-foreground">
                Accurate temperature, humidity, and environmental readings meet pharmaceutical, laboratory, and industrial storage standards.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Instant Intelligence</h3>
              <p className="text-muted-foreground">
                Real-time alerts and notifications for anomalies, compliance violations, and critical events across all monitored assets.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Comprehensive Analytics</h3>
              <p className="text-muted-foreground">
                Detailed reporting, historical data analysis, and trend visualization for informed decision-making and compliance documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Start Monitoring Today</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Access comprehensive asset and environmental monitoring with real-time alerts and compliance-ready reporting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/alerts"
              className="px-6 py-3 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              View Alerts
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 Unified Monitoring Platform. Professional-grade environmental and asset monitoring solution.</p>
        </div>
      </footer>
    </div>
  );
}
