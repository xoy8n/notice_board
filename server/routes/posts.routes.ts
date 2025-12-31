import {Router} from "express";
import { getPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/posts.controller";

const postsRouter = Router();

postsRouter.get('/', getPosts);
postsRouter.get('/:id', getPostById);
postsRouter.post('/', createPost);
postsRouter.patch('/:id', updatePost);
postsRouter.delete('/:id', deletePost);

export default postsRouter;