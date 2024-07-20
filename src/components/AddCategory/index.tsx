import React from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"

const AddCategory = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Add Category</Button>
      </DrawerTrigger>

      <DrawerContent className='h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none'>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className="flex flex-row">
          <Button className="flex-1">Submit</Button>
          <DrawerClose className="flex-1">
            <Button variant="outline" className="w-full">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
export default AddCategory;