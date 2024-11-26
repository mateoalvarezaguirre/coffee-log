import Link from 'next/link';
import NavLinks from '@/app/ui/components/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import React from "react";
import {logout} from "@/app/store/slices/auth/authSlice";
import {useAppDispatch} from "@/app/store/store";
import {redirect} from "next/navigation";

export default function SideNav() {

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());

        redirect('/');
    }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 rounded-xl box-border">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40"
        href="/"
      >
        <div className="bg-gray-50 rounded-lg w-full h-auto flex gap-2 items-center">
            <Image
                src="/logo.png"
                alt="logo"
                priority={true}
                width={75}
                height={75}
            />
            <h1 className={'text-xl font-semibold'}>
                Coffee.log
            </h1>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div onClick={handleLogout}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Logout</div>
          </button>
        </div>
      </div>
    </div>
  );
}
