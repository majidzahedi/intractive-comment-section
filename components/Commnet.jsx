import { useMutation, gql } from "@apollo/client";
import FormInput from "../components/FormInput";
import { useState } from "react";

const DELETE = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      id
    }
  }
`;

export default function Comment({ comment, user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [deleteComment] = useMutation(DELETE);

  function handleDelete() {
    deleteComment({
      variables: { commentId: comment.id },
      refetchQueries: ["comments"],
    });
  }

  return (
    <>
      <div className="flex w-full flex-col-reverse items-start space-y-0 rounded-lg bg-white p-4 md:flex-row md:space-x-4">
        <div className="mt-2 flex w-full justify-between md:mt-0 md:w-auto">
          <Rate />
          <Crud
            visability="flex md:hidden"
            isEditing={isEditing}
            user={user}
            comment={comment}
            setIsEditing={setIsEditing}
            isReply={isReply}
            setIsReply={setIsReply}
            handleDelete={handleDelete}
          />
        </div>
        <div className="flex w-full flex-col space-y-4">
          <UserSummery
            comment={comment}
            user={user}
            setIsReply={setIsReply}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            isReply={isReply}
          />
          <CommentField
            setIsEditing={setIsEditing}
            comment={comment}
            isEditing={isEditing}
          />
        </div>
      </div>
      {isReply && (
        <FormInput
          user={user}
          isReply={isReply}
          comment={comment}
          setIsReply={setIsReply}
        />
      )}
      <Replies comment={comment} user={user} />
    </>
  );
}

const UserSummery = ({
  comment,
  user,
  setIsEditing,
  setIsReply,
  isReply,
  isEditing,
}) => {
  const [deleteComment] = useMutation(DELETE);

  function handleDelete() {
    deleteComment({
      variables: { commentId: comment.id },
      refetchQueries: ["comments"],
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img
          src={`/images/avatars/image-${comment.user.name}.png`}
          alt=""
          className="w-7"
        />
        <p className="text-sm font-medium text-darkBlue">{comment.user.name}</p>
        <p
          hidden={comment.user.name !== user.name}
          className="rounded-sm bg-moderateBlue px-1 text-xs font-medium text-white"
        >
          you
        </p>
        <p className="text-sm text-lightGrayishBlue">1 Week ago</p>
      </div>
      <Crud
        isEditing={isEditing}
        user={user}
        comment={comment}
        setIsEditing={setIsEditing}
        isReply={isReply}
        setIsReply={setIsReply}
        handleDelete={handleDelete}
      />
    </div>
  );
};

const Crud = ({
  isEditing,
  user,
  comment,
  setIsEditing,
  isReply,
  setIsReply,
  handleDelete,
  visability = "md:flex hidden",
}) => (
  <div className={` space-x-5 ${visability}`}>
    <button
      className={`flex items-center space-x-1 font-medium text-softRed hover:opacity-70 ${
        comment.user.name !== user.name && "hidden"
      }`}
      onClick={handleDelete}
    >
      <img src="/images/icon-delete.svg" alt="" />
      <p>Delete</p>
    </button>
    <button
      className={`flex items-center space-x-1 font-medium text-moderateBlue hover:opacity-70 ${
        comment.user.name !== user.name && "hidden"
      }`}
      onClick={() => setIsEditing((prev) => !prev)}
    >
      <img src="/images/icon-edit.svg" alt="" />
      <span>{isEditing ? "CANCEL" : "EDIT"}</span>
    </button>
    <button
      disabled={user.name === "Anonymous"}
      className={`flex items-center space-x-1 font-medium text-moderateBlue hover:opacity-70 disabled:opacity-70 ${
        comment.user.name === user.name && "hidden"
      }`}
      onClick={() => setIsReply((prev) => !prev)}
    >
      <img src="/images/icon-reply.svg" alt="" />
      <span>{isReply ? "CANCEL" : "REPLY"}</span>
    </button>
  </div>
);

const Rate = () => {
  return (
    <div className="flex items-center justify-center space-x-3 rounded-lg bg-veryLightGray py-2 px-4  md:flex-col md:space-y-1 md:space-x-0 md:p-4">
      <button className="font-bold text-grayishBlue ">+</button>
      <button className="font-bold text-moderateBlue">4</button>
      <button className="font-bold text-grayishBlue">-</button>
    </div>
  );
};

const Replies = ({ comment, user }) => {
  return (
    <div className="flex ">
      <div className="mx-4  w-1 bg-grayishBlue  md:mx-12"></div>
      <div className="flex w-full flex-col space-y-2 ">
        {comment.replies &&
          comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} user={user} />
          ))}
      </div>
    </div>
  );
};

const CommentField = ({ isEditing, comment, setIsEditing }) => {
  return isEditing ? (
    <FormInput
      isEditing={isEditing}
      comment={comment}
      setIsEditing={setIsEditing}
    />
  ) : (
    <p className="text-base text-grayishBlue ">{comment.comment}</p>
  );
};
