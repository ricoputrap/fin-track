"use client"

import React from "react";
import useCategoryStore from "../../../stores/category";
import { ICategory } from "@/db/schema";
import { ActionButton } from "@/components/ui/drawer-container";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import CategoryDetailContent from "@/components/CategoryDetailContent";

interface Props {
  data: ICategory;
}

const ActionMenuItems: React.FC<Props> = ({ data }) => {
  const {
    setIsOpen,
    setTitle,
    setContent,
    setActionButtons
  } = useCategoryStore();

  const openDetail = () => {
    const title = "View Category";
    const actionButtons: ActionButton[] = [
      {
        label: "Cancel",
        type: "button",
        disabled: false,
        variant: "outline",
        onClick: () => { setIsOpen(false) }
      },
      {
        label: "Edit",
        type: "button",
        disabled: false,
        variant: "default",
        onClick: () => { console.log("EDIT") }
      },
      {
        label: "Delete",
        type: "button",
        disabled: false,
        variant: "destructive",
        onClick: () => { console.log("DELETE") }
      }
    ]

    setTitle(title);
    setContent(<CategoryDetailContent data={data} />);
    setActionButtons(actionButtons);
    setIsOpen(true);
  }

  return (
    <>
      <DropdownMenuItem onClick={openDetail}>
        View category
      </DropdownMenuItem>
      <DropdownMenuItem>Edit category</DropdownMenuItem>
      <DropdownMenuItem>Delete category</DropdownMenuItem>
    </>
  )
}

export default ActionMenuItems;