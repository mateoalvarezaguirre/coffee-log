import { BlogComponent } from "@/app/ui/components/blog/BlogComponent";
import { getRecentBlogs } from "@/app/services/blogs/BlogApi";

export const BlogList = async () => {

    const blogs = await getRecentBlogs();

    if (!blogs) {
        return null;
    }

    const shuffledBlogs = blogs.sort(() => Math.random() - 0.5);



    return (
        <div className="flex flex-col items-center">
            <div className="hidden md:grid grid-cols-3 grid-rows-3 gap-4">
                <div>
                    <BlogComponent blog={shuffledBlogs[0]} />
                </div>
                <div className="row-span-2">
                    <BlogComponent blog={shuffledBlogs[1]} />
                </div>
                <div>
                    <BlogComponent blog={shuffledBlogs[2]} />
                </div>
                <div className="row-span-2 row-start-2">
                    <BlogComponent blog={shuffledBlogs[3]} />
                </div>
                <div className="col-span-2 col-start-2 row-start-3">
                    <BlogComponent blog={shuffledBlogs[4]} />
                </div>
                <div className="col-start-3 row-start-2">
                    <BlogComponent blog={shuffledBlogs[5]} />
                </div>
            </div>
            <div className={'md:hidden flex flex-row flex-wrap'}>
                {shuffledBlogs.map(blog => (
                    <div key={blog.uid} className={'w-full'}>
                        <BlogComponent blog={blog} />
                    </div>
                ))}
            </div>

        </div>
    );
};