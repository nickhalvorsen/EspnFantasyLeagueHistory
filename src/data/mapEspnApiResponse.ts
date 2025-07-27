type yearlyStats = {
  team: {
    espnId: string;
    primaryOwnerId: string;
    managerName: string;
  };
  year: number;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  pointsAgainst: number;
  playoffSeed: number;
  finalRank: number;
};

type weeklyStats = {
  year: number;
  weekNumber: number;
  teamEspnId: number;
  pointsFor: number;
  pointsAgainst: number;
  result: "WIN" | "LOSS" | "TIE";
  opponentEspnId: number;
  isMultiHeader?: boolean;
  multiHeaderPoints?: number[];
};

const mapAllStats = (getYearDataApiResponse: GetYearDataApiResponse[]) => {
  const allStats: AllStats = {
    teams: [],
    teamStats: [],
  };

  let allTeamStatsByYear: yearlyStats[] = [];
  const allTeamStatsByWeek: weeklyStats[] = [];

  getYearDataApiResponse.forEach((yearData) => {
    yearData.teams.forEach((team) => {
      allTeamStatsByYear.push({
        team: {
          espnId: team.id.toString(),
          primaryOwnerId: team.primaryOwner,
          managerName:
            yearData.members
              .find((m) => m.id === team.primaryOwner)!
              .firstName.charAt(0)
              .toUpperCase() +
            yearData.members
              .find((m) => m.id === team.primaryOwner)!
              .firstName.slice(1),
        },
        year: yearData.seasonId,
        wins: team.record.overall.wins,
        losses: team.record.overall.losses,
        ties: team.record.overall.ties,
        pointsFor: team.record.overall.pointsFor,
        pointsAgainst: team.record.overall.pointsAgainst,
        playoffSeed: team.playoffSeed,
        finalRank: team.rankCalculatedFinal,
      });
    });

    yearData.schedule.forEach((schedule) => {
      allTeamStatsByWeek.push({
        year: yearData.seasonId,
        weekNumber: schedule.matchupPeriodId,
        teamEspnId: schedule.away.teamId,
        pointsFor: schedule.away.totalPoints,
        pointsAgainst: schedule.home.totalPoints,
        result:
          schedule.winner === "TIE"
            ? "TIE"
            : schedule.winner === "AWAY"
            ? "WIN"
            : "LOSS",
        opponentEspnId: schedule.home.teamId,
        isMultiHeader:
          Object.keys(schedule.away.pointsByScoringPeriod).length > 1,
        multiHeaderPoints: Object.values(schedule.away.pointsByScoringPeriod),
      });

      allTeamStatsByWeek.push({
        year: yearData.seasonId,
        weekNumber: schedule.matchupPeriodId,
        teamEspnId: schedule.home.teamId,
        pointsFor: schedule.home.totalPoints,
        pointsAgainst: schedule.away.totalPoints,
        result:
          schedule.winner === "TIE"
            ? "TIE"
            : schedule.winner === "HOME"
            ? "WIN"
            : "LOSS",
        opponentEspnId: schedule.away.teamId,
        isMultiHeader:
          Object.keys(schedule.home.pointsByScoringPeriod).length > 1,
        multiHeaderPoints: Object.values(schedule.home.pointsByScoringPeriod),
      });
    });
  });

  // 4 = BIN
  // Bri isn't appearing here. I don't know why. But the team should be omitted anyway.
  const espnTeamIdsToOmit = ["4"];
  allTeamStatsByYear = allTeamStatsByYear.filter(
    (s) => !espnTeamIdsToOmit.includes(s.team.espnId)
  );

  // Get unique teams by espnId
  allStats.teams = Array.from(
    new Map(
      allTeamStatsByYear.map((yearStat) => [
        yearStat.team.espnId,
        yearStat.team,
      ])
    ).values()
  );

  allStats.teams.forEach((team) => {
    const thisTeamStatsByYear = allTeamStatsByYear.filter(
      (yearStat) => yearStat.team.espnId === team.espnId
    );
    const thisTeamStatsByWeek = allTeamStatsByWeek.filter(
      (weekStat) => weekStat.teamEspnId.toString() === team.espnId
    );

    const thisTeamsStats: TeamFullStats = {
      team: team,
      trophies: calculateTrophyCount(thisTeamStatsByYear),
      trophyYears: calculateTrophyYears(thisTeamStatsByYear),
      binYears: calculateBinYears(thisTeamStatsByYear, allTeamStatsByYear),
      averagePointsPerGame: calculateAveragePointsPerGame(thisTeamStatsByWeek),
      averagePointsAgainstPerGame:
        calculateAveragePointsAgainstPerGame(thisTeamStatsByWeek),
      highScores: calculateHighScores(thisTeamStatsByWeek),
      lowScores: calculateLowScores(thisTeamStatsByWeek),
      biggestBlowouts: calculateBiggestBlowouts(thisTeamStatsByWeek),
      playoffPercentage: calculatePlayoffPercentage(thisTeamStatsByYear),
      winLossRecord: calculateWinLossRecord(thisTeamStatsByYear),

      // TODO
      averagePointsPerGameYearly: {},
      averagePointsAgainstPerGameYearly: {},
      longestWinStreak: 0,
      longestLossStreak: 0,
    };
    allStats.teamStats.push(thisTeamsStats);
  });

  return allStats;
};

const calculateTrophyYears = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear
    .filter((yearStat) => yearStat.finalRank === 1)
    .map((yearStat) => yearStat.year);
};

const calculateTrophyCount = (teamStatsByYear: yearlyStats[]) =>
  calculateTrophyYears(teamStatsByYear).length;

const calculateBinYears = (
  teamStatsByYear: yearlyStats[],
  allTeamStatsByYear: yearlyStats[]
) => {
  const yearToMaxRank = allTeamStatsByYear.reduce((acc, year) => {
    if (!acc[year.year] || year.finalRank > acc[year.year]) {
      acc[year.year] = year.finalRank;
    }
    return acc;
  }, {} as Record<number, number>);

  return teamStatsByYear
    .filter((yearStat) => yearStat.playoffSeed === yearToMaxRank[yearStat.year])
    .map((yearStat) => yearStat.year);
};

const calculateAveragePointsPerGame = (thisTeamStatsByWeek: weeklyStats[]) => {
  const totalPoints = thisTeamStatsByWeek.reduce(
    (sum, weekStat) => sum + weekStat.pointsFor,
    0
  );

  const weeks = thisTeamStatsByWeek.reduce(
    (sum, weekStat) =>
      sum + (weekStat.isMultiHeader ? weekStat.multiHeaderPoints!.length : 1),
    0
  );

  return totalPoints / weeks;
};

const calculateAveragePointsAgainstPerGame = (
  thisTeamStatsByWeek: weeklyStats[]
) => {
  const totalPoints = thisTeamStatsByWeek.reduce(
    (sum, weekStat) => sum + weekStat.pointsAgainst,
    0
  );

  const weeks = thisTeamStatsByWeek.reduce(
    (sum, weekStat) =>
      sum + (weekStat.isMultiHeader ? weekStat.multiHeaderPoints!.length : 1),
    0
  );

  return totalPoints / weeks;
};

const calculateHighScores = (thisTeamStatsByWeek: weeklyStats[]) => {
  const weeksWithDoubleHeadersSplitOut = thisTeamStatsByWeek.flatMap(
    (weekStat) => {
      if (weekStat.isMultiHeader) {
        return weekStat.multiHeaderPoints!.map((points, idx) => ({
          year: weekStat.year,
          weekNumber: weekStat.weekNumber,
          teamEspnId: weekStat.teamEspnId,
          pointsFor: points,
          pointsAgainst: weekStat.pointsAgainst,
          result: weekStat.result,
          opponentEspnId: weekStat.opponentEspnId,
        }));
      }
      return [weekStat];
    }
  );

  return [...weeksWithDoubleHeadersSplitOut]
    .sort((a, b) => b.pointsFor - a.pointsFor)
    .slice(0, 5)
    .map((weekStat) => ({
      year: weekStat.year,
      week: weekStat.weekNumber,
      value: weekStat.pointsFor,
    }));
};

const calculateLowScores = (thisTeamStatsByWeek: weeklyStats[]) => {
  return [...thisTeamStatsByWeek]
    .sort((a, b) => a.pointsFor - b.pointsFor)
    .slice(0, 5)
    .map((weekStat) => ({
      year: weekStat.year,
      week: weekStat.weekNumber,
      value: weekStat.pointsFor,
    }));
};

const calculateBiggestBlowouts = (thisTeamStatsByWeek: weeklyStats[]) => {
  return [...thisTeamStatsByWeek]
    .sort(
      (a, b) =>
        Math.abs(b.pointsFor - b.pointsAgainst) -
        Math.abs(a.pointsFor - a.pointsAgainst)
    )
    .slice(0, 5)
    .map((weekStat) => ({
      year: weekStat.year,
      week: weekStat.weekNumber,
      value: Math.abs(weekStat.pointsFor - weekStat.pointsAgainst),
      message: `Blowout of ${weekStat.opponentEspnId} by ${Math.abs(
        weekStat.pointsFor - weekStat.pointsAgainst
      )} points`,
    }));
};

// todo: add fractional playoff percentage
const calculatePlayoffPercentage = (teamStatsByYear: yearlyStats[]) => {
  const playoffAppearances = teamStatsByYear.filter(
    (yearStat) => yearStat.playoffSeed <= 4
  ).length;
  return (playoffAppearances / teamStatsByYear.length) * 100 || 0; // Return percentage of years made playoffs
};

const calculateWinLossRecord = (teamStatsByYear: yearlyStats[]) => {
  const wins = teamStatsByYear.reduce(
    (sum, yearStat) => sum + yearStat.wins,
    0
  );
  const losses = teamStatsByYear.reduce(
    (sum, yearStat) => sum + yearStat.losses,
    0
  );
  const ties = teamStatsByYear.reduce(
    (sum, yearStat) => sum + yearStat.ties,
    0
  );
  return { wins, losses, ties };
};

export { mapAllStats };
