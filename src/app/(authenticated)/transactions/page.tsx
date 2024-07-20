import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Tabs defaultValue="expense" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="expense">
              <Link href="/transactions?type=expense">Expense</Link>
            </TabsTrigger>
            <TabsTrigger value="income">
              <Link href="/transactions?type=income">Income</Link>
            </TabsTrigger>
            <TabsTrigger value="transfer">
              <Link href="/transactions?type=transfer">Transfer</Link>
            </TabsTrigger>
            <TabsTrigger value="saving">
              <Link href="/transactions?type=saving">Saving</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button>Add Transaction</Button>
      </div>

      
    </div>
  );
}