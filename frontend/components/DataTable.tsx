'use client';

import { TemperatureReading } from '@/lib/types';
import { formatDate, isTemperatureSafe } from '@/lib/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface DataTableProps {
  data: TemperatureReading[];
  isLoading?: boolean;
}

export function DataTable({ data, isLoading }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">Loading data...</div>
      ) : data.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">No data available</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Asset</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID/Batch</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Temperature</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Humidity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Expiry/Warranty</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Timestamp</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((reading) => (
                  <tr key={reading.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{reading.medicineName}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{reading.batchNumber || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm font-semibold">
                      <span className={isTemperatureSafe(reading.temperature) ? 'text-green-400' : 'text-red-400'}>
                        {reading.temperature.toFixed(1)}°C
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{reading.humidity.toFixed(1)}%</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{reading.location || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{reading.expiryDate || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(reading.timestamp)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isTemperatureSafe(reading.temperature)
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {isTemperatureSafe(reading.temperature) ? 'Safe' : 'Alert'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages} ({data.length} total records)
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1 rounded border border-border hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-1 rounded border border-border hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
