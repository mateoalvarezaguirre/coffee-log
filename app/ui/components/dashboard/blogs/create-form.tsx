'use client';

import { Button } from '@/app/ui/components/dashboard/button';

export default function Form({ categories }: { categories: string[] }) {

  return (
      <form action="/create-blog">
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
            >
              <option value="" disabled selected>
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
          <div className="mt-6 flex justify-end gap-4">
            <Button type="submit">Crear Blog</Button>
          </div>
        </div>
      </form>
  );
}