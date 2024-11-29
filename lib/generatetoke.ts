import { createHash } from "crypto";

/**
 * Generates a secure token using SHA-256
 * @param userID - The user ID
 * @param date - The current date (in YYYY-MM-DD format)
 * @returns The hashed token
 */
export const generateSecureToken = ({ userID, date }: { userID: string; date: string }) => {
  const data = `${userID}|${date}`;
  return createHash('sha256').update(data).digest('hex');
};

/**
 * Generates QR data for a user including the secure token
 * @param userID - The user ID
 * @returns The QR URL with the secure token
 */
export const generateQrData = ({ userID }: { userID: string }): string => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const token = generateSecureToken({ userID, date: today });
  return `token=${token}|${userID}|${today}`; // Return the token string without a URL
};