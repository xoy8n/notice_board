import { Request, Response } from "express";
import { getPostsService, getPostByIdService, createPostService, deletePostService, updatePostService } from "../services/posts.service";
import { CreatePostSchema, UpdatePostSchema } from '../dtos/posts/post.schema';
import { HttpError } from "../errors/http-error";
import { PostsPaginationSchema } from "../dtos/common/pagination.schema";
import { buildPaginationResult } from "../common/pagination";
import { successResponse } from "../common/response";

export const getPosts = async (req: Request, res: Response) => {
    const parsed = PostsPaginationSchema.safeParse(req.query);
  
    if (!parsed.success) {
      throw new HttpError(400, parsed.error.message);
    }
  
    const { page, size } = parsed.data;
  
    const { list, totalCount } = await getPostsService(page, size);
  
    const data = buildPaginationResult({
      list,
      totalCount,
      page,
      size,
    });
  
    return res.json(successResponse(data));
  };

export const getPostById = async (req: Request, res: Response) => {
    const id = Number(req.params.id); 

    if(Number.isNaN(id)) {
        throw new HttpError(400, '게시글 ID는 숫자여야 합니다.');
    }

    const post = await getPostByIdService(id);

    if (!post) {
      throw new HttpError(404, '게시글을 찾을 수 없습니다.');
    }

    return res.json(successResponse(post));
};

export const createPost = async (req: Request, res: Response) => {
    const parsed = CreatePostSchema.safeParse(req.body);

    if (!parsed.success) {
        const message =
          parsed.error.issues[0]?.message ?? '잘못된 요청입니다.';
      
        throw new HttpError(400, message);
      }

    const post = await createPostService(parsed.data);

    return res.status(201).json(successResponse(post));
};

export const updatePost = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new HttpError(400, '게시글 ID는 숫자여야 합니다.');
    }
  
    const parsed = UpdatePostSchema.safeParse(req.body);
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message ?? '잘못된 요청입니다.';
      throw new HttpError(400, message);
    }
    
    const input = parsed.data; 
    const updated = await updatePostService(id, input);
    if (!updated) {
      throw new HttpError(404, '게시글을 찾을 수 없습니다.');
    }
  
    return res.json(successResponse(updated));
  };


export const deletePost = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if(Number.isNaN(id)) {
        throw new HttpError(400, '게시글 ID는 숫자여야 합니다.');
    }

    const deleted = await deletePostService(id);

    if (!deleted) {
        throw new HttpError(404, '게시글을 찾을 수 없습니다.');
    }

    return res.json(successResponse(null));
};