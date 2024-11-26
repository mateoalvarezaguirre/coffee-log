import CardWrapper from '@/app/ui/components/dashboard/cards';
import TrafficChart from '@/app/ui/components/dashboard/traffic-chart';
import LatestBlogs from '@/app/ui/components/dashboard/blogs/latest-blogs';
import { Poppins } from '@/app/ui/fonts/fonts';
import { Suspense } from 'react';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/components/dashboard/skeletons';

export default async function Page() {
    return (
        <main className={`${Poppins.className} p-0 m-0`}>
            <h1 className={`mb-4 text-xl md:text-2xl font-bold text-background`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <TrafficChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestBlogs />
                </Suspense>
            </div>
        </main>
    );
}