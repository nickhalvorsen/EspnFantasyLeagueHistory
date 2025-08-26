import { useStore } from "../data/useStore";

type NewProps = {
  year: number;
};

const New = ({ year }: NewProps) => {
  const store = useStore();
  if (!year || store.allData.leagueInfo.latestYear !== year) return null;

  return <span className="ml-1">{"🆕"}</span>;
};

export default New;
