import jwt from "jsonwebtoken";

const JWT_SECRET = "my_jwt_secret";

export const generateToken = (username: string): string => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
};
