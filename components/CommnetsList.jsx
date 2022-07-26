import Comment from "./Commnet";

export default function CommnetsList({ comments, user }) {
  return (
    <div className="flex h-[75vh] w-full flex-col justify-end space-y-1 overflow-y-scroll py-2 scrollbar-hide md:h-[85vh]">
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} user={user} />
        ))}
    </div>
  );
}
