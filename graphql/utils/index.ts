import { verify } from "jsonwebtoken";

const APPSECRET: string = process.env.APP_SECRET as string;

export interface AuthTokenPayload {
  userId: string;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token found");
  }

  return verify(token, APPSECRET) as AuthTokenPayload;
}
