import {
  espnTeamIdsToOmit,
  type weeklyStats,
  type yearlyStats,
} from "./mapEspnApiResponse";

const calculateTrophyYears = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear
    .filter((yearStat) => yearStat.finalRank === 1)
    .map((yearStat) => yearStat.year)
    .sort((a, b) => a - b);
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
  thisTeamStatsByWeek = thisTeamStatsByWeek.filter((x) => !x.isPostSeason);

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
        return weekStat.multiHeaderPoints!.map((points) => ({
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
  const totalPossiblePlayoffs = teamStatsByYear.filter(
    (x) => x.playoffSeed != 0
  ).length;
  return (playoffAppearances / totalPossiblePlayoffs) * 100 || 0;
};

const calculatePlayoffAppearances = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear.filter(
    (yearStat) => yearStat.playoffSeed <= yearStat.numPlayersInPlayoffs
  ).length;
};

const calculateWinLossRecord = (teamStatsByYear: yearlyStats[]) => {
  //yearStat.wins is regular season only
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

const calculateWinLossRecordAgainst = (thisTeamStatsByWeek: weeklyStats[]) => {
  const records: WinsAndLossesAgainst[] = [];

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
      thisRecord!.wins += 1;
    } else if (weekStat.result === "LOSS") {
      thisRecord!.losses += 1;
    } else if (weekStat.result === "TIE") {
      thisRecord!.ties += 1;
    }
  });

  return records;
};

const calculatePlayoffWinLossRecordAgainst = (
  thisTeamStatsByWeek: weeklyStats[]
) => {
  const records: WinsAndLossesAgainst[] = [];

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
      thisRecord!.wins += 1;
    } else if (weekStat.result === "LOSS") {
      thisRecord!.losses += 1;
    } else if (weekStat.result === "TIE") {
      thisRecord!.ties += 1;
    }
  });

  return records;
};

const calculateBestSeasonRecords = (teamStatsByYear: yearlyStats[]) =>
  teamStatsByYear
    // filter to only completed seasons
    .filter((x) => x.playoffSeed !== 0)
    .sort((a, b) => b.wins - a.wins || a.losses - b.losses)
    .slice(0, 10)
    .map((yearStat) => ({
      wins: yearStat.wins,
      losses: yearStat.losses,
      ties: yearStat.ties,
      year: yearStat.year,
    }));

const calculateWorstSeasonRecords = (teamStatsByYear: yearlyStats[]) =>
  teamStatsByYear
    // filter to only completed seasons
    .filter((x) => x.playoffSeed !== 0)
    .sort((a, b) => b.losses - a.losses || a.wins - b.wins)
    .slice(0, 10)
    .map((yearStat) => ({
      wins: yearStat.wins,
      losses: yearStat.losses,
      ties: yearStat.ties,
      year: yearStat.year,
    }));

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

const calculateBiggestMatchups = (thisTeamStatsByWeek: weeklyStats[]) => {
  return [...thisTeamStatsByWeek]
    .sort(
      (a, b) => b.pointsFor + b.pointsAgainst - (a.pointsFor + a.pointsAgainst)
    )
    .filter((x) => !x.isMultiHeader)
    .filter((x) => x.opponentEspnId !== 4)
    .slice(0, 10)
    .map((weekStat) => ({
      year: weekStat.year,
      week: weekStat.weekNumber,
      total: weekStat.pointsFor + weekStat.pointsAgainst,
      manager1: weekStat.teamEspnId.toString(),
      manager1score: weekStat.pointsFor,
      manager2: weekStat.opponentEspnId.toString(),
      manager2score: weekStat.pointsAgainst,
    }));
};

const calculateLowestMatchups = (thisTeamStatsByWeek: weeklyStats[]) => {
  return [...thisTeamStatsByWeek]
    .sort(
      (a, b) => a.pointsFor + a.pointsAgainst - (b.pointsFor + b.pointsAgainst)
    )
    .filter((x) => !x.isMultiHeader)
    .filter((x) => x.opponentEspnId !== 4)
    .slice(0, 10)
    .map((weekStat) => ({
      year: weekStat.year,
      week: weekStat.weekNumber,
      total: weekStat.pointsFor + weekStat.pointsAgainst,
      manager1: weekStat.teamEspnId.toString(),
      manager1score: weekStat.pointsFor,
      manager2: weekStat.opponentEspnId.toString(),
      manager2score: weekStat.pointsAgainst,
    }));
};

const calculateLifetimePointsFor = (thisTeamStatsByWeek: weeklyStats[]) => {
  thisTeamStatsByWeek = thisTeamStatsByWeek.filter((x) => !x.isPostSeason);
  return thisTeamStatsByWeek.reduce((sum, weekStat) => {
    return sum + weekStat.pointsFor;
  }, 0);
};

const calculatePlacementHistory = (teamStatsByYear: yearlyStats[]) =>
  teamStatsByYear
    .filter((x) => x.finalRank > 0)
    .map((x) => ({ year: x.year, place: x.finalRank }));

const calculateBestFinish = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear
    .filter((x) => x.finalRank > 0)
    .reduce((best, yearStat) => Math.min(best, yearStat.finalRank), Infinity);
};

const calculateWorstFinish = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear
    .filter((x) => x.finalRank > 0)
    .reduce((worst, yearStat) => Math.max(worst, yearStat.finalRank), 0);
};

const calculateBestSeasonAveragePoints = (
  teamStatsByYear: yearlyStats[],
  teamStatsByWeek: weeklyStats[]
) =>
  calculateAveragePointsBySeason(teamStatsByYear, teamStatsByWeek)
    .sort((a, b) => b.average - a.average)
    .slice(0, 10);

const calculateWorstSeasonAveragePoints = (
  teamStatsByYear: yearlyStats[],
  teamStatsByWeek: weeklyStats[]
) =>
  calculateAveragePointsBySeason(teamStatsByYear, teamStatsByWeek)
    .sort((a, b) => a.average - b.average)
    .slice(0, 10);

const calculateAveragePointsBySeason = (
  teamStatsByYear: yearlyStats[],
  teamStatsByWeek: weeklyStats[]
) => {
  const seasonMap = new Map<number, { totalPoints: number; weeks: number }>();
  teamStatsByWeek
    .filter((x) =>
      teamStatsByYear.some((y) => y.year === x.year && y.playoffSeed !== 0)
    )
    .filter((x) => !x.isPostSeason)
    .forEach((weekStat) => {
      const year = weekStat.year;
      const points = weekStat.pointsFor;
      const weekCount = weekStat.isMultiHeader
        ? weekStat.multiHeaderPoints!.length
        : 1;

      if (!seasonMap.has(year)) {
        seasonMap.set(year, { totalPoints: 0, weeks: 0 });
      }
      const season = seasonMap.get(year)!;
      season.totalPoints += points;
      season.weeks += weekCount;
    });

  return Array.from(seasonMap.entries()).map(
    ([year, { totalPoints, weeks }]) => ({
      year,
      average: totalPoints / weeks,
      place: teamStatsByYear.find((y) => y.year === year)?.finalRank || 0,
    })
  );
};

const calculatePointDifferentialByOpponent = (
  thisTeamStatsByWeek: weeklyStats[]
) => {
  const matchups: PointDifferentialAgainst[] = [];

  thisTeamStatsByWeek.forEach((weekStat) => {
    if (weekStat.isPostSeason) return;
    if (espnTeamIdsToOmit.includes(weekStat.opponentEspnId.toString())) return;

    let thisMatchup = matchups.find(
      (matchup) => matchup.opponentEspnId === weekStat.opponentEspnId
    );

    if (!thisMatchup) {
      matchups.push({
        opponentEspnId: weekStat.opponentEspnId,
        pointDifferential: 0,
      });

      thisMatchup = matchups.find(
        (matchup) => matchup.opponentEspnId === weekStat.opponentEspnId
      );
    }
    thisMatchup!.pointDifferential +=
      weekStat.pointsFor - weekStat.pointsAgainst;
  });

  return matchups;
};

const calculateStreakByOpponent = (thisTeamStatsByWeek: weeklyStats[]) => {
  const streaks: {
    opponentEspnId: number;
    streak: number;
    result: "WIN" | "LOSS" | "TIE" | null;
  }[] = [];

  const filteredWeeks = thisTeamStatsByWeek
    .filter((x) => !x.isPostSeason)
    .filter((x) => !espnTeamIdsToOmit.includes(x.opponentEspnId.toString()))
    .sort((a, b) => a.year - b.year || a.weekNumber - b.weekNumber);

  const opponentMap = new Map<
    number,
    { streak: number; result: "WIN" | "LOSS" | "TIE" | null }
  >();

  filteredWeeks.forEach((weekStat) => {
    const oppId = weekStat.opponentEspnId;
    const prev = opponentMap.get(oppId);

    if (!prev) {
      opponentMap.set(oppId, { streak: 1, result: weekStat.result });
    } else {
      if (weekStat.result === prev.result) {
        opponentMap.set(oppId, {
          streak: prev.streak + 1,
          result: prev.result,
        });
      } else {
        opponentMap.set(oppId, { streak: 1, result: weekStat.result });
      }
    }
  });

  opponentMap.forEach((value, key) => {
    streaks.push({
      opponentEspnId: key,
      streak: value.streak,
      result: value.result,
    });
  });

  return streaks;
};

export {
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
  calculateAveragePointsBySeason,
  calculateBestSeasonAveragePoints,
  calculateWorstSeasonAveragePoints,
  calculatePointDifferentialByOpponent,
  calculateStreakByOpponent,
};
