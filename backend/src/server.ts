import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { getPasswordHash } from "./../utils/getPasswordHash";

const app = express();
const PORT = 3001;
const AUTHORIZATION_FALSE =
  "Введены неверные данные авторизации. Попробуйте ещё раз";

app.use(express.json());
app.use(cors());

const usersFilePath = path.join(__dirname, "..", "data", "users.json");

// TODO: вынести в utils
function getUsers(): any[] {
  try {
    const data = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Ошибка чтения:", error);
    return [];
  }
}

const loginHandler: RequestHandler = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: AUTHORIZATION_FALSE });
    return;
  }

  const users = getUsers();

  // Ищем пользователя с совпадающим username
  const user = users?.find((u) => u.credentials.username === username);

  console.log(getPasswordHash(password), user);

  if (user && user.credentials.passphrase === getPasswordHash(password)) {
    const token = generateToken(user.username);
    console.log(token);

    res.json({ message: "Успешный вход!", token });
    return;
  } else {
    res.status(401).json({ message: AUTHORIZATION_FALSE });
    return;
  }
};

function generateToken(username: string): string {
  // TODO: Добавить генерацию и отправку JWT
  return `mock_token_for_${username}`;
}

app.post("/login", loginHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
