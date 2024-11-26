import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-2">
            <FaceFrownIcon className="w-10 text-gray-200" />
            <h2 className="text-xl font-semibold text-gray-200">404 Not Found</h2>
            <p>No hemos encontrado el blog seleccionado.</p>
            <Link
                href="/dashboard/blogs"
                className="mt-4 rounded-md bg-foreground px-4 py-2 text-sm text-gray-200 transition-colors hover:bg-opacity-50"
            >
                Volver al inicio
            </Link>
        </main>
    );
}