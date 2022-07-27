import Comment from "./comment";

export default function CommnetsList({ comments, user }) {
  return (
    <div className="flex max-h-[75vh] w-full flex-col   space-y-1 overflow-y-scroll py-2 scrollbar-hide md:max-h-[85vh]">
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} user={user} />
        ))}
    </div>
  );
}
