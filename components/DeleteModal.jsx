import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { gql, useMutation } from "@apollo/client";
import clsx from "clsx";
import { useStore } from "../utils/index";

const DELETE = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      id
    }
  }
`;

export default function DeleteModal({}) {
  // let [isOpen, setIsOpen] = useState(true);
  const { modal, openModal, closeModal } = useStore();
  const { isOpen, commentId } = modal;
  const [deleteComment, { loading }] = useMutation(DELETE);

  // function closeModal() {
  //   setIsOpen(false);
  // }

  function handleDelete() {
    deleteComment({
      variables: { commentId },
      onCompleted: () => {
        closeModal();
      },
      update(cache, _, { variables: { commentId } }) {
        cache.modify({
          fields: {
            comments(existingComments) {
              console.log(commentId);
              const newComments = existingComments.edges.filter(
                (comment) => comment.cursor !== commentId
              );

              const startCursor = newComments[0].cursor;

              console.log(existingComments);
              return {
                ...existingComments,
                edges: [...newComments],
                startCursor,
              };
            },
          },
        });
      },
      onQueryUpdated(observableQuery) {
        return observableQuery.refetch();
      },
    });
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto" dir="rtl">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-10 px-6 text-start  align-middle shadow-xl transition-all dark:bg-mochaBase">
                  <Dialog.Title
                    as="h3"
                    className="text-start text-lg font-medium leading-6 text-latteText dark:text-mochaText"
                  >
                    حذف پیام
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className=" text-latteSubText0 dark:text-mochaSubText0">
                      آیا مطمئن هستید که می خواهید این پیام را حذف کنید؟ این
                      پیام حذف می شود و قابل برگشت نیست.{" "}
                    </p>
                  </div>

                  <div className="mt-8 flex w-full justify-between">
                    <button
                      type="button"
                      className={clsx(
                        "inline-flex justify-center rounded-xl border border-transparent  bg-latteMarron px-8 py-2 text-lg font-medium text-white  hover:bg-latteMarron/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-latteMarron dark:bg-mochaMarron dark:text-mochaBase dark:hover:bg-mochaMarron/80",
                        loading && "animate-pulse"
                      )}
                      onClick={handleDelete}
                    >
                      بله حذف کن
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-xl border border-transparent  bg-gray-500 px-8 py-2 text-lg font-medium text-white hover:bg-gray-500/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 dark:bg-gray-300 dark:text-mochaBase dark:hover:bg-gray-300/80"
                      onClick={closeModal}
                    >
                      خیر لغو کن
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
