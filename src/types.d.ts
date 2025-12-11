
export interface Team {
  id: number,
  name: string,
  score: number,
  def: number,
  atk: number
};

export interface Player {
  id: number,
  teamId: number,
  name: string,
  rating: number,
  price: number
};

export interface PlayerTeam {
  id: number,
  name: string,
  players: [number, number, number, number, number]
};

export interface Match {
  id: number,
  round: number,
  teams: [number, number]
};

export interface Ok<T> {
  ok: true,
  value: T
};

export interface Err<E> {
  ok: false,
  error: E
};

type Result<T, E> = Ok<T> | Err<E>;

export type AppResponse = Team[] | Player[] | Match[] | PlayerTeam[];
export type AppRequest = "teams" | "players" | "matches" | "player_teams";