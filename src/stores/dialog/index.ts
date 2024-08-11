import { create } from "zustand"

export interface ActionButton {
  label: string;
  type: "submit" | "button";
  disabled?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick?: () => void;
}

interface Data {
  title: string;
  description: string;
  actionButtons: ActionButton[]
}

type State = {
  isOpen: boolean;
  title: string;
  description: string;
  actionButtons: ActionButton[];
};

type Action = {
  setIsOpen: (isOpen: boolean) => void;
  setData: (data: Data) => void;
};

const useDialogStore = create<State & Action>(set => ({
  isOpen: false,
  title: "",
  description: "",
  actionButtons: [],

  setIsOpen(isOpen) {
    set({ isOpen })
  },
  setData(data) {
    set({ ...data })
  },
}));

export default useDialogStore;