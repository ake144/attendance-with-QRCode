// types/index.ts
export type UserInfo = {
    name: string;
    email: string;
    phone: string;
    membershipId: string;
  };
  
  export type AttendanceRecord = {
    date: string;  // ISO date string format
    isPresent: boolean;
  };
  
  export type QRData = {
    userId: string;
    timestamp: string; // ISO date string format
  };
  