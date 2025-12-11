import { fetchTeam, fetchPlayers } from "../fetching";
import Link from "next/link";

import { PlayerCard } from "../PlayerCard";
import { Erro } from "@/app/Erro";

import styles from "../team.module.css"
import { unwrap } from "@/Result";
import ClientPage from "./ClientPage";

export default async function TeamPage({
  params
}: { params: Promise<{id: string}>}) {

  const { id } = await params;

  const [team, players] = await Promise.all([fetchTeam(id), fetchPlayers()]);
  
  if (!team.ok) {
    return <Erro err={team}/>
  }

  if (!players.ok) {
    return <Erro err={players}/>
  }

  const teamComp = unwrap(team).players;

  const linkCallback = (e: MouseEvent) => {
    e.preventDefault();

  }


  return <div className={styles.page}>
    <h1 className={`${styles.text} ${styles.center}`}> &quot;{team.value.name}&quot;</h1>
    <h3 className={`${styles.text} ${styles.center}`}> (ID do time: {id})</h3>
    <ClientPage id={id} teamComp={teamComp} players={unwrap(players)}/>
    </div>;
} 