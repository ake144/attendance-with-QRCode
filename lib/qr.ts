



export const generateQrData = ({userID}:{userID:string}) => {
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    return `https://your-domain.com/api/attendance/mark?userId=${userID}&date=${today}`;
  };


  
  

