"use client";

import React, { useState } from 'react'
import AddCategoryForm from './add-category-form';
import { Button } from '../ui/button';

const AddCategory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Add Category
      </Button>
      <AddCategoryForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default AddCategory