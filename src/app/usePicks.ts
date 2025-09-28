import { use, useEffect, useState } from "react";
import type { Pick } from "../domain/Pick";
import { useRepo } from "./DataProvider";
import { set } from "zod";

export function usePicks() {
  const repo = useRepo();
  const [data, setData] = useState<Pick[] | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    repo.getAll()
      .then((p) => {
        if (alive)  setData(p);
      })
      .catch((e) => {
        if (alive) setError(e);
      } )
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => { 
      alive = false; 
    };
  }, [repo]);
  
  return { data, error, loading };
}      

