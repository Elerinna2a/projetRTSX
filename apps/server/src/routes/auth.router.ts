import express, { Request, Response } from "express";

import { prismaClient } from "../prisma";

export const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    res.json({ error: "User doesn't exist..." });
    return;
  }
  try {
    if (user.password === password) {
      const session = await prismaClient.session.create({
        data: {
          userId: user.id,
        },
      });
      res.json({
        success: "Authentification réussie!",
        sessionid: session.id,
        user: user,
      });
    } else {
      res.json({ error: "Password doesn't match..." });
    }
  } catch (err) {
    console.log("error on login", { err });
    res.json({ error: "error" });
  }
});

router.post("/get-user-infos", async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await prismaClient.session.findFirst({
      where: {
        id: sessionId,
      },
      include: {
        user: true,
      },
    });
    if (session) {
      res.json({ user: session.user });
      return;
    } else {
      res.json({ error: "Pas de session de disponible..." });
    }
  } catch (err) {
    console.log("error on getting user info", { err });
    res.json({ error: err });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (sessionId) {
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
