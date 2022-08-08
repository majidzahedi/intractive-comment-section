import { useEffect, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import Comment from "./comment";

const COMMENTS = gql`
  query Comments($last: Int, $before: String) {
    comments(last: $last, before: $before) {
      pageInfo {
        startCursor
        hasPreviousPage
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
    variables: { last: 5 },
  });

  const bottomRef = useRef(null);
  const currentRef = useRef(null);

  const { comments } = !!data && data;
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (comments?.edges?.length > 5) {
      console.log("currnet");
      currentRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  if (loading) {
    return (
      <div className=" relative -top-20 right-0 h-10 w-10 animate-spin items-center justify-center rounded-full border-2 border-mochaCrust border-b-transparent dark:border-latteBase dark:border-b-transparent"></div>
    );
  }

  const { startCursor, hasPreviousPage } = data.comments.pageInfo;

  return (
    <div className="flex max-h-[75vh] w-full flex-col   space-y-1 overflow-y-scroll py-2 scrollbar-hide md:max-h-[83vh]">
      <div ref={currentRef} />
      {hasPreviousPage ? (
        <button
          className="bg-moderateBlue mb-3 flex space-x-1 self-center rounded-lg px-6 py-2 font-sans font-medium text-white hover:opacity-75 disabled:opacity-95 rtl:space-x-reverse"
          onClick={() => {
            fetchMore({
              variables: { before: startCursor },
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
        <p className="text-darkBlue pb-5 text-center font-medium dark:text-mochaSubText0">
          به آخر رسیدید ...
        </p>
      )}
      {comments?.edges.map(({ node: comment, cursor }, index) => (
        <Comment
          key={cursor}
          comment={comment}
          user={user}
          isLast={comments.length === index + 1}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
