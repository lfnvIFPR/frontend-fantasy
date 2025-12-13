"use client";

import { Player } from "@/types";
import { PlayerCard } from "../PlayerCard";

import styles from "../team.module.css"

export default function PlayerPicker({ teamMap, playerRoster, players, pickCallback }: {
  teamMap: Map<number, string>,
  playerRoster: [number, number, number, number, number];
  players: Player[],
  pickCallback: (id: number) => void
}) {

  const teamOrder = [...teamMap.keys()].sort((a, b) => a - b);
  const teams = Array.from({ length: teamMap.size }, () => [-1, -1, -1, -1, -1]);

  const findPlayer = (id: number) => {
    return players.find((p) => p.id === id);
  }

  const findTeamName = (idx: number) => {
    const teamId = teamOrder[idx];
    return teamMap.get(teamId)!;
  }

  players.forEach((player) => {
    // nunca será -1
    const teamIdx = teamOrder.findIndex((id) => id == player.teamId);
    const ref = teams[teamIdx];
    // nunca será -1
    const teamPlayerIdx = ref.findIndex((id) => id == -1);
    if (playerRoster.includes(player.id)) {
      ref[teamPlayerIdx] = -2;
      return;
    }
    ref[teamPlayerIdx] = player.id;
  });

  
  return <div>
    <ul>
      {
        teams.map((roster, idx) => <li key={idx}> 
        <h4>{findTeamName(idx)}</h4>
        <div className={styles.playerPicker}>
        { 
          roster.map((player, idxx) => 
            <PlayerCard isEdit isPicker onEdit={pickCallback.bind(null, player)} key={idxx} player={findPlayer(player)} />
          ) 
        }
        </div>
        </li>)
      }
    </ul>
  </div>
}