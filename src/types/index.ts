// Types for API responses
export interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Timetable {
  id: number;
  day: string;
  time: string;
  subject: string;
  room: string;
  created_at: string;
}

export interface BusSchedule {
  id: number;
  route: string;
  time: string;
  bus_no: string;
  created_at: string;
}

export interface CanteenMenu {
  id: number;
  day: string;
  item: string;
  price: number;
  category: string;
  created_at: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface TimetableCreate {
  day: string;
  time: string;
  subject: string;
  room: string;
}

export interface BusScheduleCreate {
  route: string;
  time: string;
  bus_no: string;
}

export interface CanteenMenuCreate {
  day: string;
  item: string;
  price: number;
  category: string;
}
