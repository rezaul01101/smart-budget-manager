import cors from "cors";
import express, {
  Application,
  NextFunction,
  Request,
  response,
  Response,
} from "express";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import routes from "./app/routes";
import path from "path";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://localhost:3002",
      "https://budgetmanager.buildbeam.xyz",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/upload/:imageName", function (req, res) {
  const { imageName } = req.params;
  const filepath = path.join(__dirname, "../upload", imageName);
  res.sendFile(filepath);
});

app.use("/api/v1", routes);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
