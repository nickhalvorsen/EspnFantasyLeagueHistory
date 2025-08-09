import { describe, it, expect } from "vitest";
import { calculateBestSeasonAveragePoints } from "@/data/statCalculators";
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

const getDummyYearlyStats = (
  espnId: number,
  year: number,
  isRegSeasonCompleted: boolean
) => ({
  team: {
    espnId: espnId.toString(),
    primaryOwnerId: "owner1",
    managerName: "Manager 1",
  },
  year: year,
  finalRank: isRegSeasonCompleted ? 5 : 0,
  tradeCount: 0,
  wins: 1,
  losses: 1,
  ties: 1,
  pointsFor: 1200,
  pointsAgainst: 1000,
  playoffSeed: isRegSeasonCompleted ? 5 : 0,
  numPlayersInPlayoffs: 4,
});

describe("calculateBestSeasonAveragePoints", () => {
  it("calculates average points for a single season", () => {
    const weekly = [
      getDummyWeeklyStats(2022, 1, 100),
      getDummyWeeklyStats(2022, 2, 120),
      getDummyWeeklyStats(2022, 3, 110),
    ];
    const yearly = [getDummyYearlyStats(1, 2022, true)];
    const result = calculateBestSeasonAveragePoints(yearly, weekly);
    console.log("Average points for 2022:", result);
    expect(result[0].average).toBeCloseTo((100 + 120 + 110) / 3, 5);
  });

  it("ignores postseason games", () => {
    const weekly = [
      getDummyWeeklyStats(2022, 1, 100),
      getDummyWeeklyStats(2022, 2, 120, true), // postseason
      getDummyWeeklyStats(2022, 3, 110),
    ];
    const yearly = [getDummyYearlyStats(1, 2022, true)];
    const result = calculateBestSeasonAveragePoints(yearly, weekly);
    expect(result[0].average).toBeCloseTo((100 + 110) / 2, 5);
  });

  it("handles multiple seasons and picks the best average", () => {
    const weekly = [
      getDummyWeeklyStats(2021, 1, 90),
      getDummyWeeklyStats(2021, 2, 95),
      getDummyWeeklyStats(2022, 1, 110),
      getDummyWeeklyStats(2022, 2, 120),
    ];
    const yearly = [
      getDummyYearlyStats(1, 2021, true),
      getDummyYearlyStats(1, 2022, true),
    ];
    const result = calculateBestSeasonAveragePoints(yearly, weekly);
    expect(result[0].average).toBeCloseTo((110 + 120) / 2, 5);
    expect(result[1].average).toBeCloseTo((90 + 95) / 2, 5);
  });

  it("ignores incomplete regular seasons", () => {
    const weekly = [
      getDummyWeeklyStats(2021, 1, 900),
      getDummyWeeklyStats(2021, 2, 950),
      getDummyWeeklyStats(2022, 1, 110),
      getDummyWeeklyStats(2022, 2, 120),
    ];
    const yearly = [
      getDummyYearlyStats(1, 2021, false), // incomplete
      getDummyYearlyStats(1, 2022, true),
    ];
    const result = calculateBestSeasonAveragePoints(yearly, weekly);
    expect(result[0].average).toBeCloseTo((110 + 120) / 2, 5);
  });

  it("handles multi-header weeks by summing multiHeaderPoints", () => {
    const weekly = [
      getDummyWeeklyStats(2023, 1, 110, false, false, true, [50, 60]),
      getDummyWeeklyStats(2023, 2, 120),
    ];
    const yearly = [getDummyYearlyStats(1, 2023, true)];
    const result = calculateBestSeasonAveragePoints(yearly, weekly);
    expect(result[0].average).toBeCloseTo((50 + 60 + 120) / 3, 5);
  });
});
