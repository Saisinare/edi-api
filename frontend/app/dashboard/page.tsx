'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { DataTable } from '@/components/DataTable';
import { FilterPanel } from '@/components/FilterPanel';
import { TemperatureReading } from '@/lib/types';
import { fetchAllData, fetchDataByDate } from '@/lib/api';
import { Thermometer } from 'lucide-react';

export default function DashboardPage() {
  const [allData, setAllData] = useState<TemperatureReading[]>([]);
  const [filteredData, setFilteredData] = useState<TemperatureReading[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');

  // Initial data load
  useEffect(() => {
    loadAllData();
  }, []);

  // Apply filters whenever data or filters change
  useEffect(() => {
    applyFilters();
  }, [allData, selectedDate, selectedMedicine]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllData();
      setAllData(data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = async (date: string) => {
    setSelectedDate(date);
    if (date) {
      setIsLoading(true);
      try {
        const data = await fetchDataByDate(date);
        setAllData(data);
      } catch (error) {
        console.error('Error loading data by date:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMedicineChange = (medicine: string) => {
    setSelectedMedicine(medicine);
  };

  const applyFilters = () => {
    let filtered = allData;

    if (selectedMedicine.trim()) {
      filtered = filtered.filter((item) =>
        item.medicineName.toLowerCase().includes(selectedMedicine.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleRefresh = () => {
    if (selectedDate) {
      handleDateChange(selectedDate);
    } else {
      loadAllData();
    }
  };

  // Calculate statistics
  const avgTemp = filteredData.length
    ? (filteredData.reduce((sum, item) => sum + item.temperature, 0) / filteredData.length).toFixed(1)
    : 'N/A';

  const safeReadings = filteredData.filter(
    (item) => item.temperature >= 2 && item.temperature <= 8
  ).length;

  const alertReadings = filteredData.filter(
    (item) => item.temperature < 2 || item.temperature > 8
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Unified Monitoring Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of environmental conditions and asset parameters across your facility
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Records</p>
                <p className="text-2xl font-bold text-foreground">{filteredData.length}</p>
              </div>
              <Thermometer className="w-8 h-8 text-primary opacity-30" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Average Temperature</p>
                <p className="text-2xl font-bold text-foreground">{avgTemp}°C</p>
              </div>
              <Thermometer className="w-8 h-8 text-primary opacity-30" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Safe Readings</p>
                <p className="text-2xl font-bold text-green-500">{safeReadings}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500/20" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Alert Readings</p>
                <p className="text-2xl font-bold text-red-500">{alertReadings}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-500/20" />
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          onDateChange={handleDateChange}
          onMedicineChange={handleMedicineChange}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

        {/* Data Table */}
        <div className="mt-8">
          <DataTable data={filteredData} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
