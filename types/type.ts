


export interface UserInfo {
  name: string;
  email: string;
  phone?: string;
  qrCode?:string;
  profilePic?: string;
  clerkUserId: string;
  age?: number;
  maritalStatus?: string;
  sex?: string;
  role?:string;
  address?: string;
  occupation?: string;
}
  
  export type AttendanceRecord = {
    date: string;  // ISO date string format
    isPresent: boolean;
  };
  
  export type QRData = {
    userId: string;
    timestamp: string; // ISO date string format
  };
  