import {Blog} from "@/app/interfaces/Blog/Blog";
import Link from "next/link";

export interface BlogProps {
    blog: Blog;
}

export const BlogComponent = ({blog}: BlogProps) => {
    return (
        <div className={'group bg-white shadow-md rounded-xl h-full min-h-56 relative flex flex-col items-center justify-end overflow-hidden'}
            style={{
                backgroundImage: `url(/blogs/${blog.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <div className="z-20 w-full p-4 transition-all duration-500 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            >
                <Link href={`/blogs/${blog.slug}`} >
                    <h2 className={'text-xl font-bold text-gray-200'}>{blog.title}</h2>
                </Link>
            </div>
        </div>
    );
};