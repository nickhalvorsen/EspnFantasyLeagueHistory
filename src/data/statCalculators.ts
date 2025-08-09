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
  return (playoffAppearances / teamStatsByYear.length) * 100 || 0;
};

const calculatePlayoffAppearances = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear.filter((yearStat) => yearStat.playoffSeed <= 4).length;
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
    .sort((a, b) => b.losses - a.losses || a.wins - b.wins)
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

const calculatePlacementHistory = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear.reduce((acc, yearStat) => {
    acc[yearStat.finalRank] = acc[yearStat.finalRank]
      ? acc[yearStat.finalRank] + 1
      : 1;
    return acc;
  }, {} as Record<number, number>);
};

const calculateBestFinish = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear.reduce(
    (best, yearStat) => Math.min(best, yearStat.finalRank),
    Infinity
  );
};

const calculateWorstFinish = (teamStatsByYear: yearlyStats[]) => {
  return teamStatsByYear.reduce(
    (worst, yearStat) => Math.max(worst, yearStat.finalRank),
    0
  );
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
};
