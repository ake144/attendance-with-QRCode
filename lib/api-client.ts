const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
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

    console.log(`Making request to: ${url}`);
    console.log('Request config:', { method: config.method || 'GET', headers: config.headers });
    
    try {
      const response = await fetch(url, config);
      
      console.log(`Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(data: { email?: string; phone?: string; name?: string , password?: string }): Promise<LoginResponse> {
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
  
  async getMemberInfo(userId: string): Promise<User | null> {
    try {
      return await this.request<User>(`/users/${userId}`);
    } catch (error) {
      return null;
    }
  }

  async getPrayerRequests(): Promise<any[]> {
      try{
        return await this.request<any[]>('/prayer-requests');
      }
      catch(error){
        console.error("Error fetching prayer requests:", error);
        return [];
      }
  }

  async getPrayerRequestsCount(): Promise<{ total: number }> {
    return this.request<{ total: number }>('/prayer-requests/stats');
  }

  async submitPrayerRequest(data: { name: string; email?: string; phone?: string; prayerRequest: string; isAnonymous: boolean }): Promise<any> {
    return this.request<any>('/prayer-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  async getPrayerRequest(id: string): Promise<any> { 
    return this.request<any>(`/prayer-requests/${id}`);
  }
  
  async deletePrayerRequest(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/prayer-requests/${id}`, {
      method: 'DELETE',
    });
  }
  
  
  // Health check
  async health(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/health');
  }
}

export const apiClient = new ApiClient(); 