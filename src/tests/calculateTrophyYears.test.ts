import { describe, it, expect } from "vitest";
import { calculateTrophyYears } from "@/data/statCalculators";
import type { yearlyStats } from "@/data/mapEspnApiResponse";

const getDummyYearlyStats = (
  espnId: number,
  year: number,
  playoffSeed: number,
  finalRank: number
) => ({
  team: {
    espnId: espnId.toString(),
    primaryOwnerId: "owner1",
    managerName: "Manager 1",
  },
  year: year,
  finalRank: finalRank,
  tradeCount: 0,
  wins: 11,
  losses: 2,
  ties: 0,
  pointsFor: 1200,
  pointsAgainst: 1000,
  playoffSeed: playoffSeed,
  numPlayersInPlayoffs: 4,
});

describe("calculateTrophyYears", () => {
  it("should calculate trophy years correctly", () => {
    const input: yearlyStats[] = [
      getDummyYearlyStats(3, 2020, 1, 1),
      getDummyYearlyStats(3, 2021, 3, 3),
      getDummyYearlyStats(3, 2022, 2, 1),
    ];
    const result = calculateTrophyYears(input);
    expect(result).toEqual([2020, 2022]);
  });
});
