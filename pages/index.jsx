import { gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

import FormInput from "../components/FormInput";
import CommnetsList from "../components/CommnetsList";
import Head from "next/head";

const LOGIN = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

const anonymousUser = {
  user: {
    name: "Anonymous",
  },
};

export default () => {
  const [login] = useMutation(LOGIN);
  const [user, setUser] = useState({
    name: "juliusomo",
  });

  useEffect(() => {
    login({
      variables: {
        email: "juliusomo@email.com",
        password: "admin",
      },
      onCompleted: ({ logIn }) => {
        localStorage.setItem("token", logIn.token);
        setUser({
          id: logIn.user.id,
          name: logIn.user.name,
        });
      },
    });
  }, []);

  return (
    <div className="conteiner relative min-h-screen bg-crust transition-colors duration-300">
      <Head>
        <title>Comment Section</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="shortcut icon" href="/images/favicon.png" />
      </Head>
      <div className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col-reverse items-center justify-start space-y-1 py-5 px-4  transition-colors duration-300 md:px-0">
        {/* <Modal /> */}
        <FormInput user={user} />
        <CommnetsList user={user} />
      </div>
    </div>
  );
};
