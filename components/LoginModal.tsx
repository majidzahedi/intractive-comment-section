export default function LoginModal({ setIsOpen }) {
  return (
    <div className="flex bg-lightGray/70 items-center justify-center absolute top-0 left-0 min-h-screen w-full ">
      <div className=" grid bg-white rounded-lg grid-cols-2 grid-rows-2 p-4 gap-4">
        <button
          name="amyrobson"
          className="capitalize hover:bg-purple-200 flex  flex-col items-center "
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
