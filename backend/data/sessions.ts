//
// Эмулируем хранение активной сессии в базе

type Session = {
  username: string;
  token: string;
};

const activeSessions: Session[] = [];

const addSession = (token: string, username: string) => {
  activeSessions.push({
    username,
    token,
  });
};

const removeSession = (token: string) => {
  const index = activeSessions.findIndex((session) => session.token === token);
  if (index !== -1) {
    activeSessions.splice(index, 1);
  }
};

export { addSession, removeSession };
