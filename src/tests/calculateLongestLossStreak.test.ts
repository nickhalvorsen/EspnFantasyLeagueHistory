import { describe, it, expect } from "vitest";
import { calculateLongestLossStreak } from "@/data/statCalculators";
import type { weeklyStats } from "@/data/mapEspnApiResponse";

const getDummyWeeklyStats = (
  year: number,
  weekNumber: number,
  result: "WIN" | "LOSS" | "TIE",
  isPostSeason: boolean = false,
  isWinnersBracketPostSeason: boolean = false,
  isMultiHeader: boolean = false,
  multiHeaderPoints: number[] = []
): weeklyStats => ({
  year,
  weekNumber,
  teamEspnId: 1,
  pointsFor: 99,
  pointsAgainst: 112,
  result: result,
  opponentEspnId: 2,
  isMultiHeader: isMultiHeader,
  multiHeaderPoints: multiHeaderPoints,
  isPostSeason: isPostSeason,
  isWinnersBracketPostSeason: isWinnersBracketPostSeason,
});

describe("calculateLongestLossStreak", () => {
  it("should calculate longest loss streak zero losses", () => {
    const thisTeamsWeeks: weeklyStats[] = [getDummyWeeklyStats(2020, 1, "WIN")];

    const result = calculateLongestLossStreak(thisTeamsWeeks);
    expect(result).toEqual(0);
  });

  it("should calculate longest loss streak one loss", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "LOSS"),
    ];

    const result = calculateLongestLossStreak(thisTeamsWeeks);
    expect(result).toEqual(1);
  });

  it("should calculate longest loss streak two losses", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "LOSS"),
      getDummyWeeklyStats(2020, 2, "LOSS"),
    ];

    const result = calculateLongestLossStreak(thisTeamsWeeks);
    expect(result).toEqual(2);
  });

  it("should calculate longest loss streak with multi-header weeks", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "LOSS", false, false, true, [50, 60]),
      getDummyWeeklyStats(2020, 2, "LOSS"),
      getDummyWeeklyStats(2020, 3, "WIN"),
      getDummyWeeklyStats(2020, 4, "LOSS"),
    ];

    const result = calculateLongestLossStreak(thisTeamsWeeks);
    expect(result).toEqual(2);
  });

  it("should calculate longest loss streak between years", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "LOSS"),
      getDummyWeeklyStats(2020, 2, "LOSS"),
      getDummyWeeklyStats(2021, 1, "LOSS"),
      getDummyWeeklyStats(2021, 2, "LOSS"),
    ];

    const result = calculateLongestLossStreak(thisTeamsWeeks);
    expect(result).toEqual(2);
  });

  it("should calculate longest loss streak reg season only", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "LOSS"),
      getDummyWeeklyStats(2020, 2, "LOSS"),
      getDummyWeeklyStats(2020, 3, "LOSS", true),
    ];

    const result = calculateLongestLossStreak(thisTeamsWeeks);
    expect(result).toEqual(2);
  });

  it("should break streak with tie", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "LOSS"),
      getDummyWeeklyStats(2020, 2, "TIE"),
      getDummyWeeklyStats(2020, 3, "LOSS"),
    ];

    const result = calculateLongestLossStreak(thisTeamsWeeks);
    expect(result).toEqual(1);
  });
});
