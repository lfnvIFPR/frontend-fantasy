"use client"

import type { Player } from "@/types";
import styles from "./team.module.css"
import { JSX } from "react";

export function PlayerCard(params: { 
  player?: Player, 
  isEdit: boolean,
  onEdit: () => void
}): JSX.Element;

export function PlayerCard(params: { 
  player?: Player
}): JSX.Element;

export function PlayerCard({ player, isEdit, onEdit }: { 
  player?: Player, 
  isEdit?: boolean,
  onEdit?: () => void}) {
  if (!player) {
    return <div className={styles.playerCard}>
      <div className={styles.fig}></div>
      <h4>N/A</h4>
      { isEdit ? <div>X</div> : <div></div> }
    </div>
  }
  
  return <div className={styles.playerCard}>
    <div className={styles.fig}></div>
    <h4>{player.name}</h4>
    { isEdit ? <div className={styles.cardButton}>$ {player.price} </div> : <div></div> }
  </div>
}