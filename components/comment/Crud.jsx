import DeleteIcon from "../../public/images/icon-delete.svg";
import EditIcon from "../../public/images/icon-edit.svg";
import ReplyIcon from "../../public/images/icon-reply.svg";
import { useStore } from "../../utils/index";

export const Crud = ({
  commentId,
  isCommentOwner,
  isAnonymous,
  settings,
  toggleEdit,
  toggleReply,
  visability = "hidden md:flex",
}) => {
  const { openModal, isOpen } = useStore();

  return (
    <div className={`${visability} space-x-5 rtl:space-x-reverse  `}>
      <button
        className={`text-softRed flex items-center space-x-1 font-medium hover:opacity-70 disabled:opacity-90 rtl:flex-row-reverse  ${
          !isCommentOwner && "hidden"
        } ${isOpen ? "animate-pulse" : ""}`}
        onClick={() => openModal(commentId)}
        disabled={isOpen}
      >
        <DeleteIcon className="text-latteMarron dark:text-mochaMarron" />
        <p className="text-latteMarron dark:text-mochaMarron">حذف</p>
      </button>
      <button
        className={`text-moderateBlue flex items-center space-x-1 font-medium hover:opacity-70  rtl:flex-row-reverse  ${
          !isCommentOwner && "hidden"
        }`}
        onClick={toggleEdit}
      >
        <EditIcon className="text-latteSapphire dark:text-mochaSapphire" />
        <span className="text-latteSapphire dark:text-mochaSapphire">
          {settings.isEditing ? "لغو" : "ویرایش"}
        </span>
      </button>
      <button
        disabled={isAnonymous}
        className={`text-moderateBlue flex items-center space-x-1 font-medium hover:opacity-70 disabled:opacity-70 rtl:flex-row-reverse  ${
          isCommentOwner && "hidden"
        }`}
        onClick={() => {
          console.log("reply clicked");
          toggleReply();
        }}
      >
        <ReplyIcon className="text-latteSapphire dark:text-mochaSapphire" />
        <span className="text-latteSapphire dark:text-mochaSapphire">
          {settings.isReply ? "لغو" : "پاسخ"}
        </span>
      </button>
    </div>
  );
};
