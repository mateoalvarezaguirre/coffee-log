import {Suspense} from "react";
import {BlogListSkeleton} from "@/app/ui/components/blog/blog-list/BlogListSkeleton";
import {BlogList} from "@/app/ui/components/blog/blog-list/BlogList";

export const RecentBlogs = () => {
    return (
        <>
            <div className={'font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl mt-6 mb-6'}>Recientes:</div>
            <Suspense fallback={<BlogListSkeleton />}>
                <BlogList />
            </Suspense>
        </>
    );
};