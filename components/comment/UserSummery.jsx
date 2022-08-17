import moment from "moment";
import "moment/locale/fa";

export const UserSummery = ({
  isCommentOwner,
  commentUserName,
  createdAt,
  children,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src={`/images/avatars/image-${commentUserName}.png`}
          alt=""
          className="w-7"
        />
        <p className="text-sm font-medium text-subtext1 ">{commentUserName}</p>
        <p
          hidden={!isCommentOwner}
          className="rounded-sm bg-sapphire px-1 text-xs font-medium text-crust"
        >
          شما
        </p>
        <p className="text-sm text-subtext0 ">{moment(createdAt).fromNow()}</p>
      </div>
      {children}
    </div>
  );
};
