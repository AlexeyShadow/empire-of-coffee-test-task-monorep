import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// mock userdata
const users = [{ username: "testuser", password: "password" }];

const loginHandler: RequestHandler = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ message: "Необходимо ввести имя пользователя и пароль" });
    return;
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = generateToken(user.username);
    res.json({ message: "Успешный вход!", token });
    return;
  } else {
    res.status(401).json({ message: "Неверное имя пользователя или пароль" });
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
