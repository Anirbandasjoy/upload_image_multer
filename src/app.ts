import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

const app: Application = express();
import cors from "cors";
import createHttpError from "http-errors";
import {
  errorResponse,
  successResponse,
} from "./controller/response.controller";
import imageUploadRouter from "./routes/imageupload.router";
import path from "path";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/v1/image", imageUploadRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  successResponse(res, {
    statusCode: 200,
    message: "Hello, I am typescript and express server. image uploader",
    payload: {},
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "route not found"));
});

app.use(((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || "An unexpected error occurred";

  errorResponse(res, { statusCode, message });
}) as unknown as ErrorRequestHandler);

export default app;
