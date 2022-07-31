import { gql, useMutation } from "@apollo/client";

const DELETE = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      id
    }
  }
`;

export const Crud = ({
  commentId,
  isCommentOwner,
  isAnonymous,
  settings,
  toggleEdit,
  toggleReply,
  visability = "hidden md:flex",
}) => {
  const [deleteComment, { loading }] = useMutation(DELETE);

  function handleDelete() {
    deleteComment({
      variables: { commentId },
      refetchQueries: ["Comments"],
      onCompleted: () => {},
    });
  }

  return (
    <div className={`${visability} space-x-5`}>
      <button
        className={`flex items-center space-x-1 font-medium text-softRed hover:opacity-70 disabled:opacity-90 ${
          !isCommentOwner && "hidden"
        } ${loading ? "animate-pulse" : ""}`}
        onClick={handleDelete}
        disabled={loading}
      >
        <img src="/images/icon-delete.svg" alt="" />
        <p>Delete</p>
      </button>
      <button
        className={`flex items-center space-x-1 font-medium text-moderateBlue hover:opacity-70 ${
          !isCommentOwner && "hidden"
        }`}
        onClick={toggleEdit}
      >
        <img src="/images/icon-edit.svg" alt="" />
        <span>{settings.isEditing ? "CANCEL" : "EDIT"}</span>
      </button>
      <button
        disabled={isAnonymous}
        className={`flex items-center space-x-1 font-medium text-moderateBlue hover:opacity-70 disabled:opacity-70 ${
          isCommentOwner && "hidden"
        }`}
        onClick={(e) => {
          console.log("reply clicked");
          toggleReply();
        }}
      >
        <img src="/images/icon-reply.svg" alt="" />
        <span>{settings.isReply ? "CANCEL" : "REPLY"}</span>
      </button>
    </div>
  );
};
