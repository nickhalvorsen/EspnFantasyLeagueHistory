// todo: put constants in config.json?
const BASE_URL = "https://espn-reverse-proxy.azure-api.net";
const LEAGUE_ID = 8711378;

const fetchFromApi = async (url: string) => {
  const res = await fetch(BASE_URL + url, {
    headers: {
      // insecure, but the risk should be low. The reverse proxy is whitelisted for certain endpoints, and allows GET only.
      "Ocp-Apim-Subscription-Key": "b0cfb14354c243b1a90edb37b1671998",
    },
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
