import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const people = [
  { name: "latte", title: "لاته" },
  { name: "mocha", title: "موکا" },
  { name: "frappe", title: "فراپه" },
  { name: "macchiato", title: "ماچیاتو" },
];
import { useStore } from "../utils/index.js";

export default function Example() {
  const [selected, setSelected] = useState(people[0]);
  const { darkMode, toggleDarkMode } = useStore();
  return (
    <div className="fixed top-6 right-4 w-24 ">
      <Listbox
        value={selected}
        onChange={(e) => {
          toggleDarkMode(e.name);
          setSelected(e);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-mantle py-2 pl-10 pr-0  shadow-md focus:outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-yellow sm:text-sm">
            <span className="block truncate text-text">{selected.title}</span>
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-subtext1"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-mantle py-0 text-base shadow-lg ring-1 ring-crust ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-1 pl-1 pr-4 ${
                      active
                        ? "bg-rosewater/30 text-rosewater"
                        : "text-subtext1"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.title}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-rosewater/60">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
