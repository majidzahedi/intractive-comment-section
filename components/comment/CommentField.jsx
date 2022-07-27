import FormInput from "../FormInput";

export const CommentField = ({ edditing, commentContent, setIsEditing }) => {
  return isEditing ? (
    <FormInput
      comment={commentContent}
      edditing={edditing}
      toggleEdit={setIsEditing}
    />
  ) : (
    <p className="text-base text-grayishBlue ">{commentContent}</p>
  );
};
