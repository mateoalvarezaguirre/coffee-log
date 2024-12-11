import {Suspense} from "react";
import UserTable from "@/app/ui/components/dashboard/users/UserTable";
import {UsersTableSkeleton} from "@/app/ui/components/dashboard/skeletons";

export default function Page() {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between text-gray-200 font-semibold">
                <h1 className={`text-2xl`}>Blogs</h1>
            </div>
            <Suspense fallback={<UsersTableSkeleton />} >
                <UserTable />
            </Suspense>
        </div>
    );
}