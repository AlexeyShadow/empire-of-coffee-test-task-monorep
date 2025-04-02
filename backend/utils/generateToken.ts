import jwt from "jsonwebtoken";

const JWT_SECRET = "my_jwt_secret";

/**
 *
 * @param username имя пользователя из credentials
 * @returns подписанный токен для использования в сессии
 */
export const generateToken = (username: string) => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
};
