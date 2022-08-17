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
            <div className=" fixed inset-0 bg-base/10 backdrop-blur-sm" />
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
                <Dialog.Panel className=" w-full max-w-sm transform overflow-hidden rounded-2xl bg-crust p-10 px-6  text-start align-middle  shadow-sm   transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-start  text-lg font-medium leading-6 text-text"
                  >
                    حذف پیام
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className=" text-subtext0 ">
                      آیا مطمئن هستید که می خواهید این پیام را حذف کنید؟ این
                      پیام حذف می شود و قابل برگشت نیست.{" "}
                    </p>
                  </div>

                  <div className="mt-8 flex w-full justify-between">
                    <button
                      type="button"
                      className={clsx(
                        "focus-visible:ring-offsbg-maroon inline-flex justify-center  rounded-xl border border-transparent bg-maroon px-8  py-2 text-lg font-medium text-crust hover:bg-maroon/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                        loading && "animate-pulse"
                      )}
                      onClick={handleDelete}
                    >
                      بله حذف کن
                    </button>
                    <button
                      type="button"
                      className=" inline-flex justify-center rounded-xl border  border-transparent bg-text px-8 py-2 text-lg font-medium text-crust hover:bg-text/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 "
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
