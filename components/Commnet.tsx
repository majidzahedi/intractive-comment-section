export default function Comment({ comment }) {
  return (
    <>
      <div className="flex w-full p-4 space-x-4 items-start bg-white rounded-lg">
        <div className="flex flex-col rounded-lg p-4 items-center space-y-1 bg-veryLightGray">
          <span className="text-grayishBlue font-bold">+</span>
          <span className="text-moderateBlue font-bold">4</span>
          <span className="text-grayishBlue font-bold">-</span>
        </div>
        <div className="flex flex-col w-full space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3 items-center">
              <img
                src={`/images/avatars/image-${comment.user.name}.png`}
                alt=""
                className="w-7"
              />
              <p className="font-medium text-darkBlue text-sm">
                {comment.user.name}
              </p>
              <p
                hidden={comment.user.name !== "juliusomo"}
                className="text-white bg-moderateBlue px-1 text-xs font-medium rounded-sm"
              >
                you
              </p>
              <p className="text-lightGrayishBlue text-sm">1 Week ago</p>
            </div>
            <div className="flex space-x-5">
              <button
                className={`flex items-center space-x-1 hover:opacity-70 text-softRed font-medium ${
                  comment.user.name !== "juliusomo" && "hidden"
                }`}
              >
                <img src="/images/icon-delete.svg" alt="" />
                <p>Delete</p>
              </button>
              <button
                className={`flex items-center space-x-1 hover:opacity-70 text-moderateBlue font-medium ${
                  comment.user.name !== "juliusomo" && "hidden"
                }`}
              >
                <img src="/images/icon-edit.svg" alt="" />
                <span>Edit</span>
              </button>
              <button
                className={`flex items-center space-x-1 hover:opacity-70 text-moderateBlue font-medium ${
                  comment.user.name === "juliusomo" && "hidden"
                }`}
              >
                <img src="/images/icon-reply.svg" alt="" />
                <span>Reply</span>
              </button>
            </div>
          </div>
          <p className="text-base text-grayishBlue">{comment.comment}</p>
        </div>
      </div>
      <div className="flex ">
        <div className="w-1  mx-4 md:mx-12  rounded-full bg-grayishBlue"></div>
        <div className="flex space-y-2 flex-col w-full ">
          {comment.replies &&
            comment.replies.map((reply) => <Comment comment={reply} />)}
        </div>
      </div>
    </>
  );
}
