import { PrismaClient } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { decodeAuthHeader } from "./utils";

export type Context = {
  prisma: PrismaClient;
  userId: string | undefined;
};

export async function createContext({
  req,
}: {
  req: Request;
}): Promise<Context> {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    prisma,
    userId: token?.userId,
  };
}
