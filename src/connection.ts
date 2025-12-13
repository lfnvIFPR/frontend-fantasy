import type { 
  AppRequest, AppUpdate, AppResponse, 
  Result, 
  Team, Player, PlayerTeam, Match,
  Err as ErrT } from "@/types";
import { Ok, Err } from "@/Result";

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: relative URL works
    return '';
  }
  // Server-side: need absolute URL
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
};

async function getTeams() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/teams/`);
  if (res.ok) return Ok((await res.json()) as Team[]);
  return Err("Erro ao obter times");
}

async function getPlayers() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/players/`);
  if (res.ok) return Ok((await res.json()) as Player[]);
  return Err("Erro ao obter jogadores");
}

async function getPlayerTeams() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/playerTeams/`);
  if (res.ok) return Ok((await res.json()) as PlayerTeam[]);
  return Err("Erro ao obter times de jogadores");
}

async function updatePlayerTeams(id: number, opts: Partial<Omit<PlayerTeam, "id">>): Promise<Result<boolean, string>> {
  try {
    const baseUrl = getBaseUrl();
    console.log(JSON.stringify({ ...opts, id }));
    
    const res = await fetch(`${baseUrl}/api/playerTeams/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...opts, id })
    });

    if (res.ok) return Ok(true);
  
    return Err((await res.json()).message!);
  } catch {
    return Err(".");
  }
}



// GET HTTP/1.1
export async function request(type: "teams"): Promise<Result<Team[], string>>;
export async function request(type: "players"): Promise<Result<Player[], string>>;
export async function request(type: "player_teams"): Promise<Result<PlayerTeam[], string>>;
export async function request(type: "teams"): Promise<Result<Match[], string>>;
export async function request(type: AppRequest): Promise<Result<AppResponse, string>>{
    if (type === "teams") return await getTeams();
    if (type === "players") return await getPlayers();
    if (type === "player_teams") return await getPlayerTeams();
    if (type === "matches") return Err("");
    return Err("invalid request");
}

// PUT HTTP/1.1
export async function update(type: "player_teams", id: number, opts: Partial<Omit<PlayerTeam, "id">>): Promise<Result<boolean, string>>;
export async function update(type: Exclude<AppRequest, "player_teams">, id: number, opts: Partial<Omit<AppUpdate, "id">>): Promise<ErrT<string>>;
export async function update(type: AppRequest, id: number, opts: Partial<Omit<AppUpdate, "id">>): Promise<Result<boolean, string>> {
    if (type === "player_teams") {
        console.log("atualizando composicao")
        return await updatePlayerTeams(id, opts);
    }
    return Err("invalid request");
}

