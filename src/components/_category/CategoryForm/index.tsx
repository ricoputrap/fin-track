import React from 'react'
import { Form } from '../../ui/form'
import { UseFormReturn } from 'react-hook-form';
import FormInputField from '../../ui/form-input-field';
import FormSelectField from '../../ui/form-select-field';
import { Category } from '@/hooks/category-form';

interface Props {
  form: UseFormReturn<Category>
}

const CategoryForm: React.FC<Props> = ({ form }) => {
  return (
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
  )
}

export default CategoryForm