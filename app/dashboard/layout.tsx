'use client';

import SideNav from '@/app/ui/components/dashboard/sidenav';
import {redirect} from "next/navigation";
import {isAdminUser} from "@/app/services/users/ScopeChecker";
import { useAuth } from '../context/AuthContext';

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {

    const { auth } = useAuth();

    if (!auth || !isAdminUser(auth)) {
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