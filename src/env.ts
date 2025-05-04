import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

import { tryParseEnv } from "./utils/try-parse-env";
import path from "node:path";

expand(config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === "test" ? ".env.test" : ".env",
  ),
}));

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test","production"]).default("development"),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
  DATABASE_URL: z.string().url(),
});

const env = tryParseEnv(EnvSchema);

export default env;
