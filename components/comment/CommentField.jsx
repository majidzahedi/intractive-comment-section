import FormInput from "../FormInput";

export const CommentField = ({ edditing, comment, setIsEditing }) => {
  return edditing ? (
    <FormInput
      comment={comment}
      edditing={edditing}
      toggleEdit={setIsEditing}
    />
  ) : (
    <p className="text-base text-latteSubText0 dark:text-mochaSubText0">
      {comment.comment}
    </p>
  );
};
