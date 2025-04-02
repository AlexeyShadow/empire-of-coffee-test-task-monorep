import fs from "fs";
import path from "path";
import type { User } from "../types/userTypes";

const usersFilePath = path.join(__dirname, "..", "data", "users.json");

/**
 *
 * @returns массив пользователей из предоставленного json
 */
export const getUsers = (): User[] => {
  try {
    const data = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Ошибка чтения:", error);
    return [];
  }
};
