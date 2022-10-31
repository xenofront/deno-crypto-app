import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "server.ts",
      importMap: "import_map.json",
      allow: ["all"],
    },
  },
};

export default config;
