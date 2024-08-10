import React from "react";
import { ActionButton } from "@/components/ui/drawer-container";
import { create } from "zustand"

export enum EnumType {
  DETAIL = "detail",
  ADD = "add",
  EDIT = "edit"
}

export interface FormData {
  id: number;
  name: string;
  type: string;
}

type State = {
  isOpen: boolean;
  type: EnumType;
  formData: FormData;
  title: string;
  content: JSX.Element;
  actionButtons: ActionButton[];
}

type Action = {
  setIsOpen: (isOpen: boolean) => void;
  setType: (type: EnumType) => void;
  setFormData: (formData: FormData) => void;
  setTitle: (title: string) => void;
  setContent: (content: JSX.Element) => void;
  setActionButtons: (actionButtons: ActionButton[]) => void;
}

const useCategoryStore = create<State & Action>((set) => ({
  isOpen: false,
  type: EnumType.DETAIL,
  formData: {
    id: 0,
    name: "",
    type: "",
  },
  title: "",
  content: <></>,
  actionButtons: [],

  setIsOpen: (isOpen) => set({ isOpen }),
  setType: (type) => set({ type }),
  setFormData: (formData) => set({ formData }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setActionButtons: (actionButtons) => set({ actionButtons }),
}));

export default useCategoryStore;