import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

import FormInput from "../components/FormInput";
import CommnetsList from "../components/CommnetsList";
import LoginModal from "../components/LoginModal";

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
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading, error } = useQuery(COMMENTS);

  const { comments } = !!data && data;

  return (
    <div className="conteiner bg-veryLightGray min-h-screen">
      {isOpen && <LoginModal setIsOpen={setIsOpen} />}
      <div className="flex space-y-1 flex-col-reverse items-center justify-start py-5 min-h-screen max-w-3xl w-full mx-auto px-4 md:px-0">
        <CommnetsList comments={comments} />
        <FormInput user={user} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};
