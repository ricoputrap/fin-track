import React from "react";
import Image from "next/image";
import SideNav from "../../components/SideNav";
import Header from "@/components/Header"
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import DrawerContainer from "@/components/ui/drawer-container";

export default function AuthenticatedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex h-screen">
        <SideNav />
        <div className="flex-1 flex flex-col bg-white rounded-sm">
          <Header />
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </div>

      <DrawerContainer />
      <ConfirmationDialog />
    </>
  )
}