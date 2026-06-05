import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
import settingsRouter from "./routes/settings.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

/* using all the routes here */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/subscription", subscriptionRouter);

export default app;