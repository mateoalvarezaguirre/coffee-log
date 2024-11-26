/*import BlogJson from './blogs.json';
import {createBlog} from "@/app/services/blogs/BlogApi";

async function seedBlogs() {

    const blogs = JSON.parse(JSON.stringify(BlogJson));

    for (const blog of blogs) {
        await createBlog(blog)
    }
}*/

export async function GET() {
    return Response.json({
        message:
            "Uncomment this file and remove this line. You can delete this file when you are finished.",
    });
    /*try {
        await seedBlogs();

        return Response.json("Blogs seeded successfully");

    } catch (error) {
        return Response.json({error}, {status: 500});
    }*/
}