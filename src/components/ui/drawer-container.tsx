"use client";

import React from 'react'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from './drawer';
import { Button } from './button';
import useDrawerStore from '../../stores/drawer';

export interface ActionButton {
  label: string;
  type: "submit" | "button";
  disabled?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick?: () => void;
}

interface Props {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  render: () => JSX.Element;
  actionButtons?: ActionButton[];
}

const DrawerContainer: React.FC = () => {
  const {
    isOpen, setIsOpen,
    title,
    content,
    actionButtons
  } = useDrawerStore();

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className='h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none'>
        <DrawerHeader className="border-b-2">
          <DrawerTitle>{ title }</DrawerTitle>
        </DrawerHeader>
  
        <div className="flex-1 mt-2 px-4 py-4">
          { content }
        </div>
  
        <DrawerFooter className="mt-auto flex flex-row gap-4">
          {actionButtons.map((actionButton) => (
            <div key={actionButton.label} className="flex-1">
              <Button
                type={actionButton.type}
                className="w-full"
                disabled={actionButton.disabled}
                onClick={actionButton.onClick}
                variant={actionButton.variant}
              >
                {actionButton.label}
              </Button>
            </div>
          ))}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerContainer;