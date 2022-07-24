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

        return user;
      },
    });
    t.field("replies", {
      type: list("Comment"),
      async resolve(parent, _, context) {
        const replies = await context.prisma.comment.findMany({
          where: { parentId: parent.id },
        });
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
        if (!context.userId) throw new Error("Please Login");
        const comment = await context.prisma.comment.create({
          data: { comment: args.comment, userId: context.userId },
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
        if (!context.userId) throw new Error("Please Login!");

        const alreadyCommented = await context.prisma.comment.findFirst({
          where: {
            AND: [
              { Children: { some: { userId: context.userId } } },
              { id: args.commentId },
            ],
          },
        });
        if (!!alreadyCommented)
          throw new Error("You've already Commented on that!");

        const isOwnComment = await context.prisma.comment.findFirst({
          where: { AND: [{ userId: context.userId }, { id: args.commentId }] },
        });
        if (!!isOwnComment)
          throw new Error("You can't Reply to your own Comment!");

        const comment = await context.prisma.comment.create({
          data: {
            comment: args.reply,
            userId: context.userId,
            parentId: args.commentId,
          },
        });
        return comment;
      },
    });
  },
});

export const updateComment = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateComment", {
      type: "Comment",
      args: {
        commentId: nonNull(idArg()),
        content: nonNull(stringArg()),
      },
      async resolve(_, args, context) {
        if (!context.userId) throw new Error("Please Login!");

        const isCommentOwner = await context.prisma.comment.findFirst({
          where: { AND: [{ userId: context.userId }, { id: args.commentId }] },
        });

        if (!isCommentOwner) throw new Error("Oops! something bad happend!");

        const updatedComment = await context.prisma.comment.update({
          where: { id: args.commentId },
          data: { comment: args.content },
        });

        return updatedComment;
      },
    });
  },
});

export const deleteComment = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteComment", {
      type: "Comment",
      args: {
        commentId: nonNull(idArg()),
      },
      async resolve(_, args, context) {
        if (!context.userId) throw new Error("Please Login!");

        const isCommentOwner = await context.prisma.comment.findFirst({
          where: { AND: [{ userId: context.userId }, { id: args.commentId }] },
        });

        if (!isCommentOwner) throw new Error("Oops! Something Bad happend!");

        const deletedComment = await context.prisma.comment.delete({
          where: { id: args.commentId },
        });

        return deletedComment;
      },
    });
  },
});
