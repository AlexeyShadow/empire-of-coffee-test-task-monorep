import crypto from "crypto";

/**
 *
 * @param password пароль
 * @returns хэш пароля
 */
export const getPasswordHash = (password: string) => {
  return crypto.createHash("md5").update(password).digest("hex");
};
