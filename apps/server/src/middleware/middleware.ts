import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../prisma";

export async function checkAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const sessionId = req.headers.sessionid as string;
    const session = await prismaClient.session.findFirst({
      where: {
        id: sessionId,
      },
      include: {
        user: true,
      },
    });
    if (session && session.user?.role === "ADMIN") {
      next();
    } else {
      console.log("Access denied for session", sessionId);
      const error = new Error("Access denied");
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

export async function checkOperator(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const sessionId = req.headers.sessionid as string;
    const session = await prismaClient.session.findFirst({
      where: {
        id: sessionId,
      },
      include: {
        user: true,
      },
    });
    if (session && session.user?.role === "OPERATOR") {
      next();
    } else {
      console.log("Access denied for session", sessionId);
      const error = new Error("Access denied");
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

export async function checkClient(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const sessionId = req.headers.sessionid as string;
    const session = await prismaClient.session.findFirst({
      where: {
        id: sessionId,
      },
      include: {
        user: true,
      },
    });
    if (session && session.user?.role === "CLIENT") {
      next();
    } else {
      console.log("Access denied for session", sessionId);
      const error = new Error("Access denied");
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

export async function checkDriver(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const sessionId = req.headers.sessionid as string;
    const session = await prismaClient.session.findFirst({
      where: {
        id: sessionId,
      },
      include: {
        user: true,
      },
    });
    if (session && session.user?.role === "DRIVER") {
      next();
    } else {
      console.log("Access denied for session", sessionId);
      const error = new Error("Access denied");
      throw error;
    }
  } catch (error) {
    next(error);
  }
}
