import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    HOST_NAME: z.string().min(1),
    DB_AUTH_TOKEN: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    HOST_NAME: process.env.HOST_NAME,
    DB_AUTH_TOKEN: process.env.DB_AUTH_TOKEN
  }
});