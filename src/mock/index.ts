import { apiPaths } from "@src/settings/api-paths";
import { API_BASE_URL } from "@src/settings/constants";
import { createServer, Response } from "miragejs";

createServer({
  urlPrefix: API_BASE_URL,
  timing: 1000,
  routes() {
    this.get(apiPaths.checkToken, () => new Response(200));

    this.post(apiPaths.signIn, () => new Response(200, {}, "token-asd-123"));

    this.get(apiPaths.signOut, () => new Response(200));
  },
});
