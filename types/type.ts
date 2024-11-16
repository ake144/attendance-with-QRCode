


export interface UserInfo {
  name: string;
  email: string;
  phone?: string | null;
  qrCode?:string | null;
  clerkUserId: string;
  age?: number | null ;
  maritalStatus?: string | null;
  sex?: string | null;
  role?:string;
  address?: string | null;
  occupation?: string | null;
}
  
  export type AttendanceRecord = {
    date: string;  // ISO date string format
    isPresent: boolean;
  };
  
  export type QRData = {
    userId: string;
    timestamp: string; // ISO date string format
  };
  