



export const generateQrData = ({ userID }: { userID: string }) => {
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  
  // Encoding the userID and date as a JSON string
  const payload = JSON.stringify({ userId: userID, date: today });
  return `https://nextjs-qr-attendance.vercel.app/api/mark?data=${encodeURIComponent(payload)}`;
};

  
  

