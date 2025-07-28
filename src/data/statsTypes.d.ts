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
  averagePointsPerGame: number;
  averagePointsAgainstPerGame: number;
  averagePointsPerGameYearly: Record<number, number>;
  averagePointsAgainstPerGameYearly: Record<number, number>;
  highScores: WeeklyAchievement[];
  lowScores: WeeklyAchievement[];
  numPlayoffAppearances: number;
  playoffPercentage: number;
  winLossRecord: WinsAndLosses;
  winLossRecordAgainst: WinsAndLossesAgainst[];
  playoffWinLossRecordAgainst: WinsAndLossesAgainst[];
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
};

type WinsAndLossesAgainst = WinsAndLosses & { opponentEspnId: number };

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
