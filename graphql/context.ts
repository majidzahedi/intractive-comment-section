import { PrismaClient } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { decodeAuthHeader } from "./utils";
import { MicroRequest } from "apollo-server-micro/dist/types";

export type Context = {
  prisma: PrismaClient;
  userId: string | undefined;
};

export async function createContext({
  req,
}: {
  req: MicroRequest;
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
