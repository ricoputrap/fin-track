import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';

interface Props<TData extends FieldValues> {
  control: Control<TData, any>;
  name: Path<TData>;
  label: string;
  placeholder?: string;
}

function FormInputField<TData extends FieldValues>(props: Props<TData>) {
  return (
    <FormField
      control={ props.control }
      name={ props.name }
      render={({ field }) => (
        <FormItem>
          <FormLabel>{ props.label }</FormLabel>
          <FormControl>
            <Input placeholder={ props.placeholder } {...field} required />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInputField;