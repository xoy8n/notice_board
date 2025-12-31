import db from "../db";
import { posts } from "../db/schema";
import {desc, eq, isNull, sql, and} from "drizzle-orm";
import { CreatePostInput, UpdatePostInput } from "./post.inputs";
import { formatDate } from "../common/response";

export const getPostsService = async (
    page: number,
    size: number
  ) => {
    const offset = (page - 1) * size;
  
    const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(posts);
  
    const totalCount = Number(result[0]?.count ?? 0);
  
    //deletedAt이 null인 게시글만 조회
    const rows = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .where(isNull(posts.deletedAt))
      .orderBy(desc(posts.id))
      .limit(size)
      .offset(offset);

    const list = rows.map((row) => ({
      ...row,
      createdAt: formatDate(row.createdAt),
      updatedAt: formatDate(row.updatedAt),
    }));
  
    return {
      list,
      totalCount,
    };
  };

export const getPostByIdService = async (id: number) => {
  const [post] = await db
  .select({
    id: posts.id,
    title: posts.title,
    content: posts.content,
    createdAt: posts.createdAt,
    updatedAt: posts.updatedAt,
  })
  .from(posts)
  .where(and(eq(posts.id, id), isNull(posts.deletedAt)))
  .limit(1);

  if (!post) return null;

  return {
    ...post,
    createdAt: formatDate(post.createdAt),
    updatedAt: formatDate(post.updatedAt),
  };
};

export const createPostService = async (input: CreatePostInput) => {
const [created] =  await db.insert(posts).values({
    title: input.title,
    content: input.content,
  }).returning();

  return created;
};


export const updatePostService = async (
    id: number,
    input: UpdatePostInput
  ) => {
    const result = await db
      .update(posts)
      .set({
        ...input,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(posts.id, id),
          isNull(posts.deletedAt)
        )
      )
      .returning();
  
    return result[0] ?? null;
  };

export const deletePostService = async (id: number) => {
    const result = await db
      .update(posts)
      .set({
        deletedAt: new Date(),
      })
      .where(
        and(
          eq(posts.id, id),
          isNull(posts.deletedAt)
        )
      )
      .returning();
  
    return result[0] ?? null;
  };