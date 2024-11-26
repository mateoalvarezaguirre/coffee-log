import {BlogComponent} from "@/app/ui/components/blog/BlogComponent";
import {getRecentBlogs} from "@/app/services/blogs/BlogApi";

export const BlogList = async () => {

    const blogs = await getRecentBlogs();

    if (!blogs) {
        return null;
    }

    return (
        <div className={'flex flex-row flex-wrap'}>
            {blogs.map(blog => (
                <div key={blog.uid} className={'w-full md:w-1/2 lg:w-1/3 p-2'}>
                    <BlogComponent blog={blog} />
                </div>
            ))}
        </div>
    );
};