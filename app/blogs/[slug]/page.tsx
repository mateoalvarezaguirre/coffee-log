import { notFound } from 'next/navigation';
import {getBlogBySlug} from "@/app/services/blogs/BlogApi";
import Image from "next/image";
import AppLayout from "@/app/ui/components/layout/AppLayout";
import { SpaceMono } from '@/app/ui/fonts/fonts';
import {clsx} from 'clsx';
import CommentBox from '@/app/ui/components/blog/comment/comment-box/CommentBox';

interface EditBlogPageProps {
    params: Promise<{ slug: string }>
}

export default async function Page({ params }: EditBlogPageProps) {

    const slug = (await params).slug;

    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const blogId = blog.uid;

    return (
        <AppLayout>
            <main className='flex flex-col items-center justify-center'>
                <Image src={`/blogs/${blog.image}`} alt={blog.title} width={640} height={360} className={'rounded-xl w-full h-[360px] object-cover'}/>
                <div className='max-w-screen-lg'>
                    <div className={'font-semibold text-4xl mt-5'}>{blog.title}</div>
                    <div className={'flex gap-4'}>
                        <div className={'text-gray-500 text-xl'}>{blog.date}</div>
                        <div className={'text-gray-500 text-xl'}>{blog.readingTime}</div>
                    </div>
                    <div className={clsx(SpaceMono.className, 'text-foreground text-lg my-2 min-h-[320px] w-full pr-16')}>
                        {blog.content.map((content, index) => (
                            <div key={index} className={'pb-4'}>
                                {content.title != '' && (
                                    <h3 className='font-bold'>{content.title}</h3>
                                )}
                                <div>{content.content}</div>
                            </div>
                        ))}
                    </div>
                    <CommentBox blogId={blogId} />
                </div>
            </main>
        </AppLayout>
    );
}