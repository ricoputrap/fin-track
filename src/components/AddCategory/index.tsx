"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categorySchema } from "@/schemas";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"
import { addCategory } from "@/server/categories";

type Category = z.infer<typeof categorySchema>;

const AddCategory: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { toast } = useToast()

  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: ""
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: Category) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const result = await addCategory(data);

    // show an error toast if the request fails
    if (!result.success) {
      toast({
        title: "Error!",
        description: result.error.message || "Failed to add new category.",
        variant: "destructive"
      });

      return;
    }

    // close the drawer and reset the form
    setIsOpen(false);
    form.reset();

    // show a success toast
    toast({
      title: "Success!",
      description: "New category added.",
    })
  }

  const handleSubmit = () => {
    form.handleSubmit(onSubmit)();
  }

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>Add Category</Button>
      </DrawerTrigger>

      <DrawerContent className='h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none'>
        <DrawerHeader>
          <DrawerTitle>Add Category</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 mt-2 px-4 py-4">
          <Form {...form}>
            <form className="h-full flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Entertainment" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Expense</SelectItem>
                          <SelectItem value="0">Income</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        <DrawerFooter className="mt-auto flex flex-row gap-4">
          <div className="flex-1">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
          <div className="flex-1">
            <DrawerClose asChild>
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
export default AddCategory;