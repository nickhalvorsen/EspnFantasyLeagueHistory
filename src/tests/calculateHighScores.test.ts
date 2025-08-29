import { describe, it, expect } from "vitest";
import { calculateHighScores } from "@/data/statCalculators";
import type { weeklyStats } from "@/data/mapEspnApiResponse";

const getDummyWeeklyStats = (
  year: number,
  weekNumber: number,
  pointsFor: number,
  isPostSeason: boolean = false,
  isWinnersBracketPostSeason: boolean = false,
  isMultiHeader: boolean = false,
  multiHeaderPoints: number[] = []
): weeklyStats => ({
  year,
  weekNumber,
  teamEspnId: 1,
  pointsFor,
  pointsAgainst: 112,
  result: "LOSS",
  opponentEspnId: 2,
  isMultiHeader: isMultiHeader,
  multiHeaderPoints: multiHeaderPoints,
  isPostSeason: isPostSeason,
  isWinnersBracketPostSeason: isWinnersBracketPostSeason,
});

describe("calculateHighScores", () => {
  it("should calculate top 10 high scores simple data", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 150),
      getDummyWeeklyStats(2020, 2, 120),
      getDummyWeeklyStats(2021, 1, 180),
      getDummyWeeklyStats(2021, 2, 100),
      getDummyWeeklyStats(2022, 1, 200),
    ];

    const result = calculateHighScores(thisTeamsWeeks);
    expect(result).toEqual([
      { year: 2022, week: 1, value: 200 },
      { year: 2021, week: 1, value: 180 },
      { year: 2020, week: 1, value: 150 },
      { year: 2020, week: 2, value: 120 },
      { year: 2021, week: 2, value: 100 },
    ]);
  });

  it("should handle multi-header games by splitting them", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 100),
      getDummyWeeklyStats(2020, 2, 120),
      getDummyWeeklyStats(2020, 3, 0, false, false, true, [160, 140]),
      getDummyWeeklyStats(2021, 1, 110),
    ];

    const result = calculateHighScores(thisTeamsWeeks);
    expect(result).toEqual([
      { year: 2020, week: 3, value: 160 },
      { year: 2020, week: 3, value: 140 },
      { year: 2020, week: 2, value: 120 },
      { year: 2021, week: 1, value: 110 },
      { year: 2020, week: 1, value: 100 },
    ]);
  });

  it("should include playoff games in high scores", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 100, false),
      getDummyWeeklyStats(2020, 14, 180, true, true),
      getDummyWeeklyStats(2020, 15, 120, true, false),
      getDummyWeeklyStats(2021, 1, 110, false),
    ];

    const result = calculateHighScores(thisTeamsWeeks);
    expect(result).toEqual([
      { year: 2020, week: 14, value: 180 },
      { year: 2020, week: 15, value: 120 },
      { year: 2021, week: 1, value: 110 },
      { year: 2020, week: 1, value: 100 },
    ]);
  });

  it("should handle empty array", () => {
    const thisTeamsWeeks: weeklyStats[] = [];

    const result = calculateHighScores(thisTeamsWeeks);
    expect(result).toEqual([]);
  });
});
