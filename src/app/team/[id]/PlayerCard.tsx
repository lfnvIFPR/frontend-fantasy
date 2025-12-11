"use client"

import type { Player } from "@/types";
import styles from "./team.module.css"

export function PlayerCard({ player }: { player?: Player }) {
  if (!player) {

  }
  
  return <div className={styles.playerCard}>
    <div className="fig"></div>
    <h4>{player?.name}</h4>
  </div>
}