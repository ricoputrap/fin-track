import React from "react";
import validateRequest from "@/lib/validate-request";
import CategoryAPI from "@/server/categories";
import DataTable from "@/components/ui/data-table"
import { columns } from "./columns";

const CategoryTable = async () => {
  const { user } = await validateRequest();
  const { success, data, error } = await CategoryAPI.getAll(user?.id || "");

  if (!success) {
    return (
      <div>{error}</div>
    )
  }

  return (
    <DataTable columns={columns} data={data} />
  )
}

export default CategoryTable;