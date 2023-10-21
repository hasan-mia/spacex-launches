import { Launch } from "../LaunchContext";

export async function fetchLaunches(_rocketName?: string): Promise<Launch[]> {
  const apiUrl = "https://api.spacexdata.com/v3/launches";

  const response = await fetch(apiUrl);
  const data = await response.json();
  return data as Launch[];
}
