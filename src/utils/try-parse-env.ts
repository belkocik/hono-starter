/* eslint-disable node/no-process-env */
import type { infer as zodInfer, ZodObject, ZodRawShape } from "zod";

import { ZodError } from "zod";

export function tryParseEnv<T extends ZodRawShape>(EnvSchema: ZodObject<T>, buildEnv: Record<string, string | undefined> = process.env): zodInfer<ZodObject<T>> {
  try {
    return EnvSchema.parse(buildEnv);
  }
  catch (error) {
    if (error instanceof ZodError) {
      const issues = error.issues;
      const message
        = `\n❌ Missing required values in .env:\n${
          issues.map(i => `  - ${i.path.join(".")}`).join("\n")
        }\n`;
      const e = new Error(message);
      e.stack = "";
      throw e;
    }
    else {
      throw error;
    }
  }
}
