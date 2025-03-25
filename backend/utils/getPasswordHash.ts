import crypto from "crypto";

export const getPasswordHash = (password: string): string => {
  return crypto.createHash("md5").update(password).digest("hex");
};
