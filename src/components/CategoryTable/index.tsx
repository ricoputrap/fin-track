import React from "react";
import DataTable from "@/components/ui/data-table"
import { columns } from "./columns";
import { getAllCategories } from "@/server/categories"

const CategoryTable = async () => {
  const result = await getAllCategories();

  return (
    <DataTable
      columns={columns}
      data={result}
      search={{
        name: "name",
        placeholder: "Search category..."
      }}
    />
  )
}

export default CategoryTable;