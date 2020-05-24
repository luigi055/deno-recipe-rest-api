import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./application/core/routes.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const port = parseInt(config().PORT) || 3000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server listening on port ${port}`);

await app.listen({ port });
