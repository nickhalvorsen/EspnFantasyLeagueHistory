import config from "../config.json";

const ESPN_API_BASE_URL = config.ESPN_API_BASE_URL;
const ESPN_LEAGUE_ID = config.ESPN_LEAGUE_ID;

const fetchFromApi = async (url: string) => {
  const res = await fetch(ESPN_API_BASE_URL + url, {
    headers: {},
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

const getAllYears = async () => {
  const response: GetAllYearsApiResponse[] = await fetchFromApi(
    `/apis/v3/games/ffl/leagueHistory/${ESPN_LEAGUE_ID}`
  );
  return response.map((r) => r.seasonId);
};

const getYearData = async (year: number) => {
  const response: GetYearDataApiResponse = await fetchFromApi(
    `/apis/v3/games/ffl/seasons/${year}/segments/0/leagues/${ESPN_LEAGUE_ID}?view=mTeam&view=mMatchupScore&view=mSettings`
  );
  return response;
};

export { getAllYears, getYearData };
