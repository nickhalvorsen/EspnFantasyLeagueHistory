import { useEffect } from "react";
import { create } from "zustand";

const useStore = create<AllData>((set) => ({
  teams: [],
  teamYears: [],
  setAllData: (data: AllData) => {
    const teamsWithAddedData = data.teams?.map((team) => ({
      ...team,
      trophies:
        data.teamYears?.filter(
          (year) => year.finalRank === 1 && year.teamEspnId === team.espnId
        ).length || 0,
    }));
    set({
      teams: teamsWithAddedData,
      teamYears: data.teamYears,
      teamWeeks: data.teamWeeks,
      lastSuccessfulLoad: new Date(data.lastSuccessfulLoad),
    });
  },
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
  teamWeeks?: TeamWeeksEntity[] | null;
  lastSuccessfulLoad?: Date | null;
}
export interface TeamsEntity {
  espnId: string;
  primaryOwnerId: string;
  managerName: string;
  trophies: number;
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
export interface TeamWeeksEntity {
  year: number;
  week: number;
  awayTeamEspnId: string;
  homeTeamEspnId: string;
  awayTeamScore: number;
  homeTeamScore: number;
  winner: string;
}
