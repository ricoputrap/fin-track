"use client";

import React from 'react'
import { Form } from '../ui/form';
import FormDrawer, { ActionButton } from '../ui/form-drawer';
import FormInputField from '../ui/form-input-field';
import FormSelectField from '../ui/form-select-field';
import useAddCategoryForm from './hooks';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddCategoryForm: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const { form, handleSubmit } = useAddCategoryForm(() => setIsOpen(false));

  const isSubmitting = form.formState.isSubmitting;
  const actionButtons: ActionButton[] = [
    {
      label: "Cancel",
      type: "button",
      variant: "outline",
      onClick: () => {
        form.reset();
        setIsOpen(false);
      },
    },
    {
      label: isSubmitting ? "Submitting..." : "Submit",
      type: "submit",
      variant: "default",
      disabled: isSubmitting || !form.formState.isDirty,
      onClick: () => {
        handleSubmit();
      },
    }
  ]

  return (
    <FormDrawer
      title="Add Category"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      actionButtons={actionButtons}
      render={() => (
        <Form {...form}>
          <form className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <FormInputField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Entertainment"
              />

              <FormSelectField
                control={form.control}
                name="type"
                label="Type"
                options={[
                  { value: "1", label: "Expense" },
                  { value: "0", label: "Income" },
                ]}
                placeholder="Select a category type"
              />
            </div>
          </form>
        </Form>
      )}
    />
  )
}

export default AddCategoryForm