import create from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

export const useStore = create(
  subscribeWithSelector(
    persist(
      (set) => ({
        darkMode: false,
        toggleDarkMode: () => {
          set((state) => {
            state.darkMode = !state.darkMode;
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
