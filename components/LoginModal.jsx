import { useMutation, gql } from "@apollo/client";

const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export default function LoginModal({ setIsOpen }) {
  const [login] = useMutation(LOGIN);

  function handleLogin(e) {
    const payload = {
      email: `${e.target.name}@email.com`,
      password: "admin",
    };
    login({
      variables: payload,
      async onCompleted(data) {
        const token = await data.logIn.token;
        localStorage.setItem("token", token);
        setIsOpen(false);
      },
      update(cashe, { data: { logIn } }) {
        cashe.modify({
          fields: {
            user() {
              const newUser = cashe.writeFragment({
                data: logIn.user,
                fragment: gql`
                  fragment UpdatedUser on User {
                    id
                    email
                    name
                  }
                `,
              });
              return newUser;
            },
          },
        });
      },
    });
  }

  return (
    <div className="flex bg-lightGray/70 items-center justify-center absolute top-0 left-0 min-h-screen w-full ">
      <div className=" grid bg-white rounded-lg grid-cols-2 grid-rows-2 p-4 gap-4">
        <button
          name="amyrobson"
          className="capitalize hover:bg-purple-200 flex  flex-col items-center "
          onClick={handleLogin}
        >
          <img src="/images/avatars/image-amyrobson.png" alt="" />
          amyrobson
        </button>
        <button
          className="capitalize hover:bg-purple-200 flex  flex-col items-center "
          onClick={handleLogin}
          name="juliusomo"
        >
          <img src="/images/avatars/image-juliusomo.png" alt="" />
          juliusomo
        </button>
        <button
          className="capitalize hover:bg-purple-200 flex  flex-col items-center "
          onClick={handleLogin}
          name="maxblagun"
        >
          <img src="/images/avatars/image-maxblagun.png" alt="" />
          maxblagun
        </button>
        <button
          className="hover:bg-purple-200 flex  flex-col items-center capitalize"
          onClick={handleLogin}
          name="ramsesmiron"
        >
          <img src="/images/avatars/image-ramsesmiron.png" alt="" />
          ramsesmiron
        </button>
      </div>
    </div>
  );
}