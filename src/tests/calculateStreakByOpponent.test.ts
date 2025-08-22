import { describe, it, expect } from "vitest";
import { calculateStreakByOpponent } from "@/data/statCalculators";
import type { weeklyStats } from "@/data/mapEspnApiResponse";

const getDummyWeeklyStats = (
  year: number,
  weekNumber: number,
  opponentEspnId: number,
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
  opponentEspnId: opponentEspnId,
  isMultiHeader: isMultiHeader,
  multiHeaderPoints: multiHeaderPoints,
  isPostSeason: isPostSeason,
  isWinnersBracketPostSeason: isWinnersBracketPostSeason,
});

describe("calculateStreakByOpponent", () => {
  it("should calculate single game loss streak", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 55, "LOSS"),
    ];

    const result = calculateStreakByOpponent(thisTeamsWeeks);
    const streakData = result.find((x) => x.opponentEspnId === 55);
    expect(streakData?.streak).toEqual(1);
    expect(streakData?.result).toEqual("LOSS");
  });

  it("should calculate single game win streak", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 55, "WIN"),
    ];

    const result = calculateStreakByOpponent(thisTeamsWeeks);
    const streakData = result.find((x) => x.opponentEspnId === 55);
    expect(streakData?.streak).toEqual(1);
    expect(streakData?.result).toEqual("WIN");
  });

  it("should calculate multi game win streak", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 55, "WIN"),
      getDummyWeeklyStats(2020, 2, 55, "LOSS"),
      getDummyWeeklyStats(2020, 3, 55, "WIN"),
      getDummyWeeklyStats(2020, 4, 55, "WIN"),
    ];

    const result = calculateStreakByOpponent(thisTeamsWeeks);
    const streakData = result.find((x) => x.opponentEspnId === 55);
    expect(streakData?.streak).toEqual(2);
    expect(streakData?.result).toEqual("WIN");
  });

  it("should calculate multi game win streak ending in loss", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 55, "WIN"),
      getDummyWeeklyStats(2020, 2, 55, "LOSS"),
      getDummyWeeklyStats(2020, 3, 55, "WIN"),
      getDummyWeeklyStats(2020, 4, 55, "WIN"),
      getDummyWeeklyStats(2020, 5, 55, "LOSS"),
    ];

    const result = calculateStreakByOpponent(thisTeamsWeeks);
    const streakData = result.find((x) => x.opponentEspnId === 55);
    expect(streakData?.streak).toEqual(1);
    expect(streakData?.result).toEqual("LOSS");
  });

  it("should calculate streak with different players", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 55, "WIN"),
      getDummyWeeklyStats(2020, 2, 99, "LOSS"),
      getDummyWeeklyStats(2020, 3, 55, "WIN"),
      getDummyWeeklyStats(2020, 4, 55, "WIN"),
      getDummyWeeklyStats(2020, 5, 99, "LOSS"),
    ];

    const result = calculateStreakByOpponent(thisTeamsWeeks);
    const streakData = result.find((x) => x.opponentEspnId === 55);
    expect(streakData?.streak).toEqual(3);
    expect(streakData?.result).toEqual("WIN");
  });

  it("should calculate streak with different players and seasons", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 55, "WIN"),
      getDummyWeeklyStats(2020, 2, 99, "LOSS"),
      getDummyWeeklyStats(2020, 3, 55, "WIN"),
      getDummyWeeklyStats(2020, 4, 55, "WIN"),
      getDummyWeeklyStats(2020, 5, 99, "LOSS"),
      getDummyWeeklyStats(2021, 1, 99, "WIN"),
      getDummyWeeklyStats(2021, 2, 55, "WIN"),
    ];

    const result = calculateStreakByOpponent(thisTeamsWeeks);
    const streakData = result.find((x) => x.opponentEspnId === 55);
    expect(streakData?.streak).toEqual(4);
    expect(streakData?.result).toEqual("WIN");
  });
});
