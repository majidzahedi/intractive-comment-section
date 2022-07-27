import moment from "moment";

export const UserSummery = ({
  isCommentOwner,
  commentUserName,
  createdAt,
  children,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img
          src={`/images/avatars/image-${commentUserName}.png`}
          alt=""
          className="w-7"
        />
        <p className="text-sm font-medium text-darkBlue">{commentUserName}</p>
        <p
          hidden={!isCommentOwner}
          className="rounded-sm bg-moderateBlue px-1 text-xs font-medium text-white"
        >
          you
        </p>
        <p className="text-sm text-lightGrayishBlue">
          {moment(createdAt).fromNow()}
        </p>
      </div>
      {children}
    </div>
  );
};
