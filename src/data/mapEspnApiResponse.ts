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
  };

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
    .slice(0, 10)
    .map((weekStat) => ({
      year: weekStat.year,
      week: weekStat.weekNumber,
      value: weekStat.pointsFor,
    }));
};

const calculateLowScores = (thisTeamStatsByWeek: weeklyStats[]) => {
  return [...thisTeamStatsByWeek]
    .sort((a, b) => a.pointsFor - b.pointsFor)
    .slice(0, 10)
    .map((weekStat) => ({
      year: weekStat.year,
      week: weekStat.weekNumber,
      value: weekStat.pointsFor,
    }));
};

const calculatePlayoffPercentage = (teamStatsByYear: yearlyStats[]) => {
  const playoffAppearances = calculatePlayoffAppearances(teamStatsByYear);
  return (playoffAppearances / teamStatsByYear.length) * 100 || 0;
};

const calculatePlayoffAppearances = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear.filter((yearStat) => yearStat.playoffSeed <= 4).length;
};

const calculateWinLossRecord = (eamStatsByYear: yearlyStats[]) => {
  //yearStat.wins is regular season only
  const wins = eamStatsByYear.reduce((sum, yearStat) => sum + yearStat.wins, 0);
  const losses = eamStatsByYear.reduce(
    (sum, yearStat) => sum + yearStat.losses,
    0
  );
  const ties = eamStatsByYear.reduce((sum, yearStat) => sum + yearStat.ties, 0);
  return { wins, losses, ties };
};

const calculateWinLossRecordAgainst = (thisTeamStatsByWeek: weeklyStats[]) => {
  const records = [];

  thisTeamStatsByWeek.forEach((weekStat) => {
    if (weekStat.isPostSeason) return;
    if (espnTeamIdsToOmit.includes(weekStat.opponentEspnId.toString())) return;

    let thisRecord = records.find(
      (record) => record.opponentEspnId === weekStat.opponentEspnId
    );

    if (!thisRecord) {
      records.push({
        opponentEspnId: weekStat.opponentEspnId,
        wins: 0,
        losses: 0,
        ties: 0,
      });

      thisRecord = records.find(
        (record) => record.opponentEspnId === weekStat.opponentEspnId
      );
    }
    if (weekStat.result === "WIN") {
      thisRecord.wins += 1;
    } else if (weekStat.result === "LOSS") {
      thisRecord.losses += 1;
    } else if (weekStat.result === "TIE") {
      thisRecord.ties += 1;
    }
  });

  return records;
};

// TODO: this is bugged. brandon has 4 wins and zero losses. but he should have one loss.
const calculatePlayoffWinLossRecordAgainst = (
  thisTeamStatsByWeek: weeklyStats[]
) => {
  const records = [];

  if (thisTeamStatsByWeek[0].teamEspnId === 2) {
    console.log(
      "this team stats by week,",
      thisTeamStatsByWeek.filter((x) => x.isWinnersBracketPostSeason)
    );
  }
  thisTeamStatsByWeek.forEach((weekStat) => {
    if (!weekStat.isWinnersBracketPostSeason) return;
    if (espnTeamIdsToOmit.includes(weekStat.opponentEspnId.toString())) return;

    let thisRecord = records.find(
      (record) => record.opponentEspnId === weekStat.opponentEspnId
    );

    if (!thisRecord) {
      records.push({
        opponentEspnId: weekStat.opponentEspnId,
        wins: 0,
        losses: 0,
        ties: 0,
      });

      thisRecord = records.find(
        (record) => record.opponentEspnId === weekStat.opponentEspnId
      );
    }
    if (weekStat.result === "WIN") {
      thisRecord.wins += 1;
    } else if (weekStat.result === "LOSS") {
      thisRecord.losses += 1;
    } else if (weekStat.result === "TIE") {
      thisRecord.ties += 1;
    }
  });

  return records;
};

const calculateBestSeasonRecords = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear
    .sort((a, b) => b.wins - a.wins || a.losses - b.losses)
    .slice(0, 10)
    .map((yearStat) => ({
      wins: yearStat.wins,
      losses: yearStat.losses,
      ties: yearStat.ties,
      year: yearStat.year,
    }));
};

const calculateWorstSeasonRecords = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear
    .sort((a, b) => a.losses - b.losses)
    .slice(0, 10)
    .map((yearStat) => ({
      wins: yearStat.wins,
      losses: yearStat.losses,
      ties: yearStat.ties,
      year: yearStat.year,
    }));
};

const calculateLongestStreak = (
  thisTeamStatsByWeek: weeklyStats[],
  desiredResult: "WIN" | "LOSS"
) => {
  let longestStreak = 0;
  let currentStreak = 0;
  let currentYear = 0;

  thisTeamStatsByWeek = thisTeamStatsByWeek
    .sort((a, b) => a.year - b.year || a.weekNumber - b.weekNumber)
    .filter((x) => !x.isPostSeason);

  thisTeamStatsByWeek.forEach((weekStat) => {
    if (weekStat.year !== currentYear) {
      currentYear = weekStat.year;
      currentStreak = 0; // Reset streak for new year
    }

    if (weekStat.result === desiredResult) {
      currentStreak += 1;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 0;
    }
  });

  return Math.max(longestStreak, currentStreak);
};

const calculateLongestWinStreak = (thisTeamStatsByWeek: weeklyStats[]) =>
  calculateLongestStreak(thisTeamStatsByWeek, "WIN");

const calculateLongestLossStreak = (thisTeamStatsByWeek: weeklyStats[]) =>
  calculateLongestStreak(thisTeamStatsByWeek, "LOSS");

const calculateTradeCount = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear.reduce((sum, yearStat) => {
    const trades = yearStat.tradeCount;
    return sum + trades;
  }, 0);
};

const calculateClosestGames = (thisTeamStatsByWeek: weeklyStats[]) => {
  return [...thisTeamStatsByWeek]
    .sort(
      (a, b) =>
        Math.abs(a.pointsFor - a.pointsAgainst) -
        Math.abs(b.pointsFor - b.pointsAgainst)
    )
    .slice(0, 10)
    .map((weekStat) => ({
      year: weekStat.year,
      week: weekStat.weekNumber,
      margin: Math.abs(weekStat.pointsFor - weekStat.pointsAgainst),
      manager1: weekStat.teamEspnId.toString(),
      manager1score: weekStat.pointsFor,
      manager2: weekStat.opponentEspnId.toString(),
      manager2score: weekStat.pointsAgainst,
    }));
};

const calculateBiggestBlowouts = (thisTeamStatsByWeek: weeklyStats[]) => {
  return [...thisTeamStatsByWeek]
    .sort(
      (a, b) =>
        Math.abs(b.pointsFor - b.pointsAgainst) -
        Math.abs(a.pointsFor - a.pointsAgainst)
    )
    .filter((x) => x.opponentEspnId !== 4)
    .slice(0, 10)
    .map((weekStat) => ({
      year: weekStat.year,
      week: weekStat.weekNumber,
      margin: Math.abs(weekStat.pointsFor - weekStat.pointsAgainst),
      manager1: weekStat.teamEspnId.toString(),
      manager1score: weekStat.pointsFor,
      manager2: weekStat.opponentEspnId.toString(),
      manager2score: weekStat.pointsAgainst,
    }));
};

export { mapAllStats };
