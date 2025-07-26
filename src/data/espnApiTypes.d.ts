type GetAllYearsApiResponse = {
  seasonId: number;
};

type GetYearDataApiResponse = {
  seasonId: number;
  members: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
  teams: Array<{
    id: number;
    primaryOwner: string;
    record: {
      overall: {
        wins: number;
        losses: number;
        ties: number;
        pointsFor: number;
        pointsAgainst: number;
      };
    };
    playoffSeed: number;
    finalRank: number;
  }>;
  schedule: Array<{
    matchupPeriodId: number;
    away: {
      teamId: number;
      totalPoints: number;
    };
    home: {
      teamId: number;
      totalPoints: number;
    };
    winner: "AWAY" | "HOME" | "TIE";
    playoffTierType: string;
  }>;
};
