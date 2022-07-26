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

export default function FormInput({
  user,
  setIsOpen,
  isEditing,
  comment,
  setIsEditing,
}) {
  const [createComment, { data }] = useMutation(CREATE_COMMENT, {
    refetchQueries: ["comments"],
  });

  const [updateComment] = useMutation(UPDATE_COMMENT, {
    refetchQueries: ["comments"],
  });

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = e.target[0].value;
    if (inputValue === "") return;
    if (!isEditing) {
      createComment({ variables: { comment: inputValue } });
    } else {
      updateComment({
        variables: { commentId: comment.id, content: inputValue },
        onCompleted() {
          setIsEditing(false);
        },
      });
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
      {!isEditing && (
        <img
          onClick={handleClick}
          src={`/images/avatars/image-${user && user.name}.png`}
          alt="profile"
          className="w-10"
        />
      )}
      <textarea
        placeholder="Leave a Comment"
        className="w-full px-3 h-full py-2 rounded-lg border border-lightGray self-stretch"
        defaultValue={isEditing ? comment.comment : ""}
      />
      <button
        type="submit"
        className="px-6 py-2 rounded-lg bg-moderateBlue text-white font-medium font-sans hover:opacity-75 "
      >
        {isEditing ? "UPDATE" : "SEND"}
      </button>
    </form>
  );
}