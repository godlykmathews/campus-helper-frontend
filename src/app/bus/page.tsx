'use client';

import { useState, useEffect } from 'react';
import { busService } from '@/services/bus';
import { BusSchedule } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Bus, Clock, MapPin, Hash } from 'lucide-react';

export default function BusPage() {
  const [busSchedules, setBusSchedules] = useState<BusSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchRoute, setSearchRoute] = useState('');
  const [filteredSchedules, setFilteredSchedules] = useState<BusSchedule[]>([]);

  useEffect(() => {
    fetchBusSchedules();
  }, []);

  useEffect(() => {
    if (searchRoute.trim()) {
      const filtered = busSchedules.filter(schedule =>
        schedule.route.toLowerCase().includes(searchRoute.toLowerCase())
      );
      setFilteredSchedules(filtered);
    } else {
      setFilteredSchedules(busSchedules);
    }
  }, [searchRoute, busSchedules]);

  const fetchBusSchedules = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await busService.getAllBusSchedules();
      setBusSchedules(data);
      setFilteredSchedules(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch bus schedules');
    } finally {
      setLoading(false);
    }
  };

  // Group schedules by route
  const groupedSchedules = filteredSchedules.reduce((acc, schedule) => {
    if (!acc[schedule.route]) {
      acc[schedule.route] = [];
    }
    acc[schedule.route].push(schedule);
    return acc;
  }, {} as Record<string, BusSchedule[]>);

  // Sort schedules by time within each route
  Object.keys(groupedSchedules).forEach(route => {
    groupedSchedules[route].sort((a, b) => a.time.localeCompare(b.time));
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <Bus className="mr-3 text-green-600" size={32} />
            Bus Schedule
          </h1>
          <p className="text-gray-600">
            Check bus timings and routes for easy campus commute
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="max-w-md">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Routes
            </label>
            <input
              type="text"
              id="search"
              placeholder="Enter route name..."
              value={searchRoute}
              onChange={(e) => setSearchRoute(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        ) : filteredSchedules.length === 0 ? (
          <div className="text-center py-12">
            <Bus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchRoute ? 'No routes found' : 'No bus schedules available'}
            </h3>
            <p className="text-gray-600">
              {searchRoute 
                ? `No routes match "${searchRoute}". Try a different search term.`
                : 'There are no bus schedules available at the moment.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.keys(groupedSchedules).map((route) => (
              <div key={route} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-green-600 text-white px-6 py-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <MapPin className="mr-2" size={20} />
                    {route}
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {groupedSchedules[route].map((schedule) => (
                      <div
                        key={schedule.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-green-600">
                            <Clock className="mr-2" size={18} />
                            <span className="text-lg font-semibold">{schedule.time}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Hash className="mr-1" size={16} />
                            <span className="text-sm font-medium">{schedule.bus_no}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Bus Number: {schedule.bus_no}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Bus Schedule Information
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Buses run according to the scheduled times shown above</li>
            <li>• Please arrive at the bus stop at least 5 minutes before departure</li>
            <li>• Check with the transport office for any changes or updates</li>
            <li>• Weekend schedules may differ from weekday schedules</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
