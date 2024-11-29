import { createHash } from "crypto";

export const generateSecureToken = ({ userID, date }: { userID: string; date: string }) => {
  const data = `${userID}|${date}`;
  const hash = createHash('sha256').update(data).digest('hex');
  return `${data}|${hash}`; // Include original data and hash
};

export const generateQrData = ({ userID }: { userID: string }) => {
  const today = new Date().toISOString().split("T")[0];
  const token = generateSecureToken({ userID, date: today });
  return `https://www.brightethiopia.com/validate?token=${encodeURIComponent(token)}`;
};