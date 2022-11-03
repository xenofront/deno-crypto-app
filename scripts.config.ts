import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "server.ts",
      allow: ["all"],
    },
  },
};

export default config;
