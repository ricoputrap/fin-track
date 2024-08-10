"use client";

import React from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from './drawer';
import { Button } from './button';

interface Props {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isSubmitting: boolean;
  isDisabled: boolean;
  handleSubmit: () => void;
  render: () => JSX.Element;
}

const FormDrawer: React.FC<Props> = ({
  title,
  isOpen,
  setIsOpen,
  isSubmitting,
  isDisabled,
  handleSubmit,
  render
}) => {
  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className='h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none'>
        <DrawerHeader>
          <DrawerTitle>{ title }</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 mt-2 px-4 py-4">
          { render() }
        </div>

        <DrawerFooter className="mt-auto flex flex-row gap-4">
          <div className="flex-1">
            <Button
              type="submit"
              className="w-full"
              disabled={isDisabled}
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

export default FormDrawer