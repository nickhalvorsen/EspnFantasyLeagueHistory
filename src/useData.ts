import { useEffect } from "react";
import { create } from "zustand";
import { getAllYears, getYearData } from "./data/espnApi";
import { mapAllStats } from "./data/mapEspnApiResponse";

type MyStore = AllStats & {
  setAllData: (data: AllStats) => void;
};

const useStore = create<MyStore>((set) => ({
  teams: [],
  teamStats: [],
  setAllData: (data: AllStats) => {
    set({
      teams: data.teams,
      teamStats: data.teamStats,
    });
  },
}));

const useLoadData = () => {
  const setAllData = useStore((state) => state.setAllData);

  useEffect(() => {
    const fetchData = async () => {
      const allYears = await getAllYears();
      const allYearData = await Promise.all(
        allYears.map((year) => getYearData(year))
      );

      const mapped = mapAllStats(allYearData);
      setAllData(mapped);
    };

    fetchData();
  }, []);
};

export { useStore, useLoadData };
