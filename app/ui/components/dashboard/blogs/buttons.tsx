'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {deleteBlog} from "@/app/services/blogs/BlogApi";
import {redirect} from "next/navigation";


export function CreateBlog() {
  return (
    <Link
      href="/dashboard/blogs/create"
      className="flex h-10 items-center rounded-lg bg-background px-4 text-sm font-medium transition-colors hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-none"
    >
      <span className="hidden md:block">Nuevo blog</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateBlog({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/blogs/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteBlog({ uid }: { uid: string }) {

  const deleteInvoiceWithId = async (uid: string) => {
    await deleteBlog(uid);
    redirect('/dashboard/blogs');
  }

  return (
    <form onSubmit={() => deleteInvoiceWithId(uid)}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
