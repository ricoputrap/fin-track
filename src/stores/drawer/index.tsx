import React from "react";
import { create } from "zustand"

export interface ActionButton {
  label: string;
  type: "submit" | "button";
  disabled?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick?: () => void;
}

type State = {
  isOpen: boolean;
  title: string;
  content: JSX.Element;
  actionButtons: ActionButton[];
}

type Action = {
  setIsOpen: (isOpen: boolean) => void;
  setData: (data: Omit<State, "isOpen">) => void;
}

const useDrawerStore = create<State & Action>((set) => ({
  isOpen: false,
  title: "",
  content: <></>,
  actionButtons: [],

  setIsOpen: (isOpen) => set({ isOpen }),
  setData(data) {
    set({ ...data })
  },
}));

export default useDrawerStore;