import {
  calculateTrophyYears,
  calculateTrophyCount,
  calculateBinYears,
  calculateAveragePointsPerGame,
  calculateAveragePointsAgainstPerGame,
  calculateHighScores,
  calculateLowScores,
  calculatePlayoffPercentage,
  calculatePlayoffAppearances,
  calculateWinLossRecord,
  calculateWinLossRecordAgainst,
  calculatePlayoffWinLossRecordAgainst,
  calculateBestSeasonRecords,
  calculateWorstSeasonRecords,
  calculateLongestWinStreak,
  calculateLongestLossStreak,
  calculateTradeCount,
  calculateClosestGames,
  calculateBiggestBlowouts,
  calculateBiggestMatchups,
  calculateLowestMatchups,
  calculateLifetimePointsFor,
  calculatePlacementHistory,
  calculateBestFinish,
  calculateWorstFinish,
} from "./statCalculators";

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
  tradeCount: number;
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
  isPostSeason?: boolean;
  isWinnersBracketPostSeason?: boolean;
};

// 4 = BIN
// Bri isn't appearing here. I don't know why. But the team should be omitted anyway.
const espnTeamIdsToOmit = ["4"];

const mapAllStats = (getYearDataApiResponse: GetYearDataApiResponse[]) => {
  const allStats: AllStats = {
    teams: [],
    teamStats: [],
    leagueInfo: {
      leagueName: "",
      startYear: 0,
      latestYear: 0,
      regularSeasonMatchups: 0,
      maximumPlayerCount: 0,
    },
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
        tradeCount: team.transactionCounter.trades,
      });
    });

    yearData.schedule.forEach((schedule) => {
      if (schedule.winner === "UNDECIDED") return;

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
        isPostSeason: schedule.playoffTierType !== "NONE",
        isWinnersBracketPostSeason:
          schedule.playoffTierType === "WINNERS_BRACKET",
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
        isPostSeason: schedule.playoffTierType !== "NONE",
        isWinnersBracketPostSeason:
          schedule.playoffTierType === "WINNERS_BRACKET",
      });
    });
  });

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
      yearsPlayed: thisTeamStatsByYear.length,
      trophies: calculateTrophyCount(thisTeamStatsByYear),
      trophyYears: calculateTrophyYears(thisTeamStatsByYear),
      binYears: calculateBinYears(thisTeamStatsByYear, allTeamStatsByYear),
      averagePointsPerGame: calculateAveragePointsPerGame(thisTeamStatsByWeek),
      averagePointsAgainstPerGame:
        calculateAveragePointsAgainstPerGame(thisTeamStatsByWeek),
      highScores: calculateHighScores(thisTeamStatsByWeek),
      lowScores: calculateLowScores(thisTeamStatsByWeek),
      playoffPercentage: calculatePlayoffPercentage(thisTeamStatsByYear),
      numPlayoffAppearances: calculatePlayoffAppearances(thisTeamStatsByYear),
      winLossRecord: calculateWinLossRecord(thisTeamStatsByYear),
      winLossRecordAgainst: calculateWinLossRecordAgainst(thisTeamStatsByWeek),
      playoffWinLossRecordAgainst:
        calculatePlayoffWinLossRecordAgainst(thisTeamStatsByWeek),
      bestSeasonRecords: calculateBestSeasonRecords(thisTeamStatsByYear),
      worstSeasonRecords:
        calculateWorstSeasonRecords(thisTeamStatsByYear).reverse(),
      longestWinStreak: calculateLongestWinStreak(thisTeamStatsByWeek),
      longestLossStreak: calculateLongestLossStreak(thisTeamStatsByWeek),
      tradeCount: calculateTradeCount(thisTeamStatsByYear),
      closestGames: calculateClosestGames(thisTeamStatsByWeek),
      biggestBlowouts: calculateBiggestBlowouts(thisTeamStatsByWeek),
      biggestMatchups: calculateBiggestMatchups(thisTeamStatsByWeek),
      lowestMatchups: calculateLowestMatchups(thisTeamStatsByWeek),
      lifetimePointsFor: calculateLifetimePointsFor(thisTeamStatsByWeek),
      placementHistory: calculatePlacementHistory(thisTeamStatsByYear),
      bestFinish: calculateBestFinish(thisTeamStatsByYear),
      worstFinish: calculateWorstFinish(thisTeamStatsByYear),

      // TODO
      averagePointsPerGameYearly: {},
      averagePointsAgainstPerGameYearly: {},
    };
    allStats.teamStats.push(thisTeamsStats);
  });

  allStats.leagueInfo = {
    leagueName:
      getYearDataApiResponse[getYearDataApiResponse.length - 1].settings.name,
    startYear: getYearDataApiResponse[0].seasonId,
    latestYear:
      getYearDataApiResponse[getYearDataApiResponse.length - 1].seasonId,
    regularSeasonMatchups:
      getYearDataApiResponse[getYearDataApiResponse.length - 1].settings
        .scheduleSettings.matchupPeriodCount,
    maximumPlayerCount: getYearDataApiResponse.reduce(
      (max, yearData) =>
        yearData.teams.reduce(
          (max, team) => Math.max(max, team.rankCalculatedFinal),
          max
        ),
      0
    ),
  };

  return allStats;
};

export { mapAllStats, type yearlyStats, type weeklyStats, espnTeamIdsToOmit };
