import api from '@/lib/api';
import { BusSchedule, BusScheduleCreate } from '@/types';

export const busService = {
  async getBusScheduleByRoute(route: string): Promise<BusSchedule[]> {
    const response = await api.get(`/bus/${route}`);
    return response.data;
  },

  async getAllBusSchedules(): Promise<BusSchedule[]> {
    const response = await api.get('/bus/');
    return response.data;
  },

  async createBusSchedule(data: BusScheduleCreate): Promise<BusSchedule> {
    const response = await api.post('/bus/', data);
    return response.data;
  },

  async updateBusSchedule(id: number, data: Partial<BusScheduleCreate>): Promise<BusSchedule> {
    const response = await api.put(`/bus/${id}`, data);
    return response.data;
  },

  async deleteBusSchedule(id: number): Promise<void> {
    await api.delete(`/bus/${id}`);
  },
};
