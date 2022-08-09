import create from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

export const useStore = create(
  subscribeWithSelector(
    persist(
      (set) => ({
        darkMode: false,
        modal: {
          commentId: "",
          isOpen: false,
        },
        toggleDarkMode: () => {
          set((state) => {
            state.darkMode = !state.darkMode;
          });
        },
        openModal: (commentId) => {
          set((state) => {
            state.modal.commentId = commentId;
            state.modal.isOpen = true;
          });
        },
        closeModal: () => {
          set((state) => {
            state.modal.commentId = "";
            state.modal.isOpen = false;
          });
        },
      }),
      {
        name: "settings",
        getStorage: () => sessionStorage,
      }
    )
  )
);

useStore.subscribe(
  (state) => state.darkMode,
  (state) => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      document
        .querySelector("body")
        .setAttribute("class", state ? "dark" : "light");
    }
  },
  { fireImmediately: true }
);
