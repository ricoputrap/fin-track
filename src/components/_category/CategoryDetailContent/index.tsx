import { ICategory } from '@/db/schema'
import React from 'react'

interface Props {
  data: ICategory;
}

const CategoryDetailContent: React.FC<Props> = ({ data }) => {
  const type = data.type == 1 ? "Income" : "Expense";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-sm font-semibold">Name</h1>
        <p className="bg-gray-50 rounded-sm p-2">{ data.name }</p>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-sm font-semibold">Type</h1>
        <p className="bg-gray-50 rounded-sm p-2">{ type }</p>
      </div>
    </div>
  )
}

export default CategoryDetailContent