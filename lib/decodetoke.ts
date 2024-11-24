import { createHash } from "crypto";

/**
 * Decodes and verifies the token by matching its hash with the expected format.
 * @param token - The hashed token to verify.
 * @returns {string | null} - The decoded string if the token is valid, otherwise null.
 */
export const verifyToken = (token: string): string | null => {
  try {
    const parts = token.split("|");
    if (parts.length !== 2) return null;

    const [userID, date] = parts;
    const expectedHash = createHash('sha256').update(`${userID}|${date}`).digest('hex');

    return token === expectedHash ? `${userID}|${date}` : null;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
