'use client';

import React, {useState} from 'react';
import { Button } from '@/app/ui/components/dashboard/button';
import {updateBlog} from "@/app/services/blogs/BlogApi";
import {Blog} from "@/app/interfaces/Blog/Blog";

export default function EditInvoiceForm({
  blog,
  categories,
}: {
  blog: Blog;
  categories: string[];
}) {

  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<{
    errors: unknown;
    message: string
  }>({
    errors: {},
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {

      await updateBlog({
        uid: blog.uid,
        title: data.title.toString(),
        subtitle: data.subtitle.toString(),
        image: data.image.toString(),
        slug: data.slug.toString(),
        category: data.category.toString(),
        categorySlug: data.categorySlug.toString(),
        readingTime: data.readingTime.toString(),
        content: data.content.toString(),
        status: data.status.toString(),
        date: data.date.toString(),
      })

      setState({...state, message: 'Blog updated successfully' });

    } catch (error) {
      setState({...state, errors: error });
    }
    setLoading(false);
  }

  return (
      <form onSubmit={handleSubmit}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Blog Title
            </label>
            <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter Blog Title"
                value={blog.title}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="title-error"
            />
            <div id="title-error" aria-live="polite" aria-atomic="true"></div>
          </div>
          <div className="mb-4">
            <label htmlFor="subtitle" className="mb-2 block text-sm font-medium">
              Subtitle
            </label>
            <input
                id="subtitle"
                name="subtitle"
                type="text"
                placeholder="Enter Blog Subtitle (Optional)"
                value={blog.subtitle}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="subtitle-error"
            />
            <div id="subtitle-error" aria-live="polite" aria-atomic="true"></div>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="mb-2 block text-sm font-medium">
              Blog Content
            </label>
            <textarea
                id="content"
                name="content"
                placeholder="Write your blog content here..."
                value={blog.content}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="content-error"
            ></textarea>
            <div id="content-error" aria-live="polite" aria-atomic="true"></div>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="mb-2 block text-sm font-medium">
              Category
            </label>
            <select
                id="category"
                name="category"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="category-error"
                defaultValue={blog.category}
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
              ))}
            </select>
            <div id="category-error" aria-live="polite" aria-atomic="true"></div>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="mb-2 block text-sm font-medium">
              Featured Image (Optional)
            </label>
            <input
                id="image"
                name="image"
                type="file"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
            />
          </div>
          { !loading && (
              <div className="mt-6 flex justify-end gap-4">
                <Button type="submit">Actualizar Blog</Button>
              </div>
          )}
        </div>
      </form>
  );
}
