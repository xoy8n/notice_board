import {Router, Request, Response} from "express";
import postsRouter from "./posts.routes";

const globalRouter = Router();

const handleHome = (_req: Request, res: Response) => {
    // 서버 헬스 체크용 GET /api/v1
    res.json({ message: 'API is running' });
};

globalRouter.use('/posts', postsRouter);
globalRouter.get('/', handleHome);

export default globalRouter;