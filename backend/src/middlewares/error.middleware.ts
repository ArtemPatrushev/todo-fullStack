import { Request, Response, NextFunction } from "express";
import { Prisma } from "../generated/prisma";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  // Prisma: record not found
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  // Default error
  return res.status(500).json({
    message: "Internal server error",
  });
};
