
"use client";

import Link from "next/link";
import { PlayerCard } from "../PlayerCard";
import styles from "../team.module.css"
import { Player } from "@/types";
import { useState } from "react";

export default function ClientPage( 
  {id, teamComp, players }: {
    id: string,
    teamComp: [number, number, number, number, number],
    players: Player[]
  }) {

  const [comp, updateComp] = useState(teamComp);
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

  const updateHandler = () => {
    console.log("3");
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
    <div><Link 
      href={`/team/${id}/`} 
      replace 
      onClick={(e) => {
        if (!comp.every((id) => id >= 0 && id != null)) {
          e.preventDefault();
          return;
        }
        updateHandler();
      }
      }> Salvar </Link></div>
  </>;

}