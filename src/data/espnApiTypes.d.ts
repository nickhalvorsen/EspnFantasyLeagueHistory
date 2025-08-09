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
    transactionCounter: {
      trades: number;
    };
    playoffSeed: number;
    rankCalculatedFinal: number;
  }>;
  schedule: Array<{
    matchupPeriodId: number;
    away: {
      teamId: number;
      totalPoints: number;
      pointsByScoringPeriod: { [key: number]: number };
    };
    home: {
      teamId: number;
      totalPoints: number;
      pointsByScoringPeriod: { [key: number]: number };
    };
    winner: "AWAY" | "HOME" | "TIE" | "UNDECIDED";
    playoffTierType: string;
  }>;
  settings: {
    name: string;
    scheduleSettings: {
      matchupPeriodCount: number;
      playoffTeamCount: number;
    };
  };
};
