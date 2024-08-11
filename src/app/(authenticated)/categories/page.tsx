import React, { Suspense } from "react";
import CategoryTable from "@/components/_category/CategoryTable"
import AddCategory from "@/components/_category/AddCategory";

export default function Page() {

  return (
    <div>
      <div className="flex justify-end">
        <AddCategory />
      </div>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryTable />
        </Suspense>
      </div>
    </div>
  );
}