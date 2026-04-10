import { TemperatureReading, Alert, AlertSeverity } from './types';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://edi-api-one.vercel.app').replace(/\/$/, '');

function toNumber(value: unknown, fallback = 0): number {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function normalizeReading(raw: any): TemperatureReading {
  return {
    id: String(raw?.id ?? ''),
    medicineId: String(raw?.medicineId ?? raw?.id ?? ''),
    medicineName: String(raw?.medicineName ?? raw?.name ?? 'N/A'),
    temperature: toNumber(raw?.temperature, 0),
    humidity: toNumber(raw?.humidity, 0),
    timestamp: String(raw?.timestamp ?? raw?.createdAt ?? new Date().toISOString()),
    location: raw?.location,
    expiryDate: raw?.expiryDate,
    batchNumber: raw?.batchNumber,
  };
}

// Fetch all data from Firebase
export async function fetchAllData(): Promise<TemperatureReading[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/data`);
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    const records = Array.isArray(data) ? data : data.data || [];
    return records.map(normalizeReading);
  } catch (error) {
    console.error('Error fetching all data:', error);
    return [];
  }
}

// Fetch data by specific date
export async function fetchDataByDate(date: string): Promise<TemperatureReading[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/data/filter?date=${date}`);
    if (!response.ok) throw new Error('Failed to fetch data by date');
    const data = await response.json();
    const records = Array.isArray(data) ? data : data.data || [];
    return records.map(normalizeReading);
  } catch (error) {
    console.error('Error fetching data by date:', error);
    return [];
  }
}

// Fetch single record by ID
export async function fetchDataById(id: string): Promise<TemperatureReading | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/data/${id}`);
    if (!response.ok) throw new Error('Failed to fetch data by ID');
    const data = await response.json();
    const record = data?.data ?? data;
    return record ? normalizeReading(record) : null;
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    return null;
  }
}

// Generate alerts based on readings
export function generateAlerts(readings: TemperatureReading[]): Alert[] {
  const alerts: Alert[] = [];
  const SAFE_TEMP_MIN = 2;
  const SAFE_TEMP_MAX = 8;
  const EXPIRY_WARNING_DAYS = 30;

  readings.forEach((reading) => {
    // Temperature violation alert
    if (reading.temperature < SAFE_TEMP_MIN || reading.temperature > SAFE_TEMP_MAX) {
      alerts.push({
        id: `temp-${reading.id}`,
        medicineId: reading.medicineId,
        medicineName: reading.medicineName,
        type: 'temperature',
        severity: reading.temperature < 0 || reading.temperature > 10 ? 'critical' : 'warning',
        message: `Temperature out of range: ${reading.temperature}°C (Safe range: ${SAFE_TEMP_MIN}-${SAFE_TEMP_MAX}°C)`,
        value: reading.temperature,
        timestamp: reading.timestamp,
      });
    }

    // Expiry warning alert
    if (reading.expiryDate) {
      const expiryDate = new Date(reading.expiryDate);
      const today = new Date();
      const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      if (daysUntilExpiry < 0) {
        alerts.push({
          id: `expiry-${reading.id}`,
          medicineId: reading.medicineId,
          medicineName: reading.medicineName,
          type: 'expiry',
          severity: 'critical',
          message: `Medicine expired ${Math.abs(daysUntilExpiry)} days ago`,
          timestamp: reading.timestamp,
        });
      } else if (daysUntilExpiry <= EXPIRY_WARNING_DAYS) {
        alerts.push({
          id: `expiry-warn-${reading.id}`,
          medicineId: reading.medicineId,
          medicineName: reading.medicineName,
          type: 'expiry',
          severity: 'warning',
          message: `Medicine expires in ${daysUntilExpiry} days (${reading.expiryDate})`,
          timestamp: reading.timestamp,
        });
      }
    }
  });

  return alerts;
}

// Get severity color
export function getSeverityColor(severity: AlertSeverity): string {
  switch (severity) {
    case 'critical':
      return 'border-red-500/50 text-red-400';
    case 'warning':
      return 'border-yellow-500/50 text-yellow-400';
    case 'info':
      return 'border-blue-500/50 text-blue-400';
    default:
      return 'border-gray-500/50 text-gray-400';
  }
}

// Get severity badge color
export function getSeverityBadgeColor(severity: AlertSeverity): string {
  switch (severity) {
    case 'critical':
      return 'bg-red-600 text-red-100';
    case 'warning':
      return 'bg-yellow-600 text-yellow-100';
    case 'info':
      return 'bg-blue-600 text-blue-100';
    default:
      return 'bg-gray-600 text-gray-100';
  }
}

// Format date for display
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

// Check if temperature is safe
export function isTemperatureSafe(temp: number): boolean {
  return temp >= 2 && temp <= 8;
}
