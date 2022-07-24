import { typeFromAST } from "graphql";
import { extendType, list, objectType, stringArg, nonNull, idArg } from "nexus";

export const Comment = objectType({
  name: "Comment",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("comment");
    t.field("user", {
      type: "User",
      async resolve(parent, __, context) {
        const user = await context.prisma.user.findFirst({
          where: { comments: { some: { id: parent.id } } },
        });

        console.log(user);
        return user;
      },
    });
    t.field("replies", {
      type: list("Comment"),
      async resolve(parent, _, context) {
        const replies = await context.prisma.comment.findMany({
          where: { parentId: parent.id },
        });
        // console.log(replies);
        return replies;
      },
    });
  },
});

export const comments = extendType({
  type: "Query",
  definition(t) {
    t.field("comments", {
      type: list("Comment"),
      async resolve(_, __, context) {
        const comments = await context.prisma.comment.findMany({
          where: { parentId: null },
        });
        // console.log(comments);
        return comments;
      },
    });
  },
});

export const createComment = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createComment", {
      type: "Comment",
      args: {
        comment: nonNull(stringArg()),
      },
      async resolve(_, args, context) {
        const comment = await context.prisma.comment.create({
          data: { comment: args.comment, userId: "cl5ze295v0000fgoeu7mh5i3q" },
        });
        return comment;
      },
    });
  },
});

export const createReply = extendType({
  type: "Mutation",
  definition(t) {
    t.field("Reply", {
      type: "Comment",
      args: {
        commentId: nonNull(idArg()),
        reply: nonNull(stringArg()),
      },
      async resolve(_, args, context) {
        const comment = await context.prisma.comment.create({
          data: {
            comment: args.reply,
            userId: "cl5ze295v0000fgoeu7mh5i3q",
            parentId: args.commentId,
          },
        });
        return comment;
      },
    });
  },
});
