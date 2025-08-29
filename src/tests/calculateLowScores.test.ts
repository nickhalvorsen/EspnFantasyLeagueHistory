import { describe, it, expect } from "vitest";
import { calculateLowScores } from "@/data/statCalculators";
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

describe("calculateLowScores", () => {
  it("should calculate top 10 low scores simple data", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 150),
      getDummyWeeklyStats(2020, 2, 120),
      getDummyWeeklyStats(2021, 1, 80),
      getDummyWeeklyStats(2021, 2, 100),
      getDummyWeeklyStats(2022, 1, 60),
    ];

    const result = calculateLowScores(thisTeamsWeeks);
    expect(result).toEqual([
      { year: 2022, week: 1, value: 60 },
      { year: 2021, week: 1, value: 80 },
      { year: 2021, week: 2, value: 100 },
      { year: 2020, week: 2, value: 120 },
      { year: 2020, week: 1, value: 150 },
    ]);
  });

  it("should handle multi-header games by splitting them", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 100),
      getDummyWeeklyStats(2020, 2, 120),
      getDummyWeeklyStats(2020, 3, 0, false, false, true, [40, 35]),
      getDummyWeeklyStats(2021, 1, 110),
    ];

    const result = calculateLowScores(thisTeamsWeeks);
    expect(result).toEqual([
      { year: 2020, week: 3, value: 35 },
      { year: 2020, week: 3, value: 40 },
      { year: 2020, week: 1, value: 100 },
      { year: 2021, week: 1, value: 110 },
      { year: 2020, week: 2, value: 120 },
    ]);
  });

  it("should include playoff games in low scores", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 100, false),
      getDummyWeeklyStats(2020, 14, 80, true, true),
      getDummyWeeklyStats(2020, 15, 120, true, false),
      getDummyWeeklyStats(2021, 1, 110, false),
    ];

    const result = calculateLowScores(thisTeamsWeeks);
    expect(result).toEqual([
      { year: 2020, week: 14, value: 80 },
      { year: 2020, week: 1, value: 100 },
      { year: 2021, week: 1, value: 110 },
      { year: 2020, week: 15, value: 120 },
    ]);
  });

  it("should handle empty array", () => {
    const thisTeamsWeeks: weeklyStats[] = [];

    const result = calculateLowScores(thisTeamsWeeks);
    expect(result).toEqual([]);
  });
});
