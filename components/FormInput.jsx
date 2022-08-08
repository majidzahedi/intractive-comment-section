import { gql, useMutation } from "@apollo/client";
import useDarkMode from "../utils/index";
import { Switch } from "@headlessui/react";
import { clsx } from "clsx";
import Modal from "./Modal";

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
  // const { isDarkMode, toggleDarkMode } = useDarkMode();

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
        className="flex w-full flex-col items-end justify-between space-x-0 space-y-2 rounded-xl bg-white p-4  px-0 py-0 pt-1 dark:bg-mochaBase md:items-start md:space-x-4 md:pt-2
      "
        onSubmit={handleSubmit}
      >
        <textarea
          autoFocus
          placeholder="اضافه کردن نظر..."
          className="border-lightGray order-first h-24 w-full rounded-lg border px-3 py-2 text-mochaText scrollbar-hide dark:bg-mochaBase md:order-none"
          defaultValue={comment.comment}
        />
        <button
          type="submit"
          className={`flex space-x-1 self-end rounded-lg bg-latteSapphire px-6 py-2 font-sans font-medium text-white hover:opacity-75 disabled:opacity-95 dark:bg-mochaSapphire ${
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
      className=" bottom-0 flex w-full  flex-wrap items-end justify-between  space-y-4  overflow-hidden rounded-xl bg-white p-4 pt-1 shadow-sm dark:bg-mochaBase md:flex-none md:flex-nowrap md:items-start md:space-x-4 md:space-y-0 md:pt-2
       "
      onSubmit={handleSubmit}
    >
      <Modal />
      {user?.name !== "Anonymous" && (
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
      )}
      <textarea
        autoFocus
        placeholder="اضافه کردن نظر ..."
        className="border-lightGray order-first h-20 w-full rounded-lg border border-latteOverlay0 bg-white px-3 py-2 scrollbar-hide dark:border-mochaOverlay0 dark:bg-mochaBase dark:text-mochaText md:order-none"
        disabled={user?.name === "Anonymous"}
      />
      <button
        type="submit"
        className={`flex space-x-1 rounded-lg bg-latteSapphire px-6 py-2 font-sans font-medium text-white hover:opacity-75 disabled:opacity-95 dark:bg-mochaSapphire ${
          createLoading || replyLoading ? "animate-pulse" : ""
        }`}
        disabled={user?.name === "Anonymous" || createLoading || replyLoading}
      >
        {isReply ? "پاسخ" : "ارسال"}
      </button>
      {/* <Switch */}
      {/*   className={clsx( */}
      {/*     isDarkMode */}
      {/*       ? "bg-latteSapphire dark:bg-mochaSapphire" */}
      {/*       : "bg-latteSubText0 dark:bg-mochaSubText0", */}
      {/*     "courser-pointer relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2" */}
      {/*   )} */}
      {/*   checked={isDarkMode} */}
      {/*   onChange={toggleDarkMode} */}
      {/* > */}
      {/*   <span */}
      {/*     className={clsx( */}
      {/*       isDarkMode ? "-translate-x-5" : "translate-x-0", */}
      {/*       "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-latteBase shadow ring-0 transition duration-200 ease-in-out " */}
      {/*     )} */}
      {/*   ></span> */}
      {/* </Switch> */}
    </form>
  );
}
