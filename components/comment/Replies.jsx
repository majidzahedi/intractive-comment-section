import Comment from ".";

export const Replies = ({ comment, user }) => {
  return (
    <div className="flex pt-1">
      <div className="mx-4  w-1 rounded-full bg-overlay0  md:mx-12"></div>
      <div className="flex w-full flex-col space-y-1 ">
        {comment.replies &&
          comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} user={user} />
          ))}
      </div>
    </div>
  );
};
