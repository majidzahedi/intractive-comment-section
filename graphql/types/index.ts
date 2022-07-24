import { extendType } from "nexus";

export * from "./User";
export * from "./Auth";
export * from "./Comment";

export const query = extendType({
  type: "Query",
  definition(t) {
    t.field("helloWorld", {
      type: "String",
      resolve() {
        return "hello world";
      },
    });
  },
});
