import type { Err } from "@/types";
import { ReactNode } from "react";

export function Erro<E extends ReactNode>({err}: { err: Err<E>}) {

  return (
  <div>
    <h1>ERRO</h1>
    <h2>what(): {err.error}</h2>
  </div>
  );
}