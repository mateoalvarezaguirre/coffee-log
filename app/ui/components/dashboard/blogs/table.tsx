import Image from 'next/image';
import { UpdateBlog, DeleteBlog } from '@/app/ui/components/dashboard/blogs/buttons';
import BlogStatus from '@/app/ui/components/dashboard/blogs/status';
import {fetchFilteredBlogs} from "@/app/services/blogs/BlogApi";

export default async function BlogTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const blogs = await fetchFilteredBlogs(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {blogs?.map((blog) => (
              <div
                key={blog.uid}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={`/blogs/${blog.image}`}
                        className="mr-2 rounded-md"
                        width={50}
                        height={28}
                        alt={`${blog.title}`}
                      />
                      <p>{blog.title}</p>
                    </div>
                  </div>
                  <BlogStatus status={blog.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {blog.readingTime}
                    </p>
                    <p>{blog.date}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateBlog id={blog.uid} />
                    <DeleteBlog uid={blog.uid} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Imagen
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Título
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tiempo de lectura
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Estado
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Editar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
            {blogs?.map((blog) => (
                  <tr
                      key={blog.uid}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <Image
                          src={`/blogs/${blog.image}`}
                          className="rounded-md"
                          width={50}
                          height={28}
                          alt={`${blog.title}`}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 w-2/6">
                      {blog.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {blog.readingTime}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {blog.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <BlogStatus status={blog.status}/>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateBlog id={blog.uid}/>
                        <DeleteBlog uid={blog.uid}/>
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
