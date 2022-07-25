import Comment from "./Commnet";

export default function CommnetsList({ comments }) {
  return (
    <div className="flex flex-col space-y-1 py-2 ">
      {comments && comments.map((comment) => <Comment comment={comment} />)}
    </div>
  );
}
