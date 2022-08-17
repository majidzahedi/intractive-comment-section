import { gql, useMutation } from "@apollo/client";
import DeleteModal from "./DeleteModal";
import MenuComponent from "./Menu";

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
  edditing,
  comment,
  toggleEdit,
  isReply,
  setIsReply,
}) {
  const [createComment, { loading: createLoading }] = useMutation(
    CREATE_COMMENT,
    {
      refetchQueries: ["Comments"],
    }
  );

  const [updateComment, { loading: updateLoading }] = useMutation(
    UPDATE_COMMENT,
    {
      refetchQueries: ["Comments"],
    }
  );

  const [replyOnComment, { loading: replyLoading }] = useMutation(REPLY, {
    refetchQueries: ["Comments"],
  });

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = e.target[0].value.trim();
    if (inputValue === "") return;
    if (edditing) {
      updateComment({
        variables: { commentId: comment.id, content: inputValue },
        onCompleted() {
          toggleEdit();
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
      createComment({
        variables: { comment: inputValue },
        onCompleted() {
          e.target[0].value = "";
        },
      });
    }
  }

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  if (edditing) {
    return (
      <form
        className="flex w-full flex-col items-end justify-between space-x-0 space-y-2 rounded-xl bg-base p-4 px-0 py-0  pt-1 transition-colors duration-300  md:items-start md:space-x-4 md:pt-2
      "
        onSubmit={handleSubmit}
      >
        <textarea
          autoFocus
          placeholder="اضافه کردن نظر..."
          className=" order-first h-20 w-full rounded-lg border border-overlay0 bg-mantle px-3 py-2 text-text transition-colors duration-300 scrollbar-hide placeholder:text-subtext0  md:order-none"
          defaultValue={comment.comment}
        />
        <button
          type="submit"
          className={`flex space-x-1 self-end rounded-lg bg-sapphire px-6 py-2 font-sans font-medium  text-crust hover:opacity-75 disabled:opacity-95  ${
            updateLoading ? "animate-pulse" : ""
          }`}
          disabled={user?.name === "Anonymous" || updateLoading}
        >
          به روز رسانی
        </button>
      </form>
    );
  }

  return (
    <form
      className=" relative bottom-0 flex w-full  flex-wrap items-end justify-between space-y-4 rounded-xl  bg-base   p-4 pt-1 shadow-sm transition-colors duration-300  md:flex-none md:flex-nowrap md:items-start md:space-x-4 md:space-y-0 md:pt-2
       "
      onSubmit={handleSubmit}
    >
      <MenuComponent user={user} />
      {/* {user?.name !== "Anonymous" && (
        <img
          onClick={handleClick}
          src={`/images/avatars/image-${user?.name}.png`}
          alt="profile"
          className="ml-2 w-10"
        />
      )}
      {user?.name === "Anonymous" && (
        <div
          className="line bg-darkBlue flex h-8 w-10 items-center justify-center rounded-full p-0 font-bold leading-tight text-white"
          onClick={handleClick}
        >
          <span>A</span>
        </div>
      )} */}
      <textarea
        autoFocus
        placeholder="اضافه کردن نظر ..."
        className=" order-first h-20 w-full rounded-lg border border-overlay0 bg-mantle px-3 py-2 text-text transition-colors duration-300 scrollbar-hide placeholder:text-subtext0  md:order-none"
        disabled={user?.name === "Anonymous"}
      />
      <button
        type="submit"
        className={`flex space-x-1 rounded-lg bg-sapphire px-6 py-2 font-sans font-medium text-crust hover:opacity-75 disabled:opacity-95  ${
          createLoading || replyLoading ? "animate-pulse" : ""
        }`}
        disabled={user?.name === "Anonymous" || createLoading || replyLoading}
      >
        {isReply ? "پاسخ" : "ارسال"}
      </button>
    </form>
  );
}
