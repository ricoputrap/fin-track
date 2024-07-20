import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import CategoryTable from "@/components/CategoryTable"

export default function Page() {

  return (
    <div className="py-8">
      <div className="flex justify-end">
        <Button>Add Category</Button>
      </div>

      <div className="mt-4">
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryTable />
        </Suspense>
      </div>

    </div>
  );
}