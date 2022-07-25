import { useQuery, gql } from "@apollo/client";

import FormInput from "../components/FormInput";
import CommnetsList from "../components/CommnetsList";

const COMMENTS = gql`
  query comments {
    comments {
      id
      comment
      user {
        name
      }
      replies {
        id
        comment
        user {
          name
        }
        replies {
          id
          comment
          user {
            name
          }
        }
      }
    }
  }
`;

export default () => {
  const { data, loading, error } = useQuery(COMMENTS);

  const { comments } = !!data && data;

  return (
    <div className="conteiner bg-veryLightGray min-h-screen">
      <div className="flex space-y-1 flex-col-reverse items-center justify-start py-5 min-h-screen max-w-3xl w-full mx-auto px-4 md:px-0">
        <FormInput />
        <CommnetsList comments={comments} />
      </div>
    </div>
  );
};
