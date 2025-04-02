import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getPasswordHash } from "./../utils/getPasswordHash";
import { getUsers } from "./../utils/getUsers";
import { generateToken } from "./../utils/generateToken";
import { addSession, removeSession } from "../data/sessions";
import type { LoginRequestBody } from "../types/userTypes";

const app = express();
const PORT = 3001;
const AUTHORIZATION_FALSE =
  "Введены неверные данные авторизации. Попробуйте ещё раз";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

/**
 *  Аутентифицируем пользователя и устанавливаем сессию
 */
const loginHandler: RequestHandler = (
  // Вероятно, тут надо использовать zod или любой аналог. Для правильной валидации формы и внешних параметров.
  req: Request<any, any, LoginRequestBody>,
  res: Response
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({ message: AUTHORIZATION_FALSE });
  }

  const users = getUsers();

  const user = users.find((u) => u.credentials.username === username);

  if (
    user &&
    user.credentials.passphrase === getPasswordHash(password) &&
    user.active
  ) {
    console.log(user);

    // Принимаем легенду, что у нас всё шифруется
    const token = generateToken(user.credentials.username);
    console.log(token);

    addSession(token, user.credentials.username);
    res.cookie("sessionId", token, { path: "/", httpOnly: true });
    res.status(200).end();
  } else {
    res.status(401).json({ message: AUTHORIZATION_FALSE });
  }
};

/**
 *  Разлогирование пользователя и удаляем сессию
 */
const logoutHandler: RequestHandler = (req: Request, res: Response) => {
  const token = req.cookies.sessionId;
  if (token) {
    removeSession(token);
    res.clearCookie("sessionId");
    res.status(200).end();
  } else {
    res.status(401).end();
  }
};

app.post("/login", loginHandler);

app.post("/logout", logoutHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
