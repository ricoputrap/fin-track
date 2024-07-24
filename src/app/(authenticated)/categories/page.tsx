import React, { Suspense } from "react";
import CategoryTable from "@/components/CategoryTable"
import AddCategory from "@/components/AddCategory";

export default function Page() {

  return (
    <div className="py-8">
      <div className="flex justify-end">
        <AddCategory />
      </div>

      <div className="mt-4">
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryTable />
        </Suspense>
      </div>

    </div>
  );
}