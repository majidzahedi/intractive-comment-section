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
      onCompleted(data) {
        const token = data.logIn.token;
        localStorage.setItem("token", token);
        setIsOpen(false);
      },
      refetchQueries: ["comments"],
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
    <div className="fixed inset-0 flex min-h-screen  w-full items-center justify-center bg-lightGray/70">
      <div className=" grid grid-cols-2 grid-rows-2 gap-4 rounded-lg bg-white p-4">
        <div className="flex flex-col  items-center capitalize ">
          <img src="/images/avatars/image-amyrobson.png" alt="" />
          <button name="amyrobson" onClick={handleLogin}>
            amyrobson
          </button>
        </div>
        <div className="flex flex-col  items-center capitalize ">
          <img src="/images/avatars/image-juliusomo.png" alt="" aria-hidden />
          <button onClick={handleLogin} name="juliusomo">
            juliusomo
          </button>
        </div>
        <div className="flex flex-col  items-center capitalize ">
          <img src="/images/avatars/image-maxblagun.png" alt="" />
          <button onClick={handleLogin} name="maxblagun">
            maxblagun
          </button>
        </div>
        <div className="flex flex-col items-center">
          <img src="/images/avatars/image-ramsesmiron.png" alt="" />
          <button
            className="capitalize"
            onClick={handleLogin}
            name="ramsesmiron"
          >
            ramsesmiron
          </button>
        </div>
      </div>
    </div>
  );
}
