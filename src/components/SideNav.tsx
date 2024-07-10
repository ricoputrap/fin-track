"use client";

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import EnumRoutes from "@/enums/EnumRoutes"

const menus = [
  {
    href: EnumRoutes.DASHBOARD,
    label: 'Dashboard',
  },
  {
    href: EnumRoutes.TRANSACTIONS,
    label: 'Transactions',
  },
  {
    href: EnumRoutes.BUDGETS,
    label: 'Budgets',
  },
  {
    href: EnumRoutes.CATEGORIES,
    label: 'Categories',
  },
  {
    href: EnumRoutes.WALLETS,
    label: 'Wallets',
  },
  {
    href: EnumRoutes.GOALS,
    label: 'Goals',
  },
]

const SideNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col justify-between h-full md:px-4 sm:p-0">
      <ul>
        {menus.map((menu) => (
          <li key={menu.href}>
            <Link
              href={menu.href}
              className={cn(
                "flex items-center h-10 my-2 p-4 rounded-md",
                "text-white text-sm font-medium",
                {
                  "bg-[#343a40]": pathname === menu.href
                }
              )}>
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SideNav