import { notFound } from 'next/navigation';
import {getBlogBySlug} from "@/app/services/blogs/BlogApi";
import Image from "next/image";
import AppLayout from "@/app/ui/components/layout/AppLayout";

interface EditBlogPageProps {
    params: Promise<{ slug: string }>
}

export default async function Page({ params }: EditBlogPageProps) {

    const slug = (await params).slug;

    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    return (
        <AppLayout>
            <main>
                <Image src={`/blogs/${blog.image}`} alt={blog.title} width={640} height={360} className={'rounded-xl w-full h-[360px] object-cover'}/>
                <div className={'font-semibold text-4xl mt-5'}>{blog.title}</div>
                <div className={'flex gap-4'}>
                    <div className={'text-gray-500 text-xl'}>{blog.date}</div>
                    <div className={'text-gray-500 text-xl'}>{blog.readingTime}</div>
                </div>
                <div className={'bg-foreground text-gray-200 rounded-xl py-3 px-3 text-lg my-2 shadow-lg h-[320px] flex items-center flex-col justify-center'}>
                    {blog.content}
                    {blog.content}
                    <div>
                        {blog.content}
                    </div>
                </div>

            </main>
        </AppLayout>
    );
}