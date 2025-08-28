const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  age?: number;
  maritalStatus?: string;
  sex?: string;
  address?: string;
  occupation?: string;
}

interface LoginResponse {
  user: User;
}

interface MeResponse {
  user: User;
}

interface LogoutResponse {
  ok: boolean;
}

interface AttendanceRecord {
  id: string;
  date: string;
  isPresent: boolean;
  userId: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...options,
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(data: { email?: string; phone?: string; name?: string }): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async me(): Promise<MeResponse> {
    return this.request<MeResponse>('/auth/me');
  }

  async logout(): Promise<LogoutResponse> {
    return this.request<LogoutResponse>('/auth/logout', {
      method: 'POST',
    });
  }

  // Users endpoints
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async getUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  async createUser(data: any): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUser(id: string, data: any): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Attendance endpoints
  async getAttendance(userId: string): Promise<AttendanceRecord[]> {
    return this.request<AttendanceRecord[]>(`/attendance?userId=${userId}`);
  }

  async markAttendance(userId: string, date: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/attendance/mark?userId=${userId}&date=${date}`, {
      method: 'POST',
    });
  }

  async getAttendanceStats(userId: string): Promise<any> {
    return this.request<any>(`/attendance/stats/${userId}`);
  }

  async getAttendanceByDateRange(userId: string, startDate: string, endDate: string): Promise<AttendanceRecord[]> {
    return this.request<AttendanceRecord[]>(`/attendance/range/${userId}?startDate=${startDate}&endDate=${endDate}`);
  }

  // Admin-specific methods
  async getAttendanceHistory(userId: string): Promise<AttendanceRecord[]> {
    return this.request<AttendanceRecord[]>(`/attendance?userId=${userId}`);
  }

  async getMemberInfo(userId: string): Promise<User | null> {
    try {
      return await this.request<User>(`/users/${userId}`);
    } catch (error) {
      return null;
    }
  }

  // Health check
  async health(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/health');
  }
}

export const apiClient = new ApiClient(); 