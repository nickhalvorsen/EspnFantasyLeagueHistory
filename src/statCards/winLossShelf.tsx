import { useStore } from "../useData";
import classes from "./trophyShelf.module.scss";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";

const WinLossShelf = () => {
  const allData = useStore();
  const data = allData.teams
    ?.map((team) => {
      const wins =
        allData.teamYears
          ?.filter((year) => year.teamEspnId === team.espnId)
          .reduce((acc, year) => acc + year.wins, 0) || 0;
      const losses =
        allData.teamYears
          ?.filter((year) => year.teamEspnId === team.espnId)
          .reduce((acc, year) => acc + year.losses, 0) || 0;
      const ties =
        allData.teamYears
          ?.filter((year) => year.teamEspnId === team.espnId)
          .reduce((acc, year) => acc + year.ties, 0) || 0;
      return {
        manager: team.managerName,
        winrate: wins / (wins + losses),
        differential: wins - losses,
        label: ties ? `${wins}–${losses}–${ties}` : `${wins}–${losses}`,
      };
    })
    .sort((a, b) => b.differential - a.differential);

  return (
    <Shelf title="Career Win/Loss">
      {data.map((item) => (
        <ShelfRow key={item.manager} label={item.manager}>
          {item.label}&nbsp;({Math.round(item.winrate * 100)}%)
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { WinLossShelf };
