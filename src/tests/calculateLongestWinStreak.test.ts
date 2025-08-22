import { describe, it, expect } from "vitest";
import { calculateLongestWinStreak } from "@/data/statCalculators";
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

describe("calculateLongestWinStreak", () => {
  it("should calculate longest win streak zero wins", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "LOSS"),
    ];

    const result = calculateLongestWinStreak(thisTeamsWeeks);
    expect(result).toEqual(0);
  });

  it("should calculate longest win streak one win", () => {
    const thisTeamsWeeks: weeklyStats[] = [getDummyWeeklyStats(2020, 1, "WIN")];

    const result = calculateLongestWinStreak(thisTeamsWeeks);
    expect(result).toEqual(1);
  });

  it("should calculate longest win streak two wins", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "WIN"),
      getDummyWeeklyStats(2020, 2, "WIN"),
    ];

    const result = calculateLongestWinStreak(thisTeamsWeeks);
    expect(result).toEqual(2);
  });

  it("should calculate longest win streak two wins", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "LOSS"),
      getDummyWeeklyStats(2020, 2, "WIN"),
      getDummyWeeklyStats(2020, 3, "WIN"),
      getDummyWeeklyStats(2020, 4, "LOSS"),
      getDummyWeeklyStats(2020, 5, "WIN"),
    ];

    const result = calculateLongestWinStreak(thisTeamsWeeks);
    expect(result).toEqual(2);
  });

  it("should calculate longest win streak with multi-header weeks", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "WIN", false, false, true, [50, 60]),
      getDummyWeeklyStats(2020, 2, "WIN"),
      getDummyWeeklyStats(2020, 3, "LOSS"),
      getDummyWeeklyStats(2020, 4, "WIN"),
    ];

    const result = calculateLongestWinStreak(thisTeamsWeeks);
    expect(result).toEqual(2);
  });

  it("should calculate longest win streak between years", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "WIN"),
      getDummyWeeklyStats(2020, 2, "WIN"),
      getDummyWeeklyStats(2021, 1, "WIN"),
      getDummyWeeklyStats(2021, 2, "WIN"),
    ];

    const result = calculateLongestWinStreak(thisTeamsWeeks);
    expect(result).toEqual(2);
  });

  it("should calculate longest win streak reg season only", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "WIN"),
      getDummyWeeklyStats(2020, 2, "WIN"),
      getDummyWeeklyStats(2020, 3, "WIN", true),
    ];

    const result = calculateLongestWinStreak(thisTeamsWeeks);
    expect(result).toEqual(2);
  });

  it("should break streak with tie", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, "WIN"),
      getDummyWeeklyStats(2020, 2, "TIE"),
      getDummyWeeklyStats(2020, 3, "WIN"),
    ];

    const result = calculateLongestWinStreak(thisTeamsWeeks);
    expect(result).toEqual(1);
  });
});
