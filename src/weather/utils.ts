import { request, Agent, interceptors, cacheStores } from "undici";

const dispatcher = new Agent({
  connections: 5,
  keepAliveTimeout: 10,
  connectTimeout: 10000,
  keepAliveMaxTimeout: 10,
}).compose(
  interceptors.dns({
    affinity: 4,
  }),
  interceptors.retry({
    maxRetries: 3,
    minTimeout: 1000,
    maxTimeout: 10000,
    timeoutFactor: 2,
    retryAfter: true,
  }),
  interceptors.cache({
    store: new cacheStores.MemoryCacheStore({
      maxSize: 1024 * 1024 * 100,
      maxCount: 1000,
    }),
  }),
);

export async function fetch<T>(url: string | URL): Promise<T> {
  const { statusCode, body } = await request(url, {
    dispatcher,
    signal: AbortSignal.timeout(10_000),
  });

  if (statusCode < 200 || statusCode >= 300) {
    await body.dump();
    throw new Error(`Failed to fetch: ${statusCode}`);
  }

  return (await body.json()) as T;
}
