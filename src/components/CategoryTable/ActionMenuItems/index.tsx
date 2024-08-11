"use client"

import React from "react";
import useCategoryStore, { EnumType } from "../../../stores/category";
import { ICategory } from "@/db/schema";
import { ActionButton } from "@/components/ui/drawer-container";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import CategoryDetailContent from "@/components/CategoryDetailContent";
import useDialogStore from "@/stores/dialog";
import deleteCategory from "@/server/categories/delete";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  data: ICategory;
}

const ActionMenuItems: React.FC<Props> = ({ data }) => {
  const { toast } = useToast();

  const {
    setIsOpen,
    setType,
    setFormData,
    setTitle,
    setContent,
    setActionButtons
  } = useCategoryStore();

  const {
    setIsOpen: setIsDialogOpen,
    setData: setDialogData
  } = useDialogStore();

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
        onClick: openEdit
      },
      {
        label: "Delete",
        type: "button",
        disabled: false,
        variant: "destructive",
        onClick: openDeleteConfirmationDialog
      }
    ]

    setType(EnumType.DETAIL);
    setTitle(title);
    setContent(<CategoryDetailContent data={data} />);
    setActionButtons(actionButtons);
    setIsOpen(true);
  }

  const openEdit = () => {
    setFormData({
      id: data.id,
      name: data.name,
      type: data.type.toString()
    })
    setType(EnumType.EDIT);
    setIsOpen(true);
  }

  const deleteItem = async () => {
    await deleteCategory(data.id);

    toast({
      title: "Success!",
      description: "Category deleted."
    });

    setIsDialogOpen(false);
    setIsOpen(false);
  }

  const openDeleteConfirmationDialog = () => {
    setDialogData({
      title: "Delete Category",
      description: "Are you sure you want to delete this category?",
      actionButtons: [
        {
          label: "Cancel",
          type: "button",
          disabled: false,
          variant: "outline",
          onClick: () => { setIsDialogOpen(false) }
        },
        {
          label: "Delete",
          type: "button",
          disabled: false,
          variant: "destructive",
          onClick: deleteItem
        }
      ]
    });

    setIsDialogOpen(true)
  }

  return (
    <>
      <DropdownMenuItem onClick={openDetail}>
        View category
      </DropdownMenuItem>
      <DropdownMenuItem onClick={openEdit}>
        Edit category
      </DropdownMenuItem>
      <DropdownMenuItem onClick={openDeleteConfirmationDialog}>
        Delete category
      </DropdownMenuItem>
    </>
  )
}

export default ActionMenuItems;