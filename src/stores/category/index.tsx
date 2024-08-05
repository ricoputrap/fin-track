import React from "react";
import { ActionButton } from "@/components/ui/drawer-container";
import { create } from "zustand"

type State = {
  isOpen: boolean;
  title: string;
  content: JSX.Element;
  actionButtons: ActionButton[];
}

type Action = {
  setIsOpen: (isOpen: boolean) => void;
  setTitle: (title: string) => void;
  setContent: (content: JSX.Element) => void;
  setActionButtons: (actionButtons: ActionButton[]) => void;
}

const useCategoryStore = create<State & Action>((set) => ({
  isOpen: false,
  title: "",
  content: <></>,
  actionButtons: [],

  setIsOpen: (isOpen) => set({ isOpen }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setActionButtons: (actionButtons) => set({ actionButtons }),
}));

export default useCategoryStore;