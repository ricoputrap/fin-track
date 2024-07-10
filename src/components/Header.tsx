"use client";

import React from 'react'
import { usePathname } from 'next/navigation'

import { logout } from "@/server/auth";
import EnumRoutes from '@/enums/EnumRoutes';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const HEADER_TITLE = {
  [EnumRoutes.DASHBOARD]: 'Dashboard',
  [EnumRoutes.TRANSACTIONS]: 'Transactions',
  [EnumRoutes.BUDGETS]: 'Budgets',
  [EnumRoutes.CATEGORIES]: 'Categories',
  [EnumRoutes.WALLETS]: 'Wallets',
  [EnumRoutes.GOALS]: 'Goals',
  [EnumRoutes.LOGIN]: 'Login',
  [EnumRoutes.SIGNUP]: 'Create Account',
}

const Header: React.FC = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <header className="flex justify-between items-center p-4 h-14 border-b-2">
      <h2 className="text-xl font-bold">{HEADER_TITLE[pathname as EnumRoutes]}</h2>

      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>RP</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header