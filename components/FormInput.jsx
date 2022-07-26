import { gql, useMutation } from "@apollo/client";
const CREATE_COMMENT = gql`
  mutation Mutation($comment: String!) {
    createComment(comment: $comment) {
      id
      comment
      user {
        name
        id
      }
    }
  }
`;

const UPDATE_COMMENT = gql`
  mutation UpdateComment($commentId: ID!, $content: String!) {
    updateComment(commentId: $commentId, content: $content) {
      comment
    }
  }
`;

const REPLY = gql`
  mutation Reply($commentId: ID!, $reply: String!) {
    Reply(commentId: $commentId, reply: $reply) {
      comment
    }
  }
`;

export default function FormInput({
  user,
  setIsOpen,
  isEditing,
  comment,
  setIsEditing,
  isReply,
  setIsReply,
}) {
  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: ["comments"],
  });

  const [updateComment] = useMutation(UPDATE_COMMENT, {
    refetchQueries: ["comments"],
  });

  const [replyOnComment] = useMutation(REPLY, {
    refetchQueries: ["comments"],
  });

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = e.target[0].value;
    if (inputValue === "") return;
    if (isEditing) {
      updateComment({
        variables: { commentId: comment.id, content: inputValue },
        onCompleted() {
          setIsEditing(false);
        },
      });
    } else if (isReply) {
      replyOnComment({
        variables: { commentId: comment.id, reply: inputValue },
        onCompleted() {
          setIsReply(false);
        },
      });
    } else {
      createComment({ variables: { comment: inputValue } });
    }
  }

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <form
      className={`flex items-start justify-between rounded-xl space-x-4 bg-white h-36 py-4  px-4 w-full ${
        isEditing ? "flex-col items-end space-x-0 px-0 py-0 space-y-2" : ""
      } `}
      onSubmit={handleSubmit}
    >
      {!isEditing && user.name !== "Anonymous" ? (
        <img
          onClick={handleClick}
          src={`/images/avatars/image-${user && user.name}.png`}
          alt="profile"
          className="w-10"
        />
      ) : (
        <div
          className="flex rounded-full bg-darkBlue w-10 h-8 text-white font-bold items-center justify-center line leading-tight p-0"
          onClick={handleClick}
        >
          <span>A</span>
        </div>
      )}
      <textarea
        placeholder="Leave a Comment"
        className="w-full px-3 h-full py-2 rounded-lg border border-lightGray self-stretch"
        defaultValue={isEditing ? comment.comment : ""}
        disabled={user.name === "Anonymous"}
      />
      <button
        type="submit"
        className="px-6 py-2 rounded-lg bg-moderateBlue text-white font-medium font-sans hover:opacity-75 disabled:opacity-75 "
        disabled={user.name === "Anonymous"}
      >
        {isEditing ? "UPDATE" : isReply ? "REPLY" : "EDIT"}
      </button>
    </form>
  );
}
