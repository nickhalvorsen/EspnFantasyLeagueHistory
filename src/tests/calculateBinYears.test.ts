import { describe, it, expect } from "vitest";
import { calculateBinYears } from "@/data/statCalculators";
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
  isFullSeasonComplete: true,
  isRegularSeasonComplete: true,
});

describe("calculateBinYears", () => {
  it("should calculate bin year correctly single", () => {
    const thisTeamsYears: yearlyStats[] = [getDummyYearlyStats(3, 2020, 4, 4)];
    const allTeamsYears: yearlyStats[] = [
      getDummyYearlyStats(1, 2020, 1, 1),
      getDummyYearlyStats(2, 2020, 3, 3),
      getDummyYearlyStats(3, 2020, 4, 4),
      getDummyYearlyStats(4, 2020, 2, 2),
    ];
    const result = calculateBinYears(thisTeamsYears, allTeamsYears);
    expect(result).toEqual([2020]);
  });

  it("should calculate bin year correctly none", () => {
    const thisTeamsYears: yearlyStats[] = [getDummyYearlyStats(3, 2020, 3, 3)];
    const allTeamsYears: yearlyStats[] = [
      getDummyYearlyStats(1, 2020, 1, 1),
      getDummyYearlyStats(2, 2020, 2, 2),
      getDummyYearlyStats(3, 2020, 3, 3),
      getDummyYearlyStats(4, 2020, 4, 4),
    ];
    const result = calculateBinYears(thisTeamsYears, allTeamsYears);
    expect(result).toEqual([]);
  });

  it("should calculate bin year correctly multi-year diff team amount one bin", () => {
    const thisTeamsYears: yearlyStats[] = [
      getDummyYearlyStats(3, 2020, 3, 3),
      getDummyYearlyStats(3, 2021, 3, 3),
    ];
    const allTeamsYears: yearlyStats[] = [
      getDummyYearlyStats(1, 2020, 1, 1),
      getDummyYearlyStats(2, 2020, 2, 2),
      getDummyYearlyStats(3, 2020, 3, 3),
      getDummyYearlyStats(1, 2021, 1, 1),
      getDummyYearlyStats(2, 2021, 2, 2),
      getDummyYearlyStats(3, 2021, 3, 3),
      getDummyYearlyStats(4, 2021, 4, 4),
    ];
    const result = calculateBinYears(thisTeamsYears, allTeamsYears);
    expect(result).toEqual([2020]);
  });

  it("should calculate bin year correctly multi-year diff team amount two bin", () => {
    const thisTeamsYears: yearlyStats[] = [
      getDummyYearlyStats(3, 2020, 3, 3),
      getDummyYearlyStats(3, 2021, 4, 4),
    ];
    const allTeamsYears: yearlyStats[] = [
      getDummyYearlyStats(1, 2020, 1, 1),
      getDummyYearlyStats(2, 2020, 2, 2),
      getDummyYearlyStats(3, 2020, 3, 3),
      getDummyYearlyStats(1, 2021, 1, 1),
      getDummyYearlyStats(2, 2021, 2, 2),
      getDummyYearlyStats(3, 2021, 4, 4),
      getDummyYearlyStats(4, 2021, 3, 3),
    ];
    const result = calculateBinYears(thisTeamsYears, allTeamsYears);
    expect(result).toEqual([2020, 2021]);
  });

  it("should calculate bin by playoff rank, not final standing", () => {
    const thisTeamsYears: yearlyStats[] = [getDummyYearlyStats(3, 2020, 3, 2)];
    const allTeamsYears: yearlyStats[] = [
      getDummyYearlyStats(1, 2020, 1, 1),
      getDummyYearlyStats(2, 2020, 2, 3),
      getDummyYearlyStats(3, 2020, 3, 2),
    ];
    const result = calculateBinYears(thisTeamsYears, allTeamsYears);
    expect(result).toEqual([2020]);
  });
});
