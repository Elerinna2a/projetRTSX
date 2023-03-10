import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../prisma";

export async function checkPermissions(
  req: Request,
  _res: Response,
  next: NextFunction,
  permissions: string[]
) {
  console.log(permissions);

  try {
    const sessionid = req.headers.sessionid as string;
    const session = await prismaClient.session.findFirst({
      where: {
        id: sessionid,
      },
      include: {
        employe: true,
      },
    });
    console.log(permissions, session?.employe?.role);

    if (session && permissions.includes(session.employe?.role)) {
      next();
    } else {
      console.log("Access denied for session", sessionid);
      const error = new Error("Access denied");
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

// export async function checkOperator(
//   req: Request,
//   _res: Response,
//   next: NextFunction
// ) {
//   try {
//     const sessionid = req.headers.sessionid as string;
//     const session = await prismaClient.session.findFirst({
//       where: {
//         id: sessionid,
//       },
//       include: {
//         employe: true,
//       },
//     });
//     if (session && session.employe.role === "OPERATEUR") {
//       next();
//     } else {
//       console.log("Access denied for session", sessionid);
//       const error = new Error("Access denied");
//       throw error;
//     }
//   } catch (error) {
//     next(error);
//   }
// }

// export async function checkClient(
//   req: Request,
//   _res: Response,
//   next: NextFunction
// ) {
//   try {
//     const sessionid = req.headers.sessionid as string;
//     const session = await prismaClient.session.findFirst({
//       where: {
//         id: sessionid,
//       },
//       include: {
//         employe: true,
//       },
//     });
//     if (session && session.employe?.role === "CLIENT") {
//       next();
//     } else {
//       console.log("Access denied for session", sessionid);
//       const error = new Error("Access denied");
//       throw error;
//     }
//   } catch (error) {
//     next(error);
//   }
// }

// export async function checkDriver(
//   req: Request,
//   _res: Response,
//   next: NextFunction
// ) {
//   try {
//     const sessionid = req.headers.sessionid as string;
//     const session = await prismaClient.session.findFirst({
//       where: {
//         id: sessionid,
//       },
//       include: {
//         employe: true,
//       },
//     });
//     if (session && session.employe?.role === "CHAUFFEUR") {
//       next();
//     } else {
//       console.log("Access denied for session", sessionid);
//       const error = new Error("Access denied");
//       throw error;
//     }
//   } catch (error) {
//     next(error);
//   }
// }
