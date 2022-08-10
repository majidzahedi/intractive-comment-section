import { clsx } from "clsx";

import { useStore } from "../../utils/index";
import DeleteIcon from "../../public/images/icon-delete.svg";
import EditIcon from "../../public/images/icon-edit.svg";
import ReplyIcon from "../../public/images/icon-reply.svg";

export const Crud = ({
  commentId,
  isCommentOwner,
  isAnonymous,
  settings,
  toggleEdit,
  toggleReply,
  visability = "hidden md:flex",
}) => {
  const { openModal, modal } = useStore();

  return (
    <div className={`${visability} space-x-5 rtl:space-x-reverse`}>
      <button
        className={clsx(
          "flex items-center space-x-1 font-medium text-latteMarron hover:opacity-70 disabled:opacity-50 rtl:flex-row-reverse dark:text-mochaMarron",
          isCommentOwner ? "block" : "hidden"
        )}
        onClick={() => openModal(commentId)}
        disabled={modal.isOpen}
      >
        <DeleteIcon />
        <p>حذف</p>
      </button>

      <button
        className={clsx(
          " flex items-center space-x-1 font-medium text-latteSapphire hover:opacity-50 rtl:flex-row-reverse  dark:text-mochaSapphire",
          isCommentOwner ? "block" : "hidden"
        )}
        onClick={toggleEdit}
      >
        <EditIcon />
        <p>{settings.isEditing ? "لغو" : "ویرایش"}</p>
      </button>

      <button
        disabled={isAnonymous}
        className={clsx(
          "flex items-center space-x-1 font-medium text-latteSapphire hover:opacity-70 disabled:opacity-70 rtl:flex-row-reverse dark:text-mochaSapphire",
          isCommentOwner ? "hidden" : "block"
        )}
        onClick={() => {
          toggleReply();
        }}
      >
        <ReplyIcon />
        <p>{settings.isReply ? "لغو" : "پاسخ"}</p>
      </button>
    </div>
  );
};
