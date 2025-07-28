// import { useStore } from "../useData";
// import { Shelf, ShelfRow } from "../reusableComponents/shelf";
// import { winLossTieString } from "@/reusableComponents/winLossTieString";
// import { SubSubText } from "@/reusableComponents/subSubText";

// type Props = {
//   managerEspnId: string;
// };

// const PlacementHistoryShelf = ({ managerEspnId }: Props) => {
//   const teamStats = useStore((s) => s.teamStats);
//   const data = teamStats.find(
//     (teamStats) => teamStats.team.espnId === managerEspnId
//   );

//   return (
//     <Shelf title="Win/loss vs. manager" description="Regular season, all-time">
//       {data.map((record) => (
//         <ShelfRow key={record.opponentEspnId} label={record.name}>
//           {winLossTieString(record.wins, record.losses, record.ties)}

//           <SubSubText>
//             &nbsp;(
//             {record.winrate}
//             %)
//           </SubSubText>
//         </ShelfRow>
//       ))}
//     </Shelf>
//   );
// };

// export { PlacementHistoryShelf };
