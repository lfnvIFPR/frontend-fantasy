import { PlayerTeam, Player, Result } from "@/types";
import { fetchTeam, fetchPlayers } from "./fetching";

import { PlayerCard } from "./PlayerCard";
import { Erro } from "@/app/Erro";

import styles from "./team.module.css"

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
    <h1 className={`${styles.text} ${styles.center}`}> Team {id} - "{team.value.name}"</h1>
    <ul className={styles.playerList}>
    { 
        team.value.players.map((id, i) => 
            <PlayerCard key={i} player={players.value.find((p) => p.id === id)}/>)
    }
    </ul>
  </div>;
} 