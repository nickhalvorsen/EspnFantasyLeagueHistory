import { create } from "zustand";

type MyStore = {
  allData: AllStats;
  isLoading: boolean;
  isLoaded: boolean;
  setAllData: (data: AllStats) => void;
  setLoaded: () => void;
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
  isLoading: true,
  isLoaded: false,
  setAllData: (data: AllStats) => {
    set({
      allData: data,
    });
  },
  setLoaded: () => {
    set({
      isLoading: false,
      isLoaded: true,
    });
  },
}));

export { useStore };
