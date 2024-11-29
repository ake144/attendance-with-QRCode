import { createHash } from "crypto";

/**
 * Verifies the token by comparing it to the expected hash
 * @param token - The token from the request
 * @returns The decoded user ID and date if valid, otherwise null
 */
export const verifyToken = (token: string): { userID: string; date: string } | null => {
  try {
    const parts = token.split("|");
    if (parts.length !== 3) {
      console.error("Invalid token format");
      return null;
    }

    const [providedHash, userID, date] = parts;
    const expectedHash = createHash('sha256').update(`${userID}|${date}`).digest('hex');

    if (providedHash !== expectedHash) {
      console.error("Token hash mismatch");
      return null;
    }

    return { userID, date };
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
