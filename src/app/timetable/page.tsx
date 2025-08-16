'use client';

import { useState, useEffect } from 'react';
import { timetableService } from '@/services/timetable';
import { Timetable } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Calendar, Clock, MapPin, Book } from 'lucide-react';

export default function TimetablePage() {
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    // Set default day to today
    const today = new Date();
    const dayName = days[today.getDay() === 0 ? 6 : today.getDay() - 1]; // Adjust for Sunday = 0
    setSelectedDay(dayName);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedDay) {
      fetchTimetable();
    }
  }, [selectedDay]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchTimetable = async () => {
    setLoading(true);
    setError('');
    try {
      const data = selectedDay 
        ? await timetableService.getTimetableByDay(selectedDay)
        : await timetableService.getAllTimetables();
      setTimetables(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch timetable');
    } finally {
      setLoading(false);
    }
  };

  const groupedTimetables = timetables.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<string, Timetable[]>);

  // Sort timetables by time
  Object.keys(groupedTimetables).forEach(day => {
    groupedTimetables[day].sort((a, b) => a.time.localeCompare(b.time));
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="mr-3 text-blue-600" size={32} />
            Class Timetable
          </h1>
          <p className="text-gray-600">
            View your class schedule and room assignments
          </p>
        </div>

        {/* Day Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDay('')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedDay === ''
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
              }`}
            >
              All Days
            </button>
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDay === day
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                }`}
              >
                {day}
              </button>
            ))}
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
        ) : selectedDay && timetables.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No classes scheduled
            </h3>
            <p className="text-gray-600">
              There are no classes scheduled for {selectedDay}.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {selectedDay ? (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {selectedDay}
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {timetables.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <Book className="mr-2 text-blue-600" size={20} />
                          {item.subject}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Clock className="mr-2" size={16} />
                          <span>{item.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="mr-2" size={16} />
                          <span>Room {item.room}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              Object.keys(groupedTimetables).map((day) => (
                <div key={day}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {day}
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {groupedTimetables[day].map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Book className="mr-2 text-blue-600" size={20} />
                            {item.subject}
                          </h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Clock className="mr-2" size={16} />
                            <span>{item.time}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="mr-2" size={16} />
                            <span>Room {item.room}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
