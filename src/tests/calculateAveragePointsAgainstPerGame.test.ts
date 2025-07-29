import { describe, it, expect } from "vitest";
import { calculateAveragePointsAgainstPerGame } from "@/data/statCalculators";
import type { weeklyStats } from "@/data/mapEspnApiResponse";

const getDummyWeeklyStats = (
  year: number,
  weekNumber: number,
  pointsAgainst: number,
  isPostSeason: boolean = false,
  isWinnersBracketPostSeason: boolean = false,
  isMultiHeader: boolean = false,
  multiHeaderPoints: number[] = []
): weeklyStats => ({
  year,
  weekNumber,
  teamEspnId: 1,
  pointsFor: 89,
  pointsAgainst: pointsAgainst,
  result: "LOSS",
  opponentEspnId: 2,
  isMultiHeader: isMultiHeader,
  multiHeaderPoints: multiHeaderPoints,
  isPostSeason: isPostSeason,
  isWinnersBracketPostSeason: isWinnersBracketPostSeason,
});

describe("calculateAveragePointsAgainstPerGame", () => {
  it("should calculate average points against per game single game", () => {
    const thisTeamsWeeks: weeklyStats[] = [getDummyWeeklyStats(2020, 1, 120)];

    const result = calculateAveragePointsAgainstPerGame(thisTeamsWeeks);
    expect(result).toEqual(120);
  });

  it("should accomodate decimal points", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 95.44),
      getDummyWeeklyStats(2020, 2, 126),
      getDummyWeeklyStats(2020, 3, 132),
    ];

    const result = calculateAveragePointsAgainstPerGame(thisTeamsWeeks);
    expect(result.toFixed(2)).toEqual((117.81).toFixed(2));
  });

  it("should accomodate playoff games ", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 100),
      getDummyWeeklyStats(2020, 2, 120, true, true, false, []),
      getDummyWeeklyStats(2020, 3, 130, true, false, false, []),
    ];

    const result = calculateAveragePointsAgainstPerGame(thisTeamsWeeks);
    expect(result.toFixed(2)).toEqual((116.6666).toFixed(2));
  });

  it("should consider double header games as two weeks", () => {
    const thisTeamsWeeks: weeklyStats[] = [
      getDummyWeeklyStats(2020, 1, 100),
      // should not use the multi header points but rather the individual matchup points
      getDummyWeeklyStats(2020, 4, 290, true, true, true, [140, 150]),
    ];

    const result = calculateAveragePointsAgainstPerGame(thisTeamsWeeks);
    expect(result.toFixed(2)).toEqual((130).toFixed(2));
  });
});
