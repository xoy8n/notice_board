import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import globalRouter from "./routes";
import { setupSwagger } from "./swagger";
import { errorHandler } from "./middlewares/error-handler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const logger = morgan("dev");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Swagger
setupSwagger(app);

// Routes
app.use('/api/v1', globalRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});