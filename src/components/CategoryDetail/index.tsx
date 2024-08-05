"use client"

import React from 'react'
import DrawerContainer from '../ui/drawer-container';
import useCategoryStore from '@/stores/category';

const CategoryDetail = () => {
  const {
    isOpen, setIsOpen,
    title,
    content,
    actionButtons
  } = useCategoryStore();

  return (
    <DrawerContainer
      title={ title }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      render={() => content}
      actionButtons={actionButtons}
    />
  )
}

export default CategoryDetail