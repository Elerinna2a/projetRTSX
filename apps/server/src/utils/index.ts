import { Response } from "express";

export function getIdOrVoid(id: string, res: Response): number | void {
  const parsedId = parseInt(id);
  if (!parsedId) {
    res.json({ error: "Id can't be parsed into number..." });
    return;
  } else {
    return parsedId;
  }
}
