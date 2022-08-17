import create from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

export const useStore = create(
  subscribeWithSelector(
    persist(
      (set) => ({
        darkMode: "latte",
        modal: {
          commentId: "",
          isOpen: false,
        },
        toggleDarkMode: (theme) => {
          set((state) => {
            state.darkMode = theme;
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
        getStorage: () => localStorage,
      }
    )
  )
);

useStore.subscribe(
  (state) => state.darkMode,
  (state) => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      console.log("theme", state);
      document.body.classList = state;
      // document.querySelector("body").setAttribute("class", state.darkMode);
    }
  },
  { fireImmediately: true }
);
