import Comment from "./Commnet";

export default function CommnetsList({ comments, user }) {
  return (
    <div className="flex h-[80vh] w-full flex-col space-y-1 overflow-y-scroll py-2 scrollbar-hide">
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} user={user} />
        ))}
    </div>
  );
}
