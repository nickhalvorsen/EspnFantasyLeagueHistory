// todo: put constants in config.json?
const BASE_URL = "https://otkxtjxpie.execute-api.us-east-2.amazonaws.com";
const LEAGUE_ID = 8711378;

const fetchFromApi = async (url: string) => {
  const res = await fetch(BASE_URL + url, {
    headers: {},
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

const getAllYears = async () => {
  const response: GetAllYearsApiResponse[] = await fetchFromApi(
    `/apis/v3/games/ffl/leagueHistory/${LEAGUE_ID}`
  );
  return response.map((r) => r.seasonId);
};

const getYearData = async (year: number) => {
  const response: GetYearDataApiResponse = await fetchFromApi(
    `/apis/v3/games/ffl/seasons/${year}/segments/0/leagues/${LEAGUE_ID}?view=mTeam&view=mMatchupScore&view=mSettings`
  );
  return response;
};

export { getAllYears, getYearData };
