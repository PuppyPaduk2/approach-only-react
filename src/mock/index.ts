import { Role } from "@src/contexts/roles";
import { UserSettings } from "@src/contexts/user-settings";
import { uuid } from "@src/libs/utils";
import { apiPaths } from "@src/settings/api-paths";
import { API_BASE_URL } from "@src/settings/constants";
import { createServer, Model, Response } from "miragejs";

createServer({
  urlPrefix: API_BASE_URL,
  timing: 1000,
  models: {
    roles: Model,
  },
  routes() {
    this.post(apiPaths.tokens, () => new Response(200, {}, {
      token: uuid(),
    }));

    this.post(apiPaths.nonces, () => new Response(200, {}, {
      nonce: uuid(),
    }));

    this.get(apiPaths.userSettings, () => {
      const userSettings: UserSettings = {
        name: "Bob",
        permissionList: ["roles.read", "roles.write"],
      };
      return new Response(200, {}, { userSettings});
    });

    this.get(apiPaths.roles, () => new Response(200, {}, {
      roleList: this.db.roles.where({}),
    }));

    this.post(apiPaths.roles, (_, request) => {
      const role: Role = JSON.parse(request.requestBody);
      this.db.roles.insert(role);
      return new Response(200, {}, {
        role: this.db.roles.findBy({ cid: role.cid }),
      });
    });
  },
});
