
"use client";

import { useRouter } from "next/navigation";
import { PlayerCard } from "../PlayerCard";
import styles from "../team.module.css"
import { Player } from "@/types";
import { Activity, useState } from "react";
import { update } from "@/connection";
import PlayerPicker from "./PlayerPicker";


export default function ClientPage( 
  {id, teamComp, players, teamMap }: {
    id: string,
    teamComp: [number, number, number, number, number],
    players: Player[],
    teamMap: Map<number, string>;
  }) {
    
  const router = useRouter();
  const [comp, updateComp] = useState(teamComp);
  const [error, setError] = useState<string | null>(null);
  const popComp = (idx: number) => {
    const start = comp.slice(0, idx);
    const rest = comp.slice(idx + 1);
    const copy = [...start, ...rest, -1] as typeof comp;
    
    updateComp(copy);
  }

  const pushComp = (id: number) => {
    const copy = comp.slice() as typeof comp;
    const idx = copy.findLastIndex((id) => id < 0);
    if (idx == -1) return;
    copy[idx] = id; 
    updateComp(copy);
  }

  const updateHandler = async () => {
    console.log("publicando página...");
    const res = await update("player_teams", Number(id), { players: comp.slice() as typeof comp });
    if (!res.ok) {
      setError(res.error);
      return false;
    }
    setError(null)
    console.log("composição atualizada!");
    return true;
  }
  
  return <>
    <ul className={styles.playerList}>
    {
        comp.map((id, i) => 
          <PlayerCard 
            isEdit
            onEdit={popComp.bind(null, i)}
            key={i} 
            player={players.find((p) => p.id === id)} />
        )
    }
    </ul>
    <div><button 
      onClick={async () => {
        if (!comp.every((id) => id >= 0 && id != null)) {
          return;
        }
        const res = await updateHandler();
        if (res) {
          router.replace(`/team/${id}/`);
        }
      }
      }> Salvar </button></div>
      <Activity mode={error ? "visible" : "hidden"}><p>{error ? error : ''}</p></Activity>
      <PlayerPicker teamMap={teamMap} players={players} playerRoster={comp} pickCallback={pushComp}/>
  </>;

}