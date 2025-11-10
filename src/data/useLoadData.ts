import { useEffect, useState } from "react";
import { getAllYears, getYearData } from "./espnApi";
import { mapAllStats } from "./mapEspnApiResponse";
import { useStore } from "./useStore";

const tryGetYearData = (year: number) => {
  try {
    return getYearData(year);
  } catch {}
};

const useLoadData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setAllData = useStore((state) => state.setAllData);

  useEffect(() => {
    const fetchData = async () => {
      const allYears = await getAllYears();

      // Can't find a way to get a list of all league years. Closest seems to be the league history endpoint which returns a list of all historical years.
      const nextYear = Math.max(...allYears) + 1;
      allYears.push(nextYear);

      const allYearData = await Promise.all(
        allYears.map((year) => tryGetYearData(year)).filter((x) => !!x)
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
