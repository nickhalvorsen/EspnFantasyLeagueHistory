import { useEffect } from "react";
import { getAllYears, getYearData } from "./espnApi";
import { mapAllStats } from "./mapEspnApiResponse";
import { useStore } from "./useStore";

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

export { useLoadData };
