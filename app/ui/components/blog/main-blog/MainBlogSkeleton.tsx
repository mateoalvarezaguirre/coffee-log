export const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export const MainBlogSkeleton = () => {
    return (
        <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4 animate-pulse`}>
            <div className="rounded-xl bg-gray-800 p-4">
                <div
                    className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-gray-700 p-4 sm:grid-cols-13 md:gap-4">
                    <div className="h-8 w-36 rounded-md bg-gray-600"/>
                    <div className="h-8 w-36 rounded-md bg-gray-600"/>
                    <div className="h-8 w-36 rounded-md bg-gray-600"/>
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <div className="h-5 w-5 rounded-full bg-gray-600"/>
                    <div className="ml-2 h-4 w-20 rounded-md bg-gray-600"/>
                </div>
            </div>
        </div>
    );
};