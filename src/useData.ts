import React, { useEffect } from "react";
import { create } from "zustand";

const useStore = create<AllData>((set) => ({
  teams: [],
  teamYears: [],
  setAllData: (data: AllData) =>
    set({ teams: data.teams, teamYears: data.teamYears }),
}));

const useLoadData = () => {
  const setAllData = useStore((state: AllData) => state.setAllData);

  useEffect(() => {
    fetch("http://localhost:7032/api/FetchData")
      .then((res) => res.json())
      .then((data) => setAllData(data))
      .catch((err) => {
        // Optionally handle error
        setAllData(null);
      });
  }, [setAllData]);
};

export { useStore, useLoadData };

export interface AllData {
  teams?: TeamsEntity[] | null;
  teamYears?: TeamYearsEntity[] | null;
}
export interface TeamsEntity {
  espnId: string;
  primaryOwnerId: string;
  managerName: string;
}
export interface TeamYearsEntity {
  year: number;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  pointsAgainst: number;
  playoffSeed: number;
  finalRank: number;
  teamEspnId: string;
}
