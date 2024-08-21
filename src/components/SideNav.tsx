"use client";

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import EnumRoutes from "@/enums/EnumRoutes"
import { LayoutDashboard, PieChart, Tag, CreditCard, Goal, ArrowLeftRight } from 'lucide-react';
import Image from 'next/image';

interface IMenuItem {
  href: string;
  label: string;
  icon: JSX.Element;
}

const MAIN_MENU: IMenuItem[] = [
  {
    href: EnumRoutes.DASHBOARD,
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    href: EnumRoutes.TRANSACTIONS,
    label: 'Transactions',
    icon: <ArrowLeftRight className="h-5 w-5" />
  },
  {
    href: EnumRoutes.BUDGETS,
    label: 'Budgets',
    icon: <PieChart className="h-5 w-5" />
  },
  {
    href: EnumRoutes.CATEGORIES,
    label: 'Categories',
    icon: <Tag className="h-5 w-5" />
  },
  {
    href: EnumRoutes.WALLETS,
    label: 'Wallets',
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    href: EnumRoutes.GOALS,
    label: 'Goals',
    icon: <Goal className="h-5 w-5" />
  },
]

const SideNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 bg-gray-100 border-r border-gray-300">
      <div className="min-h-16 px-4">
        <div className="h-full border-b border-gray-300 flex gap-3 justify-center items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={40}
            height={40}
          />
          <h1 className=" text-xl font-bold">
            FinTrack
          </h1>
        </div>
      </div>

      <nav className="mt-3 flex-1 flex flex-col justify-between h-full">
        <ul className="px-4">
          {MAIN_MENU.map((menu) => (
            <li key={menu.href}>
              <Link
                href={menu.href}
                className={cn(
                  'flex items-center gap-3 p-2 mb-1 rounded-lg hover:bg-white hover:shadow-md transition-shadow duration-200',
                  pathname === menu.href ? 'bg-white shadow-md transition-shadow duration-200' : ''
                )}
              >
                <span className={cn(
                  pathname === menu.href ? 'text-blue-500' : 'text-gray-800',
                )}>
                  {menu.icon}
                </span>
                <span className={cn(
                  "text-sm text-gray-800",
                  pathname === menu.href ? 'font-semibold' : ''
                )}>
                  {menu.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default SideNav