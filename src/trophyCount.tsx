type TrophyCountProps = {
  numTrophies: number | undefined;
};

const TrophyCount = ({ numTrophies }: TrophyCountProps) => (
  <>
    &nbsp;
    {"🏆".repeat(numTrophies || 0)}
  </>
);

export { TrophyCount };
