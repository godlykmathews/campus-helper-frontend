'use client';

import { useState, useEffect } from 'react';
import { canteenService } from '@/services/canteen';
import { CanteenMenu } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { UtensilsCrossed, Calendar, Tag, IndianRupee } from 'lucide-react';

export default function CanteenPage() {
  const [menuItems, setMenuItems] = useState<CanteenMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const categories = ['breakfast', 'lunch', 'dinner', 'snacks'];

  useEffect(() => {
    // Set default day to today
    const today = new Date();
    const dayName = days[today.getDay() === 0 ? 6 : today.getDay() - 1]; // Adjust for Sunday = 0
    setSelectedDay(dayName);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchMenuItems();
  }, [selectedDay, selectedCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMenuItems = async () => {
    setLoading(true);
    setError('');
    try {
      let data;
      if (selectedDay && selectedDay !== 'all') {
        data = await canteenService.getCanteenMenuByDay(selectedDay, selectedCategory || undefined);
      } else {
        data = await canteenService.getAllCanteenMenus(selectedCategory || undefined);
      }
      setMenuItems(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  };

  // Group menu items by day and category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const day = item.day;
    const category = item.category || 'other';
    
    if (!acc[day]) {
      acc[day] = {};
    }
    if (!acc[day][category]) {
      acc[day][category] = [];
    }
    acc[day][category].push(item);
    return acc;
  }, {} as Record<string, Record<string, CanteenMenu[]>>);

  const getCategoryColor = (category: string) => {
    const colors = {
      breakfast: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      lunch: 'bg-green-100 text-green-800 border-green-200',
      dinner: 'bg-blue-100 text-blue-800 border-blue-200',
      snacks: 'bg-purple-100 text-purple-800 border-purple-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'breakfast': return '🌅';
      case 'lunch': return '🍽️';
      case 'dinner': return '🌙';
      case 'snacks': return '🍿';
      default: return '🍴';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <UtensilsCrossed className="mr-3 text-orange-600" size={32} />
            Canteen Menu
          </h1>
          <p className="text-gray-600">
            Explore daily menu items with prices and categories
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Day Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Day
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDay('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDay === 'all'
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-300'
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
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-300'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === ''
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-300'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-300'
                  }`}
                >
                  {getCategoryIcon(category)} {category}
                </button>
              ))}
            </div>
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
        ) : menuItems.length === 0 ? (
          <div className="text-center py-12">
            <UtensilsCrossed className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No menu items found
            </h3>
            <p className="text-gray-600">
              There are no menu items available for the selected filters.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.keys(groupedMenuItems).map((day) => (
              <div key={day} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-orange-600 text-white px-6 py-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Calendar className="mr-2" size={20} />
                    {day}
                  </h2>
                </div>
                <div className="p-6">
                  {Object.keys(groupedMenuItems[day]).map((category) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getCategoryColor(category)}`}>
                        <Tag className="mr-1" size={14} />
                        <span className="capitalize">{getCategoryIcon(category)} {category}</span>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {groupedMenuItems[day][category].map((item) => (
                          <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {item.item}
                              </h3>
                              <div className="flex items-center text-green-600 font-bold">
                                <IndianRupee size={16} />
                                <span>{item.price}</span>
                              </div>
                            </div>
                            <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getCategoryColor(item.category || 'other')}`}>
                              {item.category || 'other'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-900 mb-2">
            Canteen Information
          </h3>
          <ul className="text-sm text-orange-800 space-y-1">
            <li>• Canteen timings: Breakfast (7:00-10:00), Lunch (12:00-15:00), Dinner (18:00-21:00)</li>
            <li>• Snacks are available throughout the day</li>
            <li>• Prices are subject to change without prior notice</li>
            <li>• Special menus may be available during festivals and events</li>
            <li>• For any dietary requirements or allergies, please consult with canteen staff</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
