// Temperature reading from Firebase
export interface TemperatureReading {
  id: string;
  medicineId: string;
  medicineName: string;
  temperature: number;
  humidity: number;
  timestamp: string;
  location?: string;
  expiryDate?: string;
  batchNumber?: string;
}

// Alert severity levels
export type AlertSeverity = 'critical' | 'warning' | 'info';

// Alert interface
export interface Alert {
  id: string;
  medicineId: string;
  medicineName: string;
  type: 'temperature' | 'expiry' | 'supply';
  severity: AlertSeverity;
  message: string;
  value?: number;
  timestamp: string;
  resolved?: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
