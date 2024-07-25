"use client";

import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface Option {
  label: string;
  value: string;
}

interface Props<TData extends FieldValues> {
  control: Control<TData, any>;
  name: Path<TData>;
  label: string;
  options: Option[]
  placeholder?: string;
}

function FormSelectField<TData extends FieldValues>(props: Props<TData>) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{ props.label }</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={ props.placeholder } />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {props.options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormSelectField