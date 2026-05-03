import { request } from "undici";

export const encodeCity = (city: string) => city.replace(/ /g, "+");

export async function fetchURL<T>(url: string | URL): Promise<T> {
  const { statusCode, body } = await request(url, {
    signal: AbortSignal.timeout(10_000),
  });

  if (statusCode < 200 || statusCode >= 300) {
    await body.dump();
    throw new Error(`Failed to fetch ${url}: ${statusCode}`);
  }

  return (await body.json()) as T;
}
