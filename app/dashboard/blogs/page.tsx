import Pagination from '@/app/ui/components/dashboard/blogs/pagination';
import Search from '@/app/ui/components/dashboard/search';
import BlogTable from '@/app/ui/components/dashboard/blogs/table';
import { CreateBlog } from '@/app/ui/components/dashboard/blogs/buttons';
import { BlogsTableSkeleton } from '@/app/ui/components/dashboard/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import {fetchBlogPages} from "@/app/services/blogs/BlogApi";

export const metadata: Metadata = {
    title: 'Blogs',
};

export interface BlogPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

export default async function Page({ searchParams }: BlogPageProps) {

    const params = await searchParams;

    const query = params?.query || '';
    const currentPage = params?.page || 1;

    const totalPages = await fetchBlogPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between text-gray-200 font-semibold">
                <h1 className={`text-2xl`}>Blogs</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Buscar blogs..." />
                <CreateBlog />
            </div>
            <Suspense key={query + currentPage} fallback={<BlogsTableSkeleton />}>
                <BlogTable query={query} currentPage={+currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}