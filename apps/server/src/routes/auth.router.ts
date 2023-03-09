import express, { Request, Response } from "express";

import { prismaClient } from "../prisma";

export const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  // récupération du body de la requete
  const { email, password } = req.body;

  const employe = await prismaClient.employe.findFirst({
    where: {
      email,
    },
  });
  if (!employe) {
    res.json({ error: "employe doesn't excd appsist..." });
    return;
  }
  try {
    if (employe.password === password) {
      const session = await prismaClient.session.create({
        data: {
          employeId: employe.id,
        },
      });
      res.json({
        success: "Authentification réussie!",
        sessionid: session.id,
        employe: employe,
      });
    } else {
      res.json({ error: "Password doesn't match..." });
    }
  } catch (err) {
    console.log("error on login", { err });
    res.json({ error: "error" });
  }
});

router.post("/get-employe-infos", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    const session = await prismaClient.session.findFirst({
      where: {
        id: sessionId,
      },
      include: {
        employe: true,
      },
    });
    if (session) {
      res.json({ employe: session.employe });
      return;
    } else {
      res.json({ error: "Pas de session de disponible..." });
    }
  } catch (err) {
    console.log("error on getting employe info", { err });
    res.json({ error: err });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;
    console.log(req.body);
    if (sessionId) {
      console.log("sessionid dans la condition" + sessionId);
      await prismaClient.session.delete({
        where: {
          id: sessionId,
        },
      });
      res.json({ message: "Session supprimée!" });
    } else {
      console.log("Session non disponible...");
      res.json({ error: "Session non disponible!" });
    }
  } catch (err) {
    console.log("error on disconnecting from server", { err });
    res.json({ error: err });
  }
});
