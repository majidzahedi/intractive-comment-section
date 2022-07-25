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

export default function FormInput() {
  const [createComment, { data }] = useMutation(CREATE_COMMENT, {
    refetchQueries: ["comments"],
  });

  function handleSubmit(e) {
    e.preventDefault();
    const comment = e.target[0].value;
    if (comment === "") return;
    createComment({ variables: { comment } });
  }

  return (
    <form
      className="flex items-start justify-between rounded-xl space-x-4 bg-white h-36 py-4  px-4 w-full "
      onSubmit={handleSubmit}
    >
      <img
        src="/images/avatars/image-juliusomo.png"
        alt="profile"
        className="w-10"
      />
      <textarea
        placeholder="Leave a Comment"
        className="w-full px-3 py-2 rounded-lg border border-lightGray self-stretch"
      />
      <button
        type="submit"
        className="px-6 py-2 rounded-lg bg-moderateBlue text-white font-medium font-sans hover:opacity-75"
      >
        SEND
      </button>
    </form>
  );
}