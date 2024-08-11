"use client";

import React from 'react'
import { Button } from '../ui/button';
import useDrawerStore, { ActionButton } from '@/stores/drawer';
import useCategoryForm from '@/hooks/category-form';
import { DEFAULT_NUM } from '@/constants';
import CategoryForm from '../CategoryForm';

const AddCategory: React.FC = () => {
  const {
    setIsOpen,
    setData
  } = useDrawerStore();

  const { form, handleSubmit } = useCategoryForm({
    id: DEFAULT_NUM,
    name: "",
    type: "",
    close: () => { setIsOpen(false) }
  });

  const openForm = () => {
    const actionButtons: ActionButton[] = [
      {
        label: "Cancel",
        type: "button",
        disabled: false,
        variant: "outline",
        onClick: () => { setIsOpen(false) }
      },
      {
        label: "Submit",
        type: "submit",
        disabled: false,
        variant: "default",
        onClick: handleSubmit
      }
    ];

    setData({
      title: "Add Category",
      content: <CategoryForm form={form} />,
      actionButtons,
    });
    setIsOpen(true);
  }

  return (
    <>
      <Button onClick={openForm}>
        Add Category
      </Button>
    </>
  )
}

export default AddCategory