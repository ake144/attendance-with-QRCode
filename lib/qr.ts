import { createHash } from "crypto";

export const generateSecureToken = ({ userID, date }: { userID: string; date: string }) => {
  const data = `${userID}|${date}`;
  return createHash('sha256').update(data).digest('hex');
};

export const generateQrData = ({ userID }: { userID: string }) => {
  const today = new Date().toISOString().split("T")[0];
  const token = generateSecureToken({ userID, date: today });
  return `https://nextjs-qr-attendance.vercel.app/validate?token=${token}`;
};
