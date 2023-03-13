import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { router as authRouter } from "./routes/auth.router";
import { router as collecteRouter } from "./routes/collecte.router";
import { router as employeRouter } from "./routes/employe.router";
import { router as expeditionRouter } from "./routes/expedition.router";
import { router as factureRouter } from "./routes/facture.router";
import { router as tierCompacteRouter } from "./routes/tierCompacte.router";
import { router as tierCollecteRouter } from "./routes/tiersCollecte.router";
import { router as tourneeRouter } from "./routes/tournee.router";
import { router as traitementRouter } from "./routes/traitement.router";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/employes", employeRouter);
app.use("/collectes", collecteRouter);
app.use("/expeditions", expeditionRouter);
app.use("/factures", factureRouter);
app.use("/tierscompactes", tierCompacteRouter);
app.use("/tierscollectes", tierCollecteRouter);
app.use("/tournees", tourneeRouter);
app.use("/traitements", traitementRouter);

// app.get("/", (_, res) => {
//   res.send("Hello, World!");
// });

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
