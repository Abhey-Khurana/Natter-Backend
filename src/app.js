import express from "express"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/auth",userRouter);
app.use("/api/message",messageRouter);

export default app;
