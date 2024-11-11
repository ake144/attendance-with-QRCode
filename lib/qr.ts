



export const generateQrData = ({userID}:{userID:string}) => {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    return `https://nextjs-qr-attendance.vercel.app/api/mark?userId=${userID}&date=${today}`;
  };

  
  

