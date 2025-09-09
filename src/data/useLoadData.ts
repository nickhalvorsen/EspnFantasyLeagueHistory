import { useEffect, useState } from "react";
import { getAllYears, getYearData } from "./espnApi";
import { mapAllStats } from "./mapEspnApiResponse";
import { useStore } from "./useStore";

const useLoadData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setAllData = useStore((state) => state.setAllData);

  useEffect(() => {
    const fetchData = async () => {
      const allYears = await getAllYears();

      // temp
      if (!allYears.includes(2025)) {
        allYears.push(2025);
      }

      const allYearData = await Promise.all(
        allYears.map((year) => getYearData(year))
      );

      const mapped = mapAllStats(allYearData);
      setAllData(mapped);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { isLoading };
};

export { useLoadData };
