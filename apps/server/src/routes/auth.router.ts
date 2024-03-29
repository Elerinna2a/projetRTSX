import express, { Request, Response } from "express";

import { prismaClient } from "../prisma";

export const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    // récupération du body de la requete
    const { email, password } = req.body;

    // validation des données d'entrée
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return {
        status: "ERROR",
        message: "Email and password are required",
        data: null,
      };
    }
    const employe = await prismaClient.employe.findFirst({
      where: {
        email,
      },
    });
    if (!employe) {
      res.status(404).json({ error: "Employe doesn't exist" });
      return {
        status: "ERROR",
        message: "Employe doesn't exist",
        data: null,
      };
    }
    // vérification du mot de passe
    const passwordMatch = employe.password === password;
    if (!passwordMatch) {
      res.status(401).json({ error: "Password doesn't match" });
      return {
        status: "ERROR",
        message: "Password doesn't match",
        data: null,
      };
    }
    // création de la session
    const session = await prismaClient.session.create({
      data: {
        employeId: employe.id,
      },
    });
    if (session) {
      res.json({
        success: "Authentification réussie!",
        sessionid: session.id,
        employe: employe,
      });
      return {
        success: "Authentification réussie!",
        sessionid: session.id,
        employe: employe,
      };
    } else {
      res.status(500).json({ error: "Failed to create session" });
      return {
        status: "ERROR",
        message: "Failed to create session",
        data: null,
      };
    }
  } catch (err) {
    console.log("error on login", { err });
    res.status(500).json({ error: "Internal server error" });
    return {
        status: "ERROR",
        message: err,
        data: null,
    };
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

export async function deleteAllSessions() {
  try {
    await prismaClient.session.deleteMany({});
    console.log("All sessions have been deleted");
  } catch (err) {
    console.log("Error deleting sessions:", err);
  }
}
