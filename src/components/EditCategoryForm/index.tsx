"use client";

import React, { useEffect } from 'react'
import useEditCategoryForm from './hooks';
import { Form } from '@/components/ui/form';
import FormInputField from '@/components/ui/form-input-field';
import FormSelectField from '@/components/ui/form-select-field';
import useCategoryStore from '@/stores/category';
import FormDrawer, { ActionButton } from '@/components/ui/form-drawer';

const EditCategoryForm: React.FC = () => {
  const { isOpen, setIsOpen, formData } = useCategoryStore();

  const { form, handleSubmit } = useEditCategoryForm({
    id: formData.id,
    name: formData.name,
    type: formData.type.toString(),
    close: () => setIsOpen(false),
  });

  // update the form default values based on the form data
  useEffect(() => {
    form.reset({
      name: formData.name,
      type: formData.type.toString()
    });
  }, [formData]);

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
      label: isSubmitting ? "Saving..." : "Save",
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
      title="Edit Category"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      actionButtons={actionButtons}
      render={() => (
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col justify-between"
          >
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

export default EditCategoryForm