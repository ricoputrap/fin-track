"use client"

import React from 'react'
import DrawerContainer from '../ui/drawer-container';
import useCategoryStore, { EnumType } from '@/stores/category';
import EditCategoryForm from '../EditCategoryForm';

const CategoryDrawer = () => {
  const {
    isOpen, setIsOpen,
    type,
    title,
    content,
    actionButtons
  } = useCategoryStore();

  switch (type) {
    case EnumType.DETAIL:
      return (
        <DrawerContainer
          title={ title }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          render={() => content}
          actionButtons={actionButtons}
        />
      );

    case EnumType.ADD:
      return (
        <></>
      )

    case EnumType.EDIT:
      return <EditCategoryForm />;

    default:
      return <></>;
  }
}

export default CategoryDrawer