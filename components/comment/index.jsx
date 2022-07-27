import FormInput from "../FormInput";
import { useState } from "react";
import { UserSummery } from "./UserSummery";
import { Crud } from "./Crud";
import { Rate } from "./Rate";
import { CommentField } from "./CommentField";
import { Replies } from "./Replies";

export default function Comment({ comment, user }) {
  const [settings, setSettings] = useState({
    isEditing: false,
    isReplying: false,
  });

  const toggleHandler = {
    toggleReply: () =>
      setSettings((prevState) => ({
        ...prevState,
        isReplying: !prevState.isReplying,
      })),
    toggleEdit: () =>
      setSettings((prevState) => ({
        ...prevState,
        isEditing: !prevState.isEditing,
      })),
  };

  return (
    <>
      <div className="flex w-full flex-col-reverse items-start space-y-0 rounded-lg bg-white p-4 shadow-sm shadow-lightGrayishBlue md:flex-row md:space-x-4">
        <div className="mt-2 flex w-full justify-between md:mt-0 md:w-auto">
          <Rate
            commentId={comment.id}
            vote={comment.votes}
            isCommentOwner={comment.user.id === user?.id}
            isUserVoted={!!comment.isVoted}
          />
          <Crud
            commentId={comment.id}
            isCommentOwner={comment.user.id === user?.id}
            isAnonymous={user?.name === "Anonymous"}
            settings={settings}
            visability="flex md:hidden"
            toggleEdit={toggleHandler.toggleEdit}
            toggleReply={toggleHandler.toggleReply}
          />
        </div>
        <div className="flex w-full flex-col space-y-4">
          <UserSummery
            isCommentOwner={comment.user.id === user?.id}
            commentUserName={comment.user.name}
            createdAt={+comment.createdAt}
          >
            <Crud
              commentId={comment.id}
              isCommentOwner={comment.user.id === user?.id}
              isAnonymous={user?.name === "Anonymous"}
              settings={settings}
              {...toggleHandler}
            />
          </UserSummery>
          <CommentField
            comment={comment}
            edditing={settings.isEditing}
            setIsEditing={toggleHandler.toggleEdit}
          />
        </div>
      </div>
      {settings.isReplying && (
        <FormInput
          user={user}
          isReply={settings.isReplying}
          comment={comment}
          setIsReply={toggleHandler.toggleReply}
        />
      )}
      <Replies comment={comment} user={user} />
    </>
  );
}
