import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import { getPasswordHash } from "./../utils/getPasswordHash";
import { getUsers } from "./../utils/getUsers";
import { generateToken } from "./../utils/generateToken";

const app = express();
const PORT = 3001;
const AUTHORIZATION_FALSE =
  "Введены неверные данные авторизации. Попробуйте ещё раз";

app.use(express.json());
app.use(cors());

const loginHandler: RequestHandler = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({ message: AUTHORIZATION_FALSE });
    return;
  }

  const users = getUsers();

  // Ищем пользователя с совпадающим username
  const user = users?.find((u) => u.credentials.username === username);

  console.log(getPasswordHash(password), user);

  if (
    user &&
    user.credentials.passphrase === getPasswordHash(password) &&
    user.active
  ) {
    const token = generateToken(user.username);
    console.log(token);

    res.json({ message: "Успешный вход!", token });
    return;
  } else {
    res.status(401).json({ message: AUTHORIZATION_FALSE });
    return;
  }
};

// Маршруты
app.post("/login", loginHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
