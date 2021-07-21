import { uuid } from "@src/libs/utils";
import { apiPaths } from "@src/settings/api-paths";
import { API_BASE_URL } from "@src/settings/constants";
import { createServer, Response } from "miragejs";

createServer({
  urlPrefix: API_BASE_URL,
  timing: 1000,
  routes() {
    this.post(apiPaths.tokens, () => new Response(200, {}, uuid()));

    this.post(apiPaths.nonces, () => new Response(200, {}, uuid()));
  },
});
