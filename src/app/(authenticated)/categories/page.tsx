import React, { Suspense } from "react";
import CategoryTable from "@/components/_category/CategoryTable"
import AddCategory from "@/components/_category/AddCategory";
import SkeletonTable from "@/components/ui/skeleton-table";

export default function Page() {

  return (
    <div>
      <div className="flex justify-end">
        <AddCategory />
      </div>

      <div>
        <Suspense fallback={<SkeletonTable />}>
          <CategoryTable />
        </Suspense>
      </div>
    </div>
  );
}