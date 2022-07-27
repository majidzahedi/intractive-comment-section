import { useMutation, gql } from "@apollo/client";

const UPVOTE = gql`
  mutation UpVote($commentId: ID!) {
    upVote(commentId: $commentId) {
      votes
    }
  }
`;

const DOWNVOTE = gql`
  mutation DownVote($commentId: ID!) {
    downVote(commentId: $commentId) {
      votes
    }
  }
`;

const REMOVEVOTE = gql`
  mutation RemoveVote($commentId: ID!) {
    removeVote(commentId: $commentId) {
      votes
    }
  }
`;

export const Rate = ({ vote, commentId, isCommentOwner, isUserVoted }) => {
  const [upVote] = useMutation(UPVOTE);
  const [downVote] = useMutation(DOWNVOTE);
  const [removeVote] = useMutation(REMOVEVOTE);

  function handleUpVote() {
    upVote({
      variables: { commentId },
      refetchQueries: ["comments"],
    });
  }

  function handleDownVote() {
    downVote({
      variables: { commentId },
      refetchQueries: ["comments"],
    });
  }

  function handleRemoveVote() {
    removeVote({
      variables: { commentId },
      refetchQueries: ["comments"],
    });
  }

  return (
    <div className="flex items-center justify-center space-x-3 rounded-lg bg-veryLightGray py-2 px-4  md:flex-col md:space-y-1 md:space-x-0 md:p-4">
      <button
        className="font-bold text-grayishBlue "
        onClick={isUserVoted ? handleRemoveVote : handleUpVote}
        disabled={isCommentOwner}
      >
        +
      </button>
      <span className="font-bold text-moderateBlue">{vote}</span>
      <button
        className="font-bold text-grayishBlue"
        onClick={isUserVoted ? handleRemoveVote : handleDownVote}
        disabled={isCommentOwner}
      >
        -
      </button>
    </div>
  );
};
