'use client';

import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import useDialogStore from '@/stores/dialog';
import { Button } from '@/components/ui/button';

const ConfirmationDialog: React.FC = () => {
  const {
    isOpen,
    title,
    description,
    actionButtons
  } = useDialogStore();

  return (
    <Dialog open={isOpen}>
      <DialogContent className='w-[400px]'>
        <DialogHeader>
          <DialogTitle className="text-center mb-2">
            { title }
          </DialogTitle>
          <DialogDescription className="text-center">
            { description }
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-3">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default ConfirmationDialog