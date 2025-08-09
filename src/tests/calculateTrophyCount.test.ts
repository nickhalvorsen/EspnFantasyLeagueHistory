import { describe, it, expect } from "vitest";
import { calculateTrophyCount } from "@/data/statCalculators";
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

describe("calculateTrophyCount", () => {
  it("should calculate trophy years correctly", () => {
    const input: yearlyStats[] = [
      getDummyYearlyStats(3, 2020, 1, 1),
      getDummyYearlyStats(3, 2021, 1, 3),
      getDummyYearlyStats(3, 2022, 1, 1),
    ];
    const result = calculateTrophyCount(input);
    expect(result).toEqual(2);
  });
});
