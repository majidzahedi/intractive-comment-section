import { PrismaClient } from "@prisma/client";
import { connectionPlugin, makeSchema } from "nexus";
import { join } from "path";
import * as types from "./types";

export const schema = makeSchema({
  types,
  sourceTypes: {
    modules: [
      {
        module: join(
          process.cwd(),
          "node_modules",
          "@prisma",
          "client",
          "index.d.ts"
        ),
        alias: "prisma",
      },
    ],
  },
  plugins: [connectionPlugin()],
  outputs: {
    typegen: join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: join(process.cwd(), "graphql", "schema.graphql"),
  },
  contextType: {
    module: join(process.cwd(), "graphql", "context.ts"),
    export: "Context",
  },
});
