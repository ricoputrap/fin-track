"use client"

import React from "react";
import { ICategory } from "@/db/schema";
import { ActionButton } from "@/components/ui/drawer-container";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import CategoryDetailContent from "@/components/CategoryDetailContent";
import useDialogStore from "@/stores/dialog";
import deleteCategory from "@/server/categories/delete";
import { useToast } from "@/components/ui/use-toast";
import useDrawerStore from "@/stores/drawer";
import useCategoryForm from "@/hooks/category-form";
import CategoryForm from "@/components/CategoryForm";

interface Props {
  data: ICategory;
}

const ActionMenuItems: React.FC<Props> = ({ data }) => {
  const { toast } = useToast();

  const {
    setIsOpen: setIsDrawerOpen,
    setData: setDrawerData
  } = useDrawerStore();

  const { form, handleSubmit } = useCategoryForm({
    id: data.id,
    name: data.name,
    type: data.type.toString(),
    close: () => { setIsDrawerOpen(false) }
  })

  const {
    setIsOpen: setIsDialogOpen,
    setData: setDialogData
  } = useDialogStore();

  const openDetail = () => {
    const actionButtons: ActionButton[] = [
      {
        label: "Cancel",
        type: "button",
        disabled: false,
        variant: "outline",
        onClick: () => { setIsDrawerOpen(false) }
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
    setDrawerData({
      title: "View Category",
      content: <CategoryDetailContent data={data} />,
      actionButtons
    })
    setIsDrawerOpen(true);
  }

  const openEdit = () => {
    const actionButtons: ActionButton[] = [
      {
        label: "Cancel",
        type: "button",
        disabled: false,
        variant: "outline",
        onClick: () => { setIsDrawerOpen(false) }
      },
      {
        label: "Save",
        type: "submit",
        disabled: false,
        variant: "default",
        onClick: handleSubmit
      }
    ];

    setDrawerData({
      title: "Edit Category",
      content: <CategoryForm form={form} />,
      actionButtons
    });
    setIsDrawerOpen(true);
  }

  const deleteItem = async () => {
    await deleteCategory(data.id);

    toast({
      title: "Success!",
      description: "Category deleted."
    });

    setIsDialogOpen(false);
    setIsDrawerOpen(false);
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