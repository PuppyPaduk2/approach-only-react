import { API_BASE_URL } from "@src/settings/constants";
import { createServer } from "miragejs";

createServer({
  urlPrefix: API_BASE_URL,
  timing: 1000,
  routes() {},
});
