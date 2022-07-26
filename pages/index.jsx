import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

import FormInput from "../components/FormInput";
import CommnetsList from "../components/CommnetsList";
import LoginModal from "../components/LoginModal";
import Head from "next/head";

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

const USER = gql`
  query User {
    user {
      id
      name
      email
    }
  }
`;

const anonymousUser = {
  user: {
    name: "Anonymous",
  },
};

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading, error } = useQuery(COMMENTS);
  const { data: userData } = useQuery(USER);

  const { comments } = !!data && data;
  const { user } = !!userData ? userData : anonymousUser;

  return (
    <div className="conteiner min-h-screen bg-veryLightGray">
      <Head>
        <title>Comment Section</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/images/favicon.png" />
      </Head>
      {isOpen && <LoginModal setIsOpen={setIsOpen} />}
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col-reverse items-center justify-start space-y-1 py-5 px-4 md:px-0">
        <FormInput user={user} setIsOpen={setIsOpen} />
        <CommnetsList user={user} comments={comments} />
      </div>
    </div>
  );
};
