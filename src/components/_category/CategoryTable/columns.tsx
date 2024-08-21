"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { ICategory } from "@/db/schema";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ActionMenuItems from "./ActionMenuItems";
import { cn } from "@/lib/utils";


export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "name",
    size: 250,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "type",
    size: 50,
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ getValue }) => {
      const type = getValue() === 0 ? 'Income' : 'Expense';

      return (
        <div className="flex justify-center">
          <div className={cn(
            "text-white font-semibold px-4 py-2 text-xs rounded-full w-fit border-2 border-gray-300",
            type === 'Income' ? 'bg-green-500' : 'bg-yellow-500'
          )}>
            {type}
          </div>
        </div>
      )
    }
  },
  {
    id: "actions",
    size: 50,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <ActionMenuItems data={data} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }
]