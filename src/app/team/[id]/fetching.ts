import { request } from "@/connection";
import { Ok, Err } from "@/Result";
import type { Team, PlayerTeam, Player, Result } from "@/types";

export async function fetchTeam(
    id: string
): Promise<Result<PlayerTeam, string>> {
    const numId = parseInt(id);
    if (isNaN(numId) || !isFinite(numId)) return Err("ID inválido");
    
    const team = await request("player_teams");

    if (!team.ok) return Err(team.error);
    const val = team.value.find((t) => t.id === numId);
    if (val) return Ok(val);
    return Err("ID da equipe não existe");
}

export async function fetchPlayers(): 
    Promise<Result<Player[], string>> 
{
    const players = await request("players");

    return players;
}

export async function fetchTeams(): 
    Promise<Result<Team[], string>> 
{
    const players = await request("teams");

    return players;
}
