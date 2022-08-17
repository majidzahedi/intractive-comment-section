import FormInput from "../FormInput";

export const CommentField = ({ edditing, comment, setIsEditing }) => {
  return edditing ? (
    <FormInput
      comment={comment}
      edditing={edditing}
      toggleEdit={setIsEditing}
    />
  ) : (
    <p className="text-text">{comment.comment}</p>
  );
};
