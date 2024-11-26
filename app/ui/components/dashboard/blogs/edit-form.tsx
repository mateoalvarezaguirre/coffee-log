'use client';

import React, {useState} from 'react';
import { Button } from '@/app/ui/components/dashboard/button';
import {updateBlog} from "@/app/services/blogs/BlogApi";
import {Blog} from "@/app/interfaces/Blog/Blog";
import Image from "next/image";
import {Category} from "@/app/interfaces/Blog/Category";

export default function EditInvoiceForm({
  blog,
  categories,
}: {
  blog: Blog;
  categories: Category[];
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

    const category = categories.find((category) => category.slug === data.category);

    try {

      await updateBlog({
        uid: blog.uid,
        title: data.title.toString() ?? blog.title,
        subtitle: data.subtitle.toString() ?? blog.subtitle,
        image: blog.image,
        slug: data.slug.toString(),
        category: category?.name ?? '',
        categorySlug: category?.slug ?? '',
        readingTime: data.readingTime?.toString() ?? blog.readingTime,
        content: data.content?.toString() ?? blog.content,
        status: data.status?.toString() ?? blog.status,
        date: blog.date,
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
                defaultValue={blog.title}
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
                defaultValue={blog.subtitle}
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
                defaultValue={blog.content}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="content-error"
            ></textarea>
            <div id="content-error" aria-live="polite" aria-atomic="true"></div>
          </div>
          <div className={'flex'}>
            <div className="mb-4 w-1/2 pr-4">
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
                    <option key={index} value={category.slug}>
                      {category.name}
                    </option>
                ))}
              </select>
              <div id="category-error" aria-live="polite" aria-atomic="true"></div>
            </div>
            <div className="mb-4 w-1/2">
              <label htmlFor="slug" className="mb-2 block text-sm font-medium">
                Slug
              </label>
              <input
                  id="slug"
                  name="slug"
                  type="text"
                  placeholder="Ingresa el slug del blog"
                  defaultValue={blog.slug}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="slug-error"
              />
              <div id="slug-error" aria-live="polite" aria-atomic="true"></div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="mb-2 block text-sm font-medium">
              Imagen
            </label>
            <input
                id="image"
                name="image"
                type="file"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
            />
            <div>
              <Image src={`/blogs/${blog.image}`} alt={`${blog.title}`} width={320} height={180}
                     className={'rounded-lg mt-4'}/>
            </div>
          </div>
          {!loading && (
              <div className="mt-6 flex justify-end gap-4">
              <Button type="submit">Actualizar Blog</Button>
              </div>
          )}
        </div>
      </form>
  );
}
