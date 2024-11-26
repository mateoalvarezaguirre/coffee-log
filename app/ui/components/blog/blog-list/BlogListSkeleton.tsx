export const BlogListSkeleton = () => {
    return (
        <div className={'flex flex-row'}>
            <div className={`relative w-1/3 overflow-hidden md:col-span-4 animate-pulse m-2`}>
                <div className="rounded-xl bg-gray-800 p-4">
                    <div
                        className="mt-0 flex flex-col h-[210px] justify-end gap-2 rounded-md bg-gray-700 p-4">
                        <div className="h-4 w-3/5 rounded-md bg-gray-600"/>
                        <div className="h-4 w-4/5 rounded-md bg-gray-600"/>
                    </div>
                </div>
            </div>
            <div className={`relative w-1/3 overflow-hidden md:col-span-4 animate-pulse m-2`}>
                <div className="rounded-xl bg-gray-800 p-4">
                    <div
                        className="mt-0 flex flex-col h-[210px] justify-end gap-2 rounded-md bg-gray-700 p-4">
                        <div className="h-4 w-3/5 rounded-md bg-gray-600"/>
                        <div className="h-4 w-4/5 rounded-md bg-gray-600"/>
                    </div>
                </div>
            </div>
            <div className={`relative w-1/3 overflow-hidden md:col-span-4 animate-pulse m-2`}>
                <div className="rounded-xl bg-gray-800 p-4">
                    <div
                        className="mt-0 flex flex-col h-[210px] justify-end gap-2 rounded-md bg-gray-700 p-4">
                        <div className="h-4 w-3/5 rounded-md bg-gray-600"/>
                        <div className="h-4 w-4/5 rounded-md bg-gray-600"/>
                    </div>
                </div>
            </div>
        </div>
    );
};