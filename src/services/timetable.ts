import api from '@/lib/api';
import { Timetable, TimetableCreate } from '@/types';

export const timetableService = {
  async getTimetableByDay(day: string): Promise<Timetable[]> {
    const response = await api.get(`/timetable/${day}`);
    return response.data;
  },

  async getAllTimetables(): Promise<Timetable[]> {
    const response = await api.get('/timetable/');
    return response.data;
  },

  async createTimetableEntry(data: TimetableCreate): Promise<Timetable> {
    const response = await api.post('/timetable/', data);
    return response.data;
  },

  async updateTimetableEntry(id: number, data: Partial<TimetableCreate>): Promise<Timetable> {
    const response = await api.put(`/timetable/${id}`, data);
    return response.data;
  },

  async deleteTimetableEntry(id: number): Promise<void> {
    await api.delete(`/timetable/${id}`);
  },
};
