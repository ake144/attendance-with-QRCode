


export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
  qrCode?: string;
  profilePic?: string;
  age?: number;
  maritalStatus?: string;
  sex?: string;
  role: 'USER' | 'ADMIN';
  address?: string;
  occupation?: string;
}
  
export interface AttendanceRecord {
  id: string;
  date: string;
    isPresent: boolean;
  userId: string;
}
  
  export type QRData = {
    userId: string;
    timestamp: string; // ISO date string format
  };
  