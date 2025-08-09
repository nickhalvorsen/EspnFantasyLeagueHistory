import { describe, it, expect } from "vitest";
import { calculateBestSeasonRecords } from "@/data/statCalculators";
import type { yearlyStats } from "@/data/mapEspnApiResponse";

const getDummyYearlyStats = (
  espnId: number,
  year: number,
  wins: number,
  losses: number,
  ties: number
) => ({
  team: {
    espnId: espnId.toString(),
    primaryOwnerId: "owner1",
    managerName: "Manager 1",
  },
  year: year,
  finalRank: 5,
  tradeCount: 0,
  wins: wins,
  losses: losses,
  ties: ties,
  pointsFor: 1200,
  pointsAgainst: 1000,
  playoffSeed: 5,
});

describe("calculateBestSeasonRecords", () => {
  it("should calculate best season records in order", () => {
    const input: yearlyStats[] = [
      getDummyYearlyStats(3, 2020, 5, 5, 0),
      getDummyYearlyStats(3, 2021, 6, 4, 0),
      getDummyYearlyStats(3, 2022, 7, 3, 0),
    ];
    const result = calculateBestSeasonRecords(input);
    expect(result).toEqual([
      { year: 2022, wins: 7, losses: 3, ties: 0 },
      { year: 2021, wins: 6, losses: 4, ties: 0 },
      { year: 2020, wins: 5, losses: 5, ties: 0 },
    ]);
  });

  it("should calculate best season records in order with differing number of total games", () => {
    const input: yearlyStats[] = [
      getDummyYearlyStats(3, 2020, 5, 5, 0),
      getDummyYearlyStats(3, 2021, 5, 4, 0),
    ];
    const result = calculateBestSeasonRecords(input);
    expect(result).toEqual([
      { year: 2021, wins: 5, losses: 4, ties: 0 },
      { year: 2020, wins: 5, losses: 5, ties: 0 },
    ]);
  });
});
