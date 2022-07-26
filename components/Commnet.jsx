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
      <div className="flex flex-col-reverse w-full p-4 space-y-0 items-start bg-white rounded-lg md:flex-row md:space-x-4">
        <div className="flex justify-between w-full md:w-auto mt-2 md:mt-0">
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
        <div className="flex flex-col w-full space-y-4">
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
    <div className="flex justify-between items-center">
      <div className="flex space-x-3 items-center">
        <img
          src={`/images/avatars/image-${comment.user.name}.png`}
          alt=""
          className="w-7"
        />
        <p className="font-medium text-darkBlue text-sm">{comment.user.name}</p>
        <p
          hidden={comment.user.name !== user.name}
          className="text-white bg-moderateBlue px-1 text-xs font-medium rounded-sm"
        >
          you
        </p>
        <p className="text-lightGrayishBlue text-sm">1 Week ago</p>
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
      className={`flex items-center space-x-1 hover:opacity-70 text-softRed font-medium ${
        comment.user.name !== user.name && "hidden"
      }`}
      onClick={handleDelete}
    >
      <img src="/images/icon-delete.svg" alt="" />
      <p>Delete</p>
    </button>
    <button
      className={`flex items-center space-x-1 hover:opacity-70 text-moderateBlue font-medium ${
        comment.user.name !== user.name && "hidden"
      }`}
      onClick={() => setIsEditing((prev) => !prev)}
    >
      <img src="/images/icon-edit.svg" alt="" />
      <span>{isEditing ? "CANCEL" : "EDIT"}</span>
    </button>
    <button
      disabled={user.name === "Anonymous"}
      className={`flex items-center space-x-1 hover:opacity-70 text-moderateBlue font-medium disabled:opacity-70 ${
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
    <div className="flex rounded-lg py-2 px-4 md:p-4 space-x-3 items-center justify-center  bg-veryLightGray md:flex-col md:space-y-1 md:space-x-0">
      <button className="text-grayishBlue font-bold ">+</button>
      <button className="text-moderateBlue font-bold">4</button>
      <button className="text-grayishBlue font-bold">-</button>
    </div>
  );
};

const Replies = ({ comment, user }) => {
  return (
    <div className="flex ">
      <div className="w-1  mx-4 md:mx-12  bg-grayishBlue"></div>
      <div className="flex space-y-2 flex-col w-full ">
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
    <p className="text-base text-grayishBlue text-justify">{comment.comment}</p>
  );
};
