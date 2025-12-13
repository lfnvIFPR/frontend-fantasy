import { fetchTeam, fetchPlayers } from "@/fetching";

import { PlayerCard } from "./PlayerCard";
import { Erro } from "@/app/Erro";

import Link from "next/link"

import styles from "./team.module.css"
import { unwrap } from "@/Result";

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
  

  return <div className={styles.page}>
    <h1 className={`${styles.text} ${styles.center}`}> &quot;{team.value.name}&quot;</h1>
    <h3 className={`${styles.text} ${styles.center}`}> (ID do time: {id})</h3>
    <ul className={styles.playerList}>
    { 
        team.value.players.map((id, i) => 
          <PlayerCard 
            key={i} 
            player={players.value.find((p) => p.id === id)} />
        )
    }
    </ul>
    <div><Link href={`/team/${id}/edit`} replace> Editar time... </Link></div>
  </div>;
} 