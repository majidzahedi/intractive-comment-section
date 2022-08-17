import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useStore } from "../utils/index";

export default function MenuComponent({ user }) {
  const { toggleDarkMode } = useStore();
  return (
    <Menu as="div" className="relative inline-block cursor-pointer text-left">
      <Menu.Button as="div" className="ml-2">
        <img
          src={`/images/avatars/image-${user?.name}.png`}
          alt="profile"
          className="ml-2 w-10"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -top-1 right-12 rounded-md bg-sapphire/10 ring-2   ring-overlay2 ring-opacity-5  backdrop-blur-sm focus:outline-none md:right-0 md:-top-14 md:origin-center">
          <div className="flex px-1 py-1  ">
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`group flex w-full cursor-pointer items-center rounded-md px-2 py-2 hover:bg-sapphire/50`}
                  onClick={(e) => toggleDarkMode("mocha")}
                >
                  <p className="font-bold text-text">موکا</p>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`flex w-full cursor-pointer items-center rounded-md px-2 py-2 hover:bg-sapphire/50`}
                  onClick={(e) => toggleDarkMode("latte")}
                >
                  <p className="font-bold text-text">لاته</p>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`group flex w-full cursor-pointer items-center rounded-md px-2 py-2 hover:bg-sapphire/30`}
                  onClick={(e) => toggleDarkMode("frappe")}
                >
                  <p className="font-bold text-text">فراپه</p>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`group flex w-full cursor-pointer items-center rounded-md  px-2 py-2 hover:bg-sapphire/30`}
                  onClick={(e) => toggleDarkMode("macchiato")}
                >
                  <p className="font-bold text-text">ماکیاتو</p>
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
