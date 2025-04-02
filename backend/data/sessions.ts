//
// Эмулируем хранение и работу с сессииями в базе

type Session = {
  username: string;
  token: string;
};

const activeSessions: Session[] = [];

/**
 *  Установка сессии
 */
const addSession = (token: string, username: string) => {
  console.log(username);

  activeSessions.push({
    username,
    token,
  });
};

/**
 *  Удаление сессии
 */
const removeSession = (token: string) => {
  const index = activeSessions.findIndex((session) => session.token === token);
  if (index !== -1) {
    activeSessions.splice(index, 1);
  }
};

export { addSession, removeSession };
