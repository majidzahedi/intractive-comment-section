import {
  extendType,
  list,
  objectType,
  stringArg,
  nonNull,
  idArg,
  enumType,
} from "nexus";

export const voteStatus = enumType({
  name: "voteStatus",
  members: ["UPVOTE", "DOWNVOTE"],
});

export const Comment = objectType({
  name: "Comment",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("comment");
    t.nonNull.string("createdAt");
    t.field("user", {
      type: "User",
      async resolve(parent, __, context) {
        const user = await context.prisma.user.findFirst({
          where: { comments: { some: { id: parent.id } } },
        });

        return user;
      },
    });
    t.field("votes", {
      type: nonNull("Int"),
      async resolve(parent, _, context) {
        const downVotes = await context.prisma.vote.count({
          where: {
            AND: [
              {
                vote: "DOWNVOTE",
              },
              {
                commentId: parent.id,
              },
            ],
          },
        });

        const upVotes = await context.prisma.vote.count({
          where: {
            AND: [
              {
                vote: "UPVOTE",
              },
              {
                commentId: parent.id,
              },
            ],
          },
        });

        return upVotes - downVotes;
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
    t.field("isVoted", {
      type: "voteStatus",
      async resolve(parent, _, context) {
        if (!context.userId) return null;

        const unique = await context.prisma.vote.findUnique({
          where: {
            userId_commentId: {
              commentId: parent.id,
              userId: context.userId,
            },
          },
        });

        console.log(unique);

        return unique?.vote;
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
          orderBy: { createdAt: "asc" },
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

export const upVote = extendType({
  type: "Mutation",
  definition(t) {
    t.field("upVote", {
      type: "Comment",
      args: {
        commentId: nonNull(idArg()),
      },
      async resolve(_, args, context) {
        if (!context.userId) throw new Error("Please Login!");
        console.log(context.userId);

        const comment = await context.prisma.comment.update({
          where: { id: args.commentId },
          data: {
            votes: {
              upsert: {
                where: {
                  userId_commentId: {
                    commentId: args.commentId,
                    userId: context.userId,
                  },
                },
                create: { vote: "UPVOTE", userId: context.userId },
                update: { vote: "UPVOTE" },
              },
            },
          },
        });
        return comment;
      },
    });
  },
});

export const downVote = extendType({
  type: "Mutation",
  definition(t) {
    t.field("downVote", {
      type: "Comment",
      args: {
        commentId: nonNull(idArg()),
      },
      async resolve(_, args, context) {
        if (!context.userId) throw new Error("Please Login!");

        const comment = await context.prisma.comment.update({
          where: { id: args.commentId },
          data: {
            votes: {
              upsert: {
                where: {
                  userId_commentId: {
                    commentId: args.commentId,
                    userId: context.userId,
                  },
                },
                create: { vote: "DOWNVOTE", userId: context.userId },
                update: { vote: "DOWNVOTE" },
              },
            },
          },
        });

        return comment;
      },
    });
  },
});

export const removeVote = extendType({
  type: "Mutation",
  definition(t) {
    t.field("removeVote", {
      type: "Comment",
      args: {
        commentId: nonNull(idArg()),
      },
      async resolve(_, args, context) {
        if (!context.userId) throw new Error("Please Login!");

        const comment = await context.prisma.comment.update({
          where: { id: args.commentId },
          data: {
            votes: {
              delete: {
                userId_commentId: {
                  userId: context.userId,
                  commentId: args.commentId,
                },
              },
            },
          },
        });

        return comment;
      },
    });
  },
});
