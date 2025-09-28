import { createContext, useContext, type ReactNode } from "react";
import type { PicksRepository } from "../data/PicksRepository";

const RepoContext = createContext<PicksRepository | null>(null);

export function DataProvider({
  repo,
  children,
}: {
  repo: PicksRepository;
  children: ReactNode;
}) {
  return<RepoContext.Provider value={repo}>{children}</RepoContext.Provider>;
}

export function useRepo(): PicksRepository {
  const value = useContext(RepoContext);
  if (!value) throw new Error('No PicksRepository provided');
  return value;
}

