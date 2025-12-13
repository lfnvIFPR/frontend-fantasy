import { fetchTeam, fetchPlayers, fetchTeams } from "@/fetching";
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

  const [team, players, teams] = await Promise.all([fetchTeam(id), fetchPlayers(), fetchTeams()]);
  
  if (!team.ok) {
    return <Erro err={team}/>
  }

  if (!players.ok) {
    return <Erro err={players}/>
  }

  if (!teams.ok) {
    return <Erro err={teams}/>
  }

  const teamMap = new Map(unwrap(teams).map((t) => [t.id, t.name]));

  const teamComp = unwrap(team).players;


  return <div className={styles.page}>
    <h1 className={`${styles.text} ${styles.center}`}> &quot;{team.value.name}&quot;</h1>
    <h3 className={`${styles.text} ${styles.center}`}> (ID do time: {id})</h3>
    <ClientPage id={id} teamComp={teamComp} players={unwrap(players)} teamMap={teamMap}/>
    </div>;
} 