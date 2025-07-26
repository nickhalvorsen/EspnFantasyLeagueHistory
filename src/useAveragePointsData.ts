import { useStore } from "./useData";

const useAveragePointsData = () => {
  const allData = useStore();
  let data = allData.teams.map((team) => ({
    manager: team.managerName,
    teamEspnId: team.espnId,
    averagePoints: 0,
  }));

  for (const team of allData.teams) {
    const teamWeeks = allData.teamWeeks.filter(
      (week) =>
        week.awayTeamEspnId === team.espnId ||
        week.homeTeamEspnId === team.espnId
    );
    const totalPoints = teamWeeks.reduce((acc, week) => {
      return (
        acc +
        (week.awayTeamEspnId === team.espnId
          ? week.awayTeamScore
          : week.homeTeamScore)
      );
    }, 0);
    const averagePoints = totalPoints / teamWeeks.length;

    data.find((t) => t.teamEspnId === team.espnId).averagePoints =
      averagePoints.toFixed(2);
  }
  data = data.sort((a, b) => b.averagePoints - a.averagePoints);

  return data;
};

export { useAveragePointsData };
