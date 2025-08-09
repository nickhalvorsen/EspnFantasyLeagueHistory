type AllStats = {
  teams: Team[];
  teamStats: TeamFullStats[];
  leagueInfo: LeagueInfo;
};

type LeagueInfo = {
  leagueName: string;
  startYear: number;
  latestYear: number;
  regularSeasonMatchups: number;
  maximumPlayerCount: number;
};

type Team = {
  espnId: string;
  primaryOwnerId: string;
  managerName: string;
};

type TeamFullStats = {
  team: Team;
  yearsPlayed: number;
  trophies: number;
  trophyYears: number[];
  binYears: number[];
  placementHistory: Record<number, number>;
  averagePointsPerGame: number;
  averagePointsAgainstPerGame: number;
  highScores: WeeklyAchievement[];
  lowScores: WeeklyAchievement[];
  numPlayoffAppearances: number;
  playoffPercentage: number;
  winLossRecord: WinsAndLosses;
  winLossRecordAgainst: WinsAndLossesAgainst[];
  playoffWinLossRecordAgainst: WinsAndLossesAgainst[];
  bestSeasonAveragePoints: Array<{ year: number; average: number }>;
  worstSeasonAveragePoints: Array<{ year: number; average: number }>;
  longestWinStreak: number;
  longestLossStreak: number;
  //winLossRecordYearly: Record<number, WinsAndLosses>;
  //winLossRecordAgainst: Record<number, WinsAndLosses>;
  bestSeasonRecords: Array<WinsAndLosses & { year: number }>;
  worstSeasonRecords: Array<WinsAndLosses & { year: number }>;
  closestGames: Array<Matchup & { margin: number }>;
  biggestBlowouts: Array<Matchup & { margin: number }>;
  biggestMatchups: Matchup[];
  lowestMatchups: Matchup[];
  tradeCount: number;
  lifetimePointsFor: number;
  bestFinish: number;
  worstFinish: number;
  pointDifferentialByOpponent: PointDifferentialAgainst[];
};

type WinsAndLossesAgainst = WinsAndLosses & { opponentEspnId: number };

type PointDifferentialAgainst = {
  opponentEspnId: number;
  pointDifferential: number;
};

type Matchup = {
  year: number;
  week: number;
  manager1: string;
  manager1score: number;
  manager2: string;
  manager2score: number;
};

type WinsAndLosses = {
  wins: number;
  losses: number;
  ties: number;
};

type WeeklyAchievement = {
  year: number;
  week: number;
  value: number;
  message?: string;
};
