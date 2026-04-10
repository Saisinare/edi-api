'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { AlertCard } from '@/components/AlertCard';
import { Alert, AlertSeverity } from '@/lib/types';
import { fetchAllData, generateAlerts } from '@/lib/api';
import { AlertCircle, Loader } from 'lucide-react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState<AlertSeverity | 'all'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'temperature' | 'expiry' | 'supply'>('all');

  // Initial load
  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllData();
      const generatedAlerts = generateAlerts(data);
      setAlerts(generatedAlerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    const severityMatch = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const typeMatch = selectedType === 'all' || alert.type === selectedType;
    return severityMatch && typeMatch;
  });

  // Count alerts by severity
  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const warningCount = alerts.filter((a) => a.severity === 'warning').length;
  const infoCount = alerts.filter((a) => a.severity === 'info').length;

  // Count alerts by type
  const tempCount = alerts.filter((a) => a.type === 'temperature').length;
  const expiryCount = alerts.filter((a) => a.type === 'expiry').length;
  const supplyCount = alerts.filter((a) => a.type === 'supply').length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Alert Management System</h1>
          <p className="text-muted-foreground">
            Monitor all critical events: parameter violations, status changes, and maintenance alerts
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6 hover:border-red-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Critical Alerts</p>
                <p className="text-3xl font-bold text-red-400">{criticalCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500/30" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:border-yellow-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Warnings</p>
                <p className="text-3xl font-bold text-yellow-400">{warningCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500/30" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Info Alerts</p>
                <p className="text-3xl font-bold text-primary">{infoCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-primary/30" />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-secondary border border-border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Alert Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Severity Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Filter by Severity
              </label>
              <div className="flex flex-wrap gap-2">
                {['all', 'critical', 'warning', 'info'].map((severity) => (
                  <button
                    key={severity}
                    onClick={() => setSelectedSeverity(severity as AlertSeverity | 'all')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedSeverity === severity
                        ? severity === 'all'
                          ? 'bg-primary text-primary-foreground'
                          : severity === 'critical'
                          ? 'bg-red-600 text-red-100'
                          : severity === 'warning'
                          ? 'bg-yellow-600 text-yellow-100'
                          : 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border text-foreground hover:bg-border'
                    }`}
                  >
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Filter by Type
              </label>
              <div className="flex flex-wrap gap-2">
                {['all', 'temperature', 'expiry', 'supply'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type as 'all' | 'temperature' | 'expiry' | 'supply')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedType === type
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border text-foreground hover:bg-border'
                    }`}
                  >
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Type Stats */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground mb-3">Alert Type Distribution</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-sm text-foreground">Temperature: {tempCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm text-foreground">Expiry: {expiryCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="text-sm text-foreground">Supply: {supplyCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              {filteredAlerts.length} Alert{filteredAlerts.length !== 1 ? 's' : ''} Found
            </h2>
            <button
              onClick={loadAlerts}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {isLoading && <Loader className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          ) : filteredAlerts.length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-lg border border-border">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No alerts found</p>
              <p className="text-sm text-muted-foreground mt-1">
                {alerts.length === 0
                  ? 'All monitored assets are within safe parameters'
                  : 'Try adjusting your filters'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
