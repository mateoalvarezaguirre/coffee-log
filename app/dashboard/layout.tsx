'use client';

import SideNav from '@/app/ui/components/dashboard/sidenav';
import {useAppSelector} from "@/app/store/store";
import {redirect} from "next/navigation";
import {isAdminUser} from "@/app/services/users/ScopeChecker";

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {

    const { user } = useAppSelector((state) => state.auth);

    if (!user || !isAdminUser(user)) {
        redirect('/');
    }

    return (
        <div className="flex h-full flex-col md:flex-row md:overflow-hidden bg-foreground p-0 m-0 rounded-xl">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-6">{children}</div>
        </div>
    );
}