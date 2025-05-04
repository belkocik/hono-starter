import env from "@/env";
import { serve } from "@hono/node-server";

import app from "./app";

serve({
  fetch: app.fetch,
  port: env.PORT,
}, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`);
});
