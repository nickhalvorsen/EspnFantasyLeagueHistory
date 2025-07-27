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
  biggestBlowouts: WeeklyAchievement[];
  numPlayoffAppearances: number;
  playoffPercentage: number;
  winLossRecord: WinsAndLosses;
  winLossRecordAgainst: Array<WinsAndLosses & { opponentEspnId: number }>;
  //finalsWinLossRecord: WinsAndLosses;
  longestWinStreak: number;
  longestLossStreak: number;
  //winLossRecordYearly: Record<number, WinsAndLosses>;
  //winLossRecordAgainst: Record<number, WinsAndLosses>;
  bestSeasonRecords: Array<WinsAndLosses & { year: number }>;
  worstSeasonRecords: Array<WinsAndLosses & { year: number }>;
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
