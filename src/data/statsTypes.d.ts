type AllStats = {
  teams: Team[];
  teamStats: TeamFullStats[];
};

type Team = {
  espnId: string;
  primaryOwnerId: string;
  managerName: string;
};

type TeamFullStats = {
  team: Team;
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
  playoffPercentage: number;
  winLossRecord: WinsAndLosses;
  //finalsWinLossRecord: WinsAndLosses;
  longestWinStreak: number;
  longestLossStreak: number;
  //winLossRecordYearly: Record<number, WinsAndLosses>;
  //winLossRecordAgainst: Record<number, WinsAndLosses>;
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
