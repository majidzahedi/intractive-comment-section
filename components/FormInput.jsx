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
      className={`flex h-36 w-full items-end justify-between rounded-xl bg-white p-4 pt-1 md:items-start md:space-x-4  md:pt-4 ${
        isEditing
          ? "flex-col items-end space-x-0 space-y-2 px-0 py-0"
          : "sticky  flex-1 flex-wrap space-y-4 md:flex-none md:flex-nowrap md:space-x-4 md:space-y-0"
      } `}
      onSubmit={handleSubmit}
    >
      {!isEditing && user.name !== "Anonymous" ? (
        <img
          onClick={handleClick}
          src={`/images/avatars/image-${user && user.name}.png`}
          alt="profile"
          className="ml-2 w-10"
        />
      ) : (
        <div
          className="line flex h-8 w-10 items-center justify-center rounded-full bg-darkBlue p-0 font-bold leading-tight text-white"
          onClick={handleClick}
        >
          <span>A</span>
        </div>
      )}
      <textarea
        placeholder="Leave a Comment"
        className="order-first h-24 w-full rounded-lg border border-lightGray px-3 py-2 md:order-none md:h-full"
        defaultValue={isEditing ? comment.comment : ""}
        disabled={user.name === "Anonymous"}
      />
      <button
        type="submit"
        className="rounded-lg bg-moderateBlue px-6 py-2 font-sans font-medium text-white hover:opacity-75 disabled:opacity-75 "
        disabled={user.name === "Anonymous"}
      >
        {isEditing ? "UPDATE" : isReply ? "REPLY" : "SEND"}
      </button>
    </form>
  );
}
