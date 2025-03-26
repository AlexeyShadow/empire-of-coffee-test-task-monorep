import fs from "fs";
import path from "path";

const usersFilePath = path.join(__dirname, "..", "data", "users.json");

export const getUsers = (): any[] => {
  try {
    const data = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Ошибка чтения:", error);
    return [];
  }
};
