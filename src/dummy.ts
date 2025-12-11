import type { 
    AppRequest, AppResponse, 
    Team, Player, PlayerTeam, Match,
    Result
} from "@/types";

import { Ok, Err } from "@/Result";


function Team(id: number, name: string): Team {
    return {
        id, name, 
        score: 0, atk: 0, def: 0
    };
}

function Player(id: number, teamId: number, name: string, rating: number): Player {
    return {
        id, teamId, name, rating
    };
}


function PlayerTeam(
    id: number, 
    name: string, 
    players: [number, number, number, number, number]
): PlayerTeam {
    return { id, name, players };
}


function Match(id: number, round: number, teams: [number, number]): Match {
    return {id, round, teams};
}

function dummyTeams(): Team[] {
    return [
        Team(0, "Lobo"),
        Team(1, "Tubarão"),
        Team(2, "Falcão"),
        Team(3, "Pantera"),
        Team(4, "Touro"),
        Team(5, "Raposa"),
    ];
}

function dummyPlayers(): Player[] {
    return [
        // Team 0 - Lobo
        Player(0, 0, "João", 85),
        Player(1, 0, "Marco", 78),
        Player(2, 0, "Pedro", 92),
        Player(3, 0, "Lucas", 68),
        Player(4, 0, "Rafael", 81),
        // Team 1 - Tubarão
        Player(5, 1, "Carlos", 88),
        Player(6, 1, "Bruno", 75),
        Player(7, 1, "Felipe", 95),
        Player(8, 1, "André", 70),
        Player(9, 1, "Gustavo", 82),
        // Team 2 - Falcão
        Player(10, 2, "Diego", 86),
        Player(11, 2, "Thiago", 79),
        Player(12, 2, "Paulo", 91),
        Player(13, 2, "Vitor", 65),
        Player(14, 2, "Ricardo", 84),
        // Team 3 - Pantera
        Player(15, 3, "Sergio", 89),
        Player(16, 3, "Mateus", 76),
        Player(17, 3, "Henrique", 94),
        Player(18, 3, "Rodrigo", 69),
        Player(19, 3, "Fabio", 80),
        // Team 4 - Touro
        Player(20, 4, "Marcelo", 87),
        Player(21, 4, "Alvaro", 77),
        Player(22, 4, "Neymar", 96),
        Player(23, 4, "Julio", 72),
        Player(24, 4, "Claudio", 83),
        // Team 5 - Raposa
        Player(25, 5, "Roberto", 90),
        Player(26, 5, "Eduardo", 73),
        Player(27, 5, "Leandro", 93),
        Player(28, 5, "Otavio", 66),
        Player(29, 5, "Cristian", 79),
    ];
}

function dummyPlayerTeams(): PlayerTeam[] {
    return [
        PlayerTeam(0, "time numero 1", [0, 1, 5, 10, 15]),
        PlayerTeam(1, "time 2 com nome", [6, 7, 11, 16, 20]),
    ];
}

function dummyMatches(): Match[] {
    return [
        Match(0, 1, [0, 1]),
        Match(1, 1, [2, 3]),
        Match(2, 1, [4, 5]),
        Match(3, 2, [0, 2]),
        Match(4, 2, [1, 4]),
        Match(5, 2, [3, 5]),
        Match(6, 3, [0, 3]),
        Match(7, 3, [1, 5]),
        Match(8, 3, [2, 4]),
        Match(9, 4, [0, 4]),
        Match(10, 4, [1, 2]),
        Match(11, 4, [3, 5]),
        Match(12, 5, [0, 5]),
        Match(13, 5, [1, 3]),
        Match(14, 5, [2, 4]),
    ];
}



export async function request(type: "teams"): Promise<Result<Team[], string>>;
export async function request(type: "players"): Promise<Result<Player[], string>>;
export async function request(type: "player_teams"): Promise<Result<PlayerTeam[], string>>;
export async function request(type: "teams"): Promise<Result<Match[], string>>;
export async function request(type: AppRequest): Promise<Result<AppResponse, string>>{
    if (type === "teams") return Ok(dummyTeams());
    if (type === "players") return Ok(dummyPlayers());
    if (type === "player_teams") return Ok(dummyPlayerTeams());
    if (type === "matches") return Ok(dummyMatches());
    return Err("invalid request");
}