import { UserInfo } from "@/types/type";
import html2canvas from "html2canvas";



export const generateQrData = ({userID}:{userID:string}) => {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    return `https://your-domain.com/api/attendance/mark?userId=${userID}&date=${today}`;
  };


  
  

