import { ICategory } from '@/db/schema'
import React from 'react'
import { Separator } from '../ui/separator';

interface Props {
  data: ICategory;
}

const CategoryDetailContent: React.FC<Props> = ({ data }) => {
  const type = data.type == 1 ? "Income" : "Expense";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-sm font-semibold">Name</h1>
          <Separator className="mt-1" />
        </div>
        <p>{ data.name }</p>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-sm font-semibold">Type</h1>
          <Separator className="mt-1" />
        </div>
        <p>{ type }</p>
      </div>
    </div>
  )
}

export default CategoryDetailContent