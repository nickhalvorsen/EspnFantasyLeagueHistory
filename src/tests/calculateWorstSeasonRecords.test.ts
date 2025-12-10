import { describe, it, expect } from "vitest";
import { calculateWorstSeasonRecords } from "@/data/statCalculators";
import type { yearlyStats } from "@/data/mapEspnApiResponse";

const getDummyYearlyStats = (
  espnId: number,
  year: number,
  wins: number,
  losses: number,
  ties: number,
  isRegularSeasonComplete: boolean,
  isFullSeasonComplete: boolean
) => ({
  team: {
    espnId: espnId.toString(),
    primaryOwnerId: "owner1",
    managerName: "Manager 1",
  },
  year: year,
  finalRank: isFullSeasonComplete ? 1 : 0,
  tradeCount: 0,
  wins: wins,
  losses: losses,
  ties: ties,
  pointsFor: 1200,
  pointsAgainst: 1000,
  playoffSeed: isRegularSeasonComplete ? 1 : 0,
  numPlayersInPlayoffs: 4,
  isRegularSeasonComplete: isRegularSeasonComplete,
  isFullSeasonComplete: isFullSeasonComplete,
});

describe("calculateWorstSeasonRecords", () => {
  it("should calculate worst season records in order", () => {
    const input: yearlyStats[] = [
      getDummyYearlyStats(3, 2020, 5, 5, 0, true, true),
      getDummyYearlyStats(3, 2021, 6, 4, 0, true, true),
      getDummyYearlyStats(3, 2022, 7, 3, 0, true, true),
    ];
    const result = calculateWorstSeasonRecords(input);
    expect(result).toEqual([
      { year: 2020, wins: 5, losses: 5, ties: 0 },
      { year: 2021, wins: 6, losses: 4, ties: 0 },
      { year: 2022, wins: 7, losses: 3, ties: 0 },
    ]);
  });

  it("should calculate worst season records in order with differing number of total games", () => {
    const input: yearlyStats[] = [
      getDummyYearlyStats(3, 2020, 5, 4, 0, true, true),
      getDummyYearlyStats(3, 2021, 5, 5, 0, true, true),
    ];
    const result = calculateWorstSeasonRecords(input);
    expect(result).toEqual([
      { year: 2021, wins: 5, losses: 5, ties: 0 },
      { year: 2020, wins: 5, losses: 4, ties: 0 },
    ]);
  });

  it("should ignore seasons in progress", () => {
    const input: yearlyStats[] = [
      getDummyYearlyStats(3, 2020, 5, 5, 0, true, true),
      getDummyYearlyStats(3, 2021, 6, 4, 0, true, false),
      getDummyYearlyStats(3, 2022, 1, 5, 0, false, false),
    ];
    const result = calculateWorstSeasonRecords(input);
    expect(result).toEqual([
      { year: 2020, wins: 5, losses: 5, ties: 0 },
      { year: 2021, wins: 6, losses: 4, ties: 0 },
    ]);
  });

  it("should not ignore postseason in-progress ", () => {
    const input: yearlyStats[] = [
      getDummyYearlyStats(3, 2020, 5, 5, 0, true, true),
      getDummyYearlyStats(3, 2021, 6, 4, 0, true, true),
      getDummyYearlyStats(3, 2022, 1, 5, 0, true, false),
    ];
    const result = calculateWorstSeasonRecords(input);
    expect(result).toEqual([
      { year: 2022, wins: 1, losses: 5, ties: 0 },
      { year: 2020, wins: 5, losses: 5, ties: 0 },
      { year: 2021, wins: 6, losses: 4, ties: 0 },
    ]);
  });
});
