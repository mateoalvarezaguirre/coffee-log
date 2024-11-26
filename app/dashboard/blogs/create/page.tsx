import Form from '@/app/ui/components/dashboard/blogs/create-form';
import Breadcrumbs from '@/app/ui/components/dashboard/blogs/breadcrumbs';
import {getAllCategories} from "@/app/services/blogs/BlogApi";

export default async function Page() {
    const categories = await getAllCategories();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Blogs', href: '/dashboard/blogs' },
                    {
                        label: 'Crear Blog',
                        href: '/dashboard/blogs/create',
                        active: true,
                    },
                ]}
            />
            <Form categories={categories} />
        </main>
    );
}