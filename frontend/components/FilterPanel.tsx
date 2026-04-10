'use client';

import { useState } from 'react';
import { Search, Loader } from 'lucide-react';

interface FilterPanelProps {
  onDateChange: (date: string) => void;
  onMedicineChange: (medicine: string) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function FilterPanel({ 
  onDateChange, 
  onMedicineChange, 
  onRefresh,
  isLoading 
}: FilterPanelProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  const handleMedicineChange = (medicine: string) => {
    setSelectedMedicine(medicine);
    onMedicineChange(medicine);
  };

  const handleReset = () => {
    setSelectedDate('');
    setSelectedMedicine('');
    onDateChange('');
    onMedicineChange('');
  };

  return (
    <div className="border border-border rounded-lg p-6 bg-secondary">
      <h2 className="text-lg font-semibold text-foreground mb-4">Data Filters</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Filter by Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Asset Search Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Search Asset Name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Enter asset name..."
              value={selectedMedicine}
              onChange={(e) => handleMedicineChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-end gap-2">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            {isLoading && <Loader className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 border border-border text-foreground rounded-md hover:bg-border transition-colors text-sm font-medium"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
