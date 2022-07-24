import { extendType, objectType, list } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("email");
    t.nonNull.string("name");
  },
});

export const userQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("users", {
      type: list("User"),
      async resolve(_, __, context) {
        const users = await context.prisma.user.findMany();
        return users;
      },
    });
  },
});
