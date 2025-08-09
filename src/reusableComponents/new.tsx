import { useStore } from "../useData";

type NewProps = {
  year: number;
};

const New = ({ year }: NewProps) => {
  const allData = useStore();
  if (!year || allData.leagueInfo.latestYear !== year) return null;

  return <span className="ml-1">{"🆕"}</span>;
};

export default New;
