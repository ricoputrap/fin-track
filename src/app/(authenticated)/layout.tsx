import React from "react";
import Image from "next/image";
import SideNav from "../../components/SideNav";
import Header from "@/components/Header"
import ConfirmationDialog from "@/components/ui/confirmation-dialog";

export default function AuthenticatedLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex h-screen bg-[#212529] p-4 pl-0">
        <aside className="flex flex-col w-64">
          <div className="flex gap-2 justify-center items-center p-4">
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-white text-2xl font-bold">
              FinTrack
            </h1>
          </div>
          <div className="flex-1">
            <SideNav />
          </div>
        </aside>
        <div className="flex-1 flex flex-col bg-white rounded-sm">
          <Header />
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </div>

      <ConfirmationDialog />
    </>
  )
}