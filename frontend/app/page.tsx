import { Header } from '@/components/Header';
import Link from 'next/link';
import { Thermometer, TrendingUp, AlertCircle, BarChart3, Database, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 bg-primary/15 border border-primary/30 rounded-full">
              <span className="text-primary text-sm font-semibold">Professional Monitoring Solution</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8 text-balance leading-tight">
              Unified <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">Asset & Environmental</span> Monitoring
            </h1>
            <p className="text-lg text-muted-foreground mb-10 text-pretty leading-relaxed">
              Monitor temperature, humidity, and critical parameters across your entire operation. Track medicines, equipment, storage facilities, and more with real-time data visualization and intelligent alert management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-center hover:translate-y-[-2px]"
              >
                View Dashboard
              </Link>
              <Link
                href="/alerts"
                className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300 text-center hover:translate-y-[-2px]"
              >
                Check Alerts
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-gradient-to-br from-card to-card/50 rounded-xl p-7 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:translate-y-[-4px]">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Thermometer className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Temperature Monitoring</h3>
              <p className="text-sm text-muted-foreground">Precise readings with safe range alerts</p>
            </div>
            <div className="bg-gradient-to-br from-card to-card/50 rounded-xl p-7 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:translate-y-[-4px]">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Real-Time Tracking</h3>
              <p className="text-sm text-muted-foreground">Live data updates and insights</p>
            </div>
            <div className="bg-gradient-to-br from-card to-card/50 rounded-xl p-7 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:translate-y-[-4px]">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Smart Alerts</h3>
              <p className="text-sm text-muted-foreground">Multi-condition event notifications</p>
            </div>
            <div className="bg-gradient-to-br from-card to-card/50 rounded-xl p-7 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:translate-y-[-4px]">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Data Management</h3>
              <p className="text-sm text-muted-foreground">Comprehensive record archiving</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-secondary/50 to-background border-t border-border/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Why Choose Our Monitoring System?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade monitoring built for precision, reliability, and insight
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-card to-card/50 border border-border/30 rounded-xl p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:translate-y-[-4px]">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Thermometer className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Precision Monitoring</h3>
              <p className="text-muted-foreground leading-relaxed">
                Accurate temperature, humidity, and environmental readings meet pharmaceutical, laboratory, and industrial storage standards.
              </p>
            </div>

            <div className="bg-gradient-to-br from-card to-card/50 border border-border/30 rounded-xl p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:translate-y-[-4px]">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Instant Intelligence</h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time alerts and notifications for anomalies, compliance violations, and critical events across all monitored assets.
              </p>
            </div>

            <div className="bg-gradient-to-br from-card to-card/50 border border-border/30 rounded-xl p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:translate-y-[-4px]">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Comprehensive Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Detailed reporting, historical data analysis, and trend visualization for informed decision-making and compliance documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-2xl p-16 text-center shadow-2xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Start Monitoring Today</h2>
            <p className="text-lg text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Access comprehensive asset and environmental monitoring with real-time alerts and compliance-ready reporting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/95 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/alerts"
                className="px-8 py-4 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-all duration-300 hover:translate-y-[-2px]"
              >
                View Alerts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-muted-foreground">
            &copy; 2024 Unified Monitoring Platform. Professional-grade environmental and asset monitoring solution.
          </p>
        </div>
      </footer>
    </div>
  );
}
