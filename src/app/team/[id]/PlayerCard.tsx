"use client"

import type { Player } from "@/types";
import styles from "./team.module.css"
import { JSX } from "react";

export function PlayerCard(params: { 
  player?: Player, 
  isEdit: boolean,
  onEdit: () => void,
  isPicker?: boolean
}): JSX.Element;

export function PlayerCard(params: { 
  player?: Player
}): JSX.Element;


export function PlayerCard({ player, isEdit, onEdit = () => { void(0); }, isPicker }: { 
  player?: Player, 
  isEdit?: boolean,
  onEdit?: () => void
  isPicker?: boolean 
}) {
  const pickerClass = isPicker ? styles.pickerButton : "";

  if (!player) {
    return <div className={styles.playerCard}>
      <div className={styles.fig}></div>
      <h4>N/A</h4>
      { isEdit ? <button className={pickerClass} onClick={() => onEdit()}></button> : <div></div> }
    </div>
  }
  
  return <div className={styles.playerCard}>
    <div className={styles.fig}></div>
    <h4>{player.name}</h4>
    { isEdit ? <button className={`${styles.cardButton} ${pickerClass}`} onClick={() => onEdit()}>$ {player.price} </button> : <div></div> }
  </div>
}