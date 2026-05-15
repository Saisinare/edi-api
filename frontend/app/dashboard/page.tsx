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

      <main className="px-6 py-12 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Unified Monitoring Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Real-time monitoring of environmental conditions and asset parameters across your facility
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-card to-card/50 border border-border/30 rounded-xl p-7 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:translate-y-[-4px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total Records</p>
                <p className="text-3xl font-bold text-foreground">{filteredData.length}</p>
              </div>
              <div className="p-3 bg-primary/15 rounded-lg">
                <Thermometer className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-card to-card/50 border border-border/30 rounded-xl p-7 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:translate-y-[-4px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Avg Temperature</p>
                <p className="text-3xl font-bold text-foreground">{avgTemp}°C</p>
              </div>
              <div className="p-3 bg-primary/15 rounded-lg">
                <Thermometer className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-card to-card/50 border border-border/30 rounded-xl p-7 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:translate-y-[-4px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Safe Readings</p>
                <p className="text-3xl font-bold text-green-500">{safeReadings}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <div className="w-5 h-5 rounded-full bg-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-card to-card/50 border border-border/30 rounded-xl p-7 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 hover:translate-y-[-4px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Alert Readings</p>
                <p className="text-3xl font-bold text-red-500">{alertReadings}</p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-lg">
                <div className="w-5 h-5 rounded-full bg-red-500" />
              </div>
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
