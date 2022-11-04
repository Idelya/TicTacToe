export type RoomGame = {
  userId: string;
  login: string;
};

export type UserAuthData = {
  username: string;
  password: string;
  repeatPassword: string;
};

export type UserLoginData = {
  username: string;
  password: string;
};

export type UserData = {
  email: string;
  username: string;
};
