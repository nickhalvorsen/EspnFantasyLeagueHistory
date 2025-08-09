import { describe, it, expect } from "vitest";
import { calculateLifetimePointsFor } from "@/data/statCalculators";
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

describe("calculateTotalPoints", () => {
  it("should calculate total points simple data", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 100),
      getDummyWeeklyStats(2020, 2, 120),
      getDummyWeeklyStats(2021, 1, 120),
    ];

    const result = calculateLifetimePointsFor(thisTeamsWeeks);
    expect(result).toEqual(340);
  });

  it("should calculate total points NOT incl. playoffs", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 111, false, false),
      getDummyWeeklyStats(2021, 2, 111, true, false),
      getDummyWeeklyStats(2021, 3, 111, true, true),
    ];

    const result = calculateLifetimePointsFor(thisTeamsWeeks);
    expect(result).toEqual(111);
  });

  it("should calculate total points NOT incl. playoffs and multi-header games", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 111, false, false),
      getDummyWeeklyStats(2021, 2, 111, true, false),
      getDummyWeeklyStats(2021, 3, 111, true, true),
      getDummyWeeklyStats(2021, 3, 222, true, true, true, [111, 111]),
    ];

    const result = calculateLifetimePointsFor(thisTeamsWeeks);
    expect(result).toEqual(111);
  });
});
