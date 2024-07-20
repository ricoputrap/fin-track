"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ICategory } from "../../db/schema";

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => {
      return getValue() === 0 ? 'Income' : 'Expense';
    }
  }
]