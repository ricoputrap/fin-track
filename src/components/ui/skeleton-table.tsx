import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonTable = () => {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <Skeleton className="h-10 max-w-sm rounded-xl" />
      <Skeleton className="min-h-[40vh] w-full rounded-xl" />

      <div className="ml-auto flex gap-6">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  )
}

export default SkeletonTable