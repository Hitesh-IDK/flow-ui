"use client";

import React, {
  useState,
  createContext,
  Context,
  Dispatch,
  PropsWithChildren,
  useContext,
} from "react";

export interface States {
  isActive: boolean;
  setIsActive: Dispatch<boolean>;
}

export interface Dropdowns {
  allStates: States[];
  toggleDropdown(
    state: boolean,
    setIsActive: Dispatch<boolean>,
    dropdownStates: States[]
  ): void;
}

const toggleDropdown = (
  state: boolean,
  setIsActive: Dispatch<boolean>,
  dropdownStates: States[]
): void => {
  if (state) {
    dropdownStates.forEach(({ isActive, setIsActive }: States) => {
      if (isActive) setIsActive(false);
    });

    setIsActive(state);
  } else setIsActive(state);
};

export const DropdownCtx: Context<Dropdowns> = createContext({
  allStates: [{ isActive: false, setIsActive: function () {} }],
  toggleDropdown: toggleDropdown,
} as Dropdowns);

export function DropdownProvider(props: PropsWithChildren) {
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);

  //All dropdown states to track
  const dropdownStates: States[] = [
    { isActive: isActive1, setIsActive: setIsActive1 },
    { isActive: isActive2, setIsActive: setIsActive2 },
    { isActive: isActive3, setIsActive: setIsActive3 },
  ];
  return (
    <DropdownCtx.Provider value={{ allStates: dropdownStates, toggleDropdown }}>
      {props.children}
    </DropdownCtx.Provider>
  );
}
