import { describe, it, expect } from "vitest";
import { calculateAveragePointsPerGame } from "@/data/statCalculators";
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

describe("calculateAveragePointsPerGame", () => {
  it("should calculate average points per game single game", () => {
    const thisTeamsWeeks: weeklyStats[] = [getDummyWeeklyStats(2020, 1, 120)];

    const result = calculateAveragePointsPerGame(thisTeamsWeeks);
    expect(result).toEqual(120);
  });

  it("should accomodate decimal points", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 95.44),
      getDummyWeeklyStats(2020, 2, 126),
      getDummyWeeklyStats(2020, 3, 132),
    ];

    const result = calculateAveragePointsPerGame(thisTeamsWeeks);
    expect(result.toFixed(2)).toEqual((117.81).toFixed(2));
  });

  it("should NOT accomodate playoff games ", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 100),
      getDummyWeeklyStats(2020, 2, 120, true, true, false, []),
      getDummyWeeklyStats(2020, 3, 130, true, false, false, []),
    ];

    const result = calculateAveragePointsPerGame(thisTeamsWeeks);
    expect(result.toFixed(2)).toEqual((100).toFixed(2));
  });

  it("should consider double header games as two weeks", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 100),
      getDummyWeeklyStats(2020, 4, 290, false, true, true, [140, 150]),
    ];

    const result = calculateAveragePointsPerGame(thisTeamsWeeks);
    expect(result.toFixed(2)).toEqual((130).toFixed(2));
  });
});
