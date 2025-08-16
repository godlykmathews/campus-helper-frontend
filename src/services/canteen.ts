import api from '@/lib/api';
import { CanteenMenu, CanteenMenuCreate } from '@/types';

export const canteenService = {
  async getCanteenMenuByDay(day: string, category?: string): Promise<CanteenMenu[]> {
    const params = category ? { category } : {};
    const response = await api.get(`/canteen/${day}`, { params });
    return response.data;
  },

  async getAllCanteenMenus(category?: string): Promise<CanteenMenu[]> {
    const params = category ? { category } : {};
    const response = await api.get('/canteen/', { params });
    return response.data;
  },

  async createCanteenMenuItem(data: CanteenMenuCreate): Promise<CanteenMenu> {
    const response = await api.post('/canteen/', data);
    return response.data;
  },

  async updateCanteenMenuItem(id: number, data: Partial<CanteenMenuCreate>): Promise<CanteenMenu> {
    const response = await api.put(`/canteen/${id}`, data);
    return response.data;
  },

  async deleteCanteenMenuItem(id: number): Promise<void> {
    await api.delete(`/canteen/${id}`);
  },
};
