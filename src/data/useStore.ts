import { create } from "zustand";

type MyStore = {
  allData: AllStats;
  setAllData: (data: AllStats) => void;
};

const useStore = create<MyStore>((set) => ({
  allData: {
    teams: [],
    teamStats: [],
    leagueInfo: {
      leagueName: "",
      startYear: 0,
      latestYear: 0,
      regularSeasonMatchups: 0,
      maximumPlayerCount: 0,
    },
  },
  setAllData: (data: AllStats) => {
    set({
      allData: data,
    });
  },
}));

export { useStore };
