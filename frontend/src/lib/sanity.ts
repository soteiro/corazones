import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  useCdn: true,
});

export async function sanityFetch<T = any>(
  query: string,
  params?: Record<string, any>,
): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {});
}
