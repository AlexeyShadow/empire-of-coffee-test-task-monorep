import express, { Request, Response, RequestHandler } from "express";
import cors from "cors";
import { getPasswordHash } from "./../utils/getPasswordHash";
import { getUsers } from "./../utils/getUsers";
import { generateToken } from "./../utils/generateToken";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3001;
const AUTHORIZATION_FALSE =
  "Введены неверные данные авторизации. Попробуйте ещё раз";

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const loginHandler: RequestHandler = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({ message: AUTHORIZATION_FALSE });
    return;
  }

  const users = getUsers();

  const user = users?.find((u) => u.credentials.username === username);

  if (
    user &&
    user.credentials.passphrase === getPasswordHash(password) &&
    user.active
  ) {
    // Принимаем легенду, что у нас всё шифруется

    const token = generateToken(user.username);
    res.cookie("sessionId", token, { path: "/", httpOnly: true });

    res.send({ message: "Login successful!" });
    return;
  } else {
    res.status(401).json({ message: AUTHORIZATION_FALSE });
    return;
  }
};

app.post("/login", loginHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
