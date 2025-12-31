import { redis } from '../redis';

const POSTS_LIST_VERSION_KEY = 'posts:list:version';

export async function getPostsListVersion(): Promise<number> {
  const version = await redis.get(POSTS_LIST_VERSION_KEY);
  if (version) return Number(version);

  // 최초 1로 세팅
  await redis.set(POSTS_LIST_VERSION_KEY, 1);
  return 1;
}

export async function bumpPostsListVersion() {
  await redis.incr(POSTS_LIST_VERSION_KEY);
}
