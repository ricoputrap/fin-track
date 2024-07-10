"use client";

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { logout } from '@/server/auth';

const menus = [
  {
    href: '/dashboard',
    label: 'Dashboard',
  },
  {
    href: '/transactions',
    label: 'Transactions',
  },
  {
    href: '/budgets',
    label: 'Budgets',
  },
  {
    href: '/categories',
    label: 'Categories',
  },
  {
    href: '/wallets',
    label: 'Wallets',
  },
  {
    href: '/goals',
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