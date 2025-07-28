import { useEffect } from "react";
import { create } from "zustand";
import { getAllYears, getYearData } from "./data/espnApi";
import { mapAllStats } from "./data/mapEspnApiResponse";

type MyStore = AllStats & {
  setAllData: (data: AllStats) => void;
  setLoaded: () => void;
  isLoading: boolean;
  isLoaded: boolean;
};

const useStore = create<MyStore>((set) => ({
  teams: [],
  teamStats: [],
  leagueInfo: {
    leagueName: "",
    startYear: 0,
    latestYear: 0,
    regularSeasonMatchups: 0,
  },
  isLoading: true,
  isLoaded: false,
  setAllData: (data: AllStats) => {
    set({
      teams: data.teams,
      teamStats: data.teamStats,
      leagueInfo: data.leagueInfo,
    });
  },
  setLoaded: () => {
    set({
      isLoading: false,
      isLoaded: true,
    });
  },
}));

const useLoadData = () => {
  const setAllData = useStore((state) => state.setAllData);
  const setLoaded = useStore((state) => state.setLoaded);
  const isLoading = useStore((state) => state.isLoading);
  const isLoaded = useStore((state) => state.isLoaded);

  useEffect(() => {
    const fetchData = async () => {
      const allYears = await getAllYears();
      const allYearData = await Promise.all(
        allYears.map((year) => getYearData(year))
      );

      const mapped = mapAllStats(allYearData);
      setAllData(mapped);
      setLoaded();
    };

    fetchData();
  }, []);

  return { isLoading, isLoaded };
};

export { useStore, useLoadData };
