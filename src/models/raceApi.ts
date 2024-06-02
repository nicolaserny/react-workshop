export type Race = {
  title: string;
  horses: Array<{
    id: string;
    name: string;
    performance: string;
    odds: number;
  }>;
};
async function get(race: string) {
  const response = await fetch(`/api/races/${race}`);
  if (!response.ok) {
    return undefined;
  }
  return response.json() as Promise<Race>;
}

export default {
  get,
};
