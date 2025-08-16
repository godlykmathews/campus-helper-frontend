'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Settings, Calendar, Bus, UtensilsCrossed, Plus } from 'lucide-react';

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('timetable');

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const tabs = [
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'bus', label: 'Bus Schedule', icon: Bus },
    { id: 'canteen', label: 'Canteen Menu', icon: UtensilsCrossed },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <Settings className="mr-3 text-blue-600" size={32} />
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage campus information including timetables, bus schedules, and canteen menus
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md">
          {activeTab === 'timetable' && <TimetableAdmin />}
          {activeTab === 'bus' && <BusAdmin />}
          {activeTab === 'canteen' && <CanteenAdmin />}
        </div>
      </div>
    </div>
  );
}

// Placeholder components for admin sections
function TimetableAdmin() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Manage Timetable</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus size={16} className="mr-2" />
          Add Class
        </button>
      </div>
      <div className="text-center py-12 text-gray-500">
        <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
        <p>Timetable management interface will be implemented here.</p>
        <p className="text-sm mt-2">Features: Add, edit, delete class schedules</p>
      </div>
    </div>
  );
}

function BusAdmin() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Manage Bus Schedule</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
          <Plus size={16} className="mr-2" />
          Add Route
        </button>
      </div>
      <div className="text-center py-12 text-gray-500">
        <Bus size={48} className="mx-auto mb-4 text-gray-400" />
        <p>Bus schedule management interface will be implemented here.</p>
        <p className="text-sm mt-2">Features: Add, edit, delete bus routes and timings</p>
      </div>
    </div>
  );
}

function CanteenAdmin() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Manage Canteen Menu</h2>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
          <Plus size={16} className="mr-2" />
          Add Menu Item
        </button>
      </div>
      <div className="text-center py-12 text-gray-500">
        <UtensilsCrossed size={48} className="mx-auto mb-4 text-gray-400" />
        <p>Canteen menu management interface will be implemented here.</p>
        <p className="text-sm mt-2">Features: Add, edit, delete menu items with pricing</p>
      </div>
    </div>
  );
}
