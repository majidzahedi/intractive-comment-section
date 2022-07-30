import { useEffect, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import Comment from "./comment";

const COMMENTS = gql`
  query Comments($first: Int, $after: String) {
    comments(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          comment
          createdAt
          votes
          user {
            id
            name
          }
          isVoted
          replies {
            id
            comment
            createdAt
            votes
            user {
              id
              name
            }
            isVoted
            replies {
              id
              comment
              createdAt
              votes
              user {
                id
                name
              }
              isVoted
            }
          }
        }
      }
    }
  }
`;

export default function CommnetsList({ user }) {
  const { data, loading, error, fetchMore } = useQuery(COMMENTS, {
    variables: { first: 10 },
  });

  const bottomRef = useRef(null);

  const { comments } = !!data && data;
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (loading) {
    return (
      <div className="relative -top-20 right-0 h-10 w-10 animate-spin items-center justify-center rounded-full border-2 border-darkBlue border-b-transparent"></div>
    );
  }

  const { endCursor, hasNextPage } = data.comments.pageInfo;

  return (
    <div className="flex max-h-[75vh] w-full flex-col   space-y-1 overflow-y-scroll py-2 scrollbar-hide md:max-h-[83vh]">
      {hasNextPage ? (
        <button
          className="mb-3 flex space-x-1 self-center rounded-lg bg-moderateBlue px-6 py-2 font-sans font-medium text-white hover:opacity-75 disabled:opacity-95"
          onClick={() => {
            fetchMore({
              variables: { after: endCursor },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                fetchMoreResult.comments.edges = [
                  ...fetchMoreResult.comments.edges,
                  ...prevResult.comments.edges,
                ];
                return fetchMoreResult;
              },
            });
          }}
        >
          LoadMore
        </button>
      ) : (
        <p className="mb-10 text-center font-medium text-darkBlue">
          You've Reached the end!
        </p>
      )}
      {comments?.edges.map(({ node: comment }, index) => (
        <Comment
          key={comment.id}
          comment={comment}
          user={user}
          isLast={comments.length === index + 1}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
