'use client';

import { Alert } from '@/lib/types';
import { getSeverityColor, getSeverityBadgeColor, formatDate } from '@/lib/api';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
  const getAlertIcon = () => {
    switch (alert.severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className={`border rounded-lg p-4 flex items-start gap-4 bg-card ${getSeverityColor(alert.severity)}`}>
      <div className="flex-shrink-0 mt-0.5">
        {getAlertIcon()}
      </div>
      <div className="flex-grow">
        <div className="flex items-start justify-between">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{alert.medicineName}</h3>
              <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${getSeverityBadgeColor(alert.severity)}`}>
                {alert.severity.toUpperCase()}
              </span>
            </div>
            <p className="text-sm mb-2 text-muted-foreground opacity-90">{alert.message}</p>
            <p className="text-xs text-muted-foreground opacity-75">
              <span className="font-medium">Asset ID:</span> {alert.medicineId} • <span className="font-medium">Time:</span> {formatDate(alert.timestamp)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
