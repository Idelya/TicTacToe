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
  id: number;
  username: string;
};

export type UserStats = {
  win: number;
  all: number;
  tie: number;
};

export type Game = {
  id: number;
  board: string;
  player_x: number;
  player_o: number;
  winner: null | number;
  status: string;
  player_x_name: string;
  player_o_name: string;
};
