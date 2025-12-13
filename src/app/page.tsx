import Image from "next/image";
import styles from "./page.module.css";

import TeamList from "./TeamList";
import { Erro } from "./Erro";
import { fetchPlayerTeams } from "@/fetching";
import { unwrap } from "@/Result";

export default async function Home() {
  
  const playerTeams = await fetchPlayerTeams();

  if (!playerTeams.ok) {
    return <Erro err={playerTeams}/>
  }

  return <main className={styles.page}>
    <h1 className={`${styles.text} ${styles.center}`}>Jogo Fantasy</h1>
    <h3 className={`${styles.text} ${styles.center}`}>Escolha seu time abaixo:</h3>
    
    <TeamList playerTeams={unwrap(playerTeams)}></TeamList>
  </main>
}
