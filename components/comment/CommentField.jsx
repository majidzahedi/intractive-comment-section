import FormInput from "../FormInput";

export const CommentField = ({ edditing, comment, setIsEditing }) => {
  return edditing ? (
    <FormInput
      comment={comment}
      edditing={edditing}
      toggleEdit={setIsEditing}
    />
  ) : (
    <p className="text-base text-grayishBlue ">{comment.comment}</p>
  );
};
