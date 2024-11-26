import Form from '@/app/ui/components/dashboard/blogs/edit-form';
import Breadcrumbs from '@/app/ui/components/dashboard/blogs/breadcrumbs';
import { notFound } from 'next/navigation';
import {getAllCategories, getBlogById} from "@/app/services/blogs/BlogApi";

interface EditBlogPageProps {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: EditBlogPageProps) {

    const id = (await params).id;

    const [blog, categories] = await Promise.all([
        getBlogById(id),
        getAllCategories(),
    ]);

    if (!blog) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Blogs', href: '/dashboard/blogs' },
                    {
                        label: 'Editar Blog',
                        href: `/dashboard/blogs/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form blog={blog} categories={categories} />
        </main>
    );
}