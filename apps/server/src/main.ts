import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { router as authRouter } from "./routes/auth.router";
import { router as clientRouter } from "./routes/tiersCollecte.router";
import { router as userRouter } from "./routes/employe.router";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/clients", clientRouter);

// app.get("/", (_, res) => {
//   res.send("Hello, World!");
// });

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
