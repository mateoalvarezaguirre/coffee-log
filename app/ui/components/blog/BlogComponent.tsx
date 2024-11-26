import {Blog} from "@/app/interfaces/Blog/Blog";
import Image from "next/image";

export interface BlogProps {
    blog: Blog;
}

export const BlogComponent = ({blog}: BlogProps) => {
    return (
        <div className={'bg-white shadow-md rounded-md'}>
            <Image
                src={`/blogs/${blog.image}`}
                alt={blog.title}
                className={'w-full rounded-t-md object-fill'}
                width={'300'}
                height={'200'}
            />
            <div className={'p-4'}>
                <h2 className={'text-xl font-bold text-gray-800'}>{blog.title}</h2>
                <p className={'text-sm text-gray-600'}>{blog.subtitle}</p>
            </div>
        </div>
    );
};