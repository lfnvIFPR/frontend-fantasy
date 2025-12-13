"use client";

import { PlayerTeam } from "@/types";
import Link from "next/link";
import styles from "./page.module.css"

export default function TeamList({playerTeams}: {
  playerTeams: PlayerTeam[]
}) {

  
  return (
    <ul>
      {
        playerTeams.map((team, idx) => <li key={idx}> 
        <Link
          href={`/team/${team.id}/`}
        >
          {`(id=${team.id}): ${team.name}`}
        </Link>
        </li>)
      }
    </ul>
  );
}