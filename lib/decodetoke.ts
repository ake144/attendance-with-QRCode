import { createHash } from "crypto";

export const verifyToken = (token: string): { userID: string; date: string } | null => {
  try {
    const parts = token.split("|");
    if (parts.length !== 3) return null; // Token must include userID, date, and hash

    const [userID, date, hash] = parts;
    const expectedHash = createHash('sha256').update(`${userID}|${date}`).digest('hex');

    // Validate the hash
    if (hash !== expectedHash) {
      console.error("Invalid hash in token");
      return null;
    }

    return { userID, date }; // Return decoded data if valid
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
