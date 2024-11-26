import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import {getRecentBlogs} from "@/app/services/blogs/BlogApi";

export default async function LatestBlogs() {

  const recentBlogs = await getRecentBlogs(7);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl font-semibold text-background`}>
        Últimos Blogs
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {<div className="bg-gray-600 px-6 rounded-lg">
          {recentBlogs?.map((blogs, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': index !== 0,
                  },
                )}
              >
                <div className="flex items-center overflow-hidden">
                  <Image
                    src={`/blogs/${blogs.image}`}
                    alt={`${blogs.title}`}
                    className="mr-4 rounded-sm"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base text-gray-50 ">
                      {blogs.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>}
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Actualizado justo ahora</h3>
        </div>
      </div>
    </div>
  );
}
