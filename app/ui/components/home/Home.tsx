import MainBlog from "@/app/ui/components/blog/main-blog/MainBlog";
import {Suspense} from "react";
import {MainBlogSkeleton} from "@/app/ui/components/blog/main-blog/MainBlogSkeleton";
import {RecentBlogs} from "@/app/ui/components/home/recent-blogs/RecentBlogs";

export const Home = () => {
    return (
        <>
            <Suspense fallback={<MainBlogSkeleton />}>
                <MainBlog/>
                <RecentBlogs />
            </Suspense>
        </>
    );
};