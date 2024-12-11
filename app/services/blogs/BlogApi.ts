import { addDoc, collection, doc, getDocs, getDoc, limit, orderBy, query, updateDoc, where, startAfter } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import {Blog} from "@/app/interfaces/Blog/Blog";
import {formatTimestamp} from "@/app/utils/DateHelper";
import {DocumentData, QueryDocumentSnapshot} from "@firebase/firestore";
import {Category} from "@/app/interfaces/Blog/Category";
import { BlogContent } from "@/app/interfaces/Blog/BlogContent";

const mapBlogData = (doc: QueryDocumentSnapshot<DocumentData, DocumentData>): Blog => ({
    uid: doc.id,
    title: doc.data().title,
    subtitle: doc.data().subtitle,
    image: doc.data().image,
    slug: doc.data().slug,
    category: doc.data().category,
    categorySlug: doc.data().categorySlug,
    date: formatTimestamp(doc.data().createdAt),
    readingTime: doc.data().readingTime,
    content: mapBlogContent(doc.data().content),
    status: doc.data().status,
});

const mapBlogContent = (content: string): BlogContent[] => {
    try {
        const contentArray = JSON.parse(content);

        return contentArray.map((content: { title: string, content: string }) => ({
            title: content.title,
            content: content.content,
        }));
    } catch {
        return [
            {
                title: "",
                content: content,
            }
        ]
    }
}

export const getMainBlog = async () => {
    try {
        const blogCollection = query(
            collection(db, "blogs"),
            where("isMain", "==", true),
            where("deletedAt", "==", null),
            limit(1)
        );

        const res = await getDocs(blogCollection);
        return res.size ? mapBlogData(res.docs[0]) : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getRecentBlogs = async (limitValue: number = 9) => {
    try {
        const blogCollection = query(
            collection(db, "blogs"),
            where("isMain", "==", false),
            where("deletedAt", "==", null),
            orderBy("createdAt", "desc"),
            limit(limitValue)
        );

        const res = await getDocs(blogCollection);
        return res.size ? res.docs.map(mapBlogData) : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getBlogs = async () => {
    try {
        const blogCollection = query(
            collection(db, "blogs"),
            where("isMain", "==", false),
            where("deletedAt", "==", null),
            orderBy("createdAt", "desc")
        );

        const res = await getDocs(blogCollection);
        return res.size ? res.docs.map(mapBlogData) : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getBlogBySlug = async (slug: string) => {
    try {
        const blogCollection = query(
            collection(db, "blogs"),
            where("slug", "==", slug),
            where("status", "==", "published"),
            where("deletedAt", "==", null),
            limit(1)
        );

        const res = await getDocs(blogCollection);
        return res.size ? mapBlogData(res.docs[0]) : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getBlogById = async (uid: string) => {
    try {

        const blogRef = doc(db, "blogs", uid);
        const blog = await getDoc(blogRef);

        return blog.exists() ? mapBlogData(blog) : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const createBlog = async (blog: Blog) => {
    try {
        await addDoc(collection(db, "blogs"), {
            ...blog,
            isMain: false,
            createdAt: new Date(),
            deletedAt: null,
        });
    } catch (error) {
        console.error(error);
    }
}

export const updateBlog = async (blog: Blog) => {
    try {
        const blogRef = doc(db, "blogs", blog.uid);
        await updateDoc(blogRef, {
            title: blog.title,
            subtitle: blog.subtitle,
            image: blog.image,
            slug: blog.slug,
            category: blog.category,
            categorySlug: blog.categorySlug,
            readingTime: blog.readingTime,
            content: JSON.stringify(blog.content),
            updatedAt: new Date(),
        });
    } catch (error) {
        console.error(error);
    }
}

export const deleteBlog = async (uid: string) => {
    try {
        const blogRef = doc(db, "blogs", uid);
        await updateDoc(blogRef, { deletedAt: new Date() });
    } catch (error) {
        console.error(error);
    }
}

export const updateMainBlog = async (uid: string) => {
    try {
        const blogCollection = query(
            collection(db, "blogs"),
            where("isMain", "==", true),
            where("deletedAt", "==", null),
            limit(1)
        );

        const res = await getDocs(blogCollection);
        if (res.size) {
            await updateDoc(doc(db, "blogs", res.docs[0].id), { isMain: false });
        }

        const blogRef = doc(db, "blogs", uid);
        await updateDoc(blogRef, { isMain: true });
    } catch (error) {
        console.error(error);
    }
}

export const getTotalBlogs = async () => {
    try {
        const blogCollection = query(
            collection(db, "blogs"),
            where("deletedAt", "==", null)
        );

        const res = await getDocs(blogCollection);
        return res.size;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export const getAllCategories = async () => {
    try {
        const blogCollection = query(
            collection(db, "blogs"),
            where("deletedAt", "==", null)
        );

        const res = await getDocs(blogCollection);
        const categoryArray = new Array<Category>()

        res.docs.forEach((doc) => {
            const category = {
                name: doc.data().category,
                slug: doc.data().categorySlug,
            };
            if (!categoryArray.includes(category)) {
                categoryArray.push(category);
            }
        });

        return categoryArray;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const fetchBlogPages = async (queryFilter: string) => {
    try {

        if (queryFilter === "") {
            const blogCollection = query(
                collection(db, "blogs"),
                where("deletedAt", "==", null)
            );

            const res = await getDocs(blogCollection);
            const totalPages = Math.ceil(res.size / 6);
            return totalPages;
        }

        const blogCollection = query(
            collection(db, "blogs"),
            where("deletedAt", "==", null),
            where("title", ">=", queryFilter),
            where("title", "<=", queryFilter + "\uf8ff")
        );

        const res = await getDocs(blogCollection);
        const totalPages = Math.ceil(res.size / 6);
        return totalPages;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export const fetchFilteredBlogs = async (queryFilter: string, currentPage: number) => {
    const st = (currentPage - 1) * 6;

    try {

        const blogCollection = query(
            collection(db, "blogs"),
            where("deletedAt", "==", null),
            where("title", ">=", queryFilter),
            where("title", "<=", queryFilter + "\uf8ff"),
            orderBy("title"),
            startAfter(st),
            limit(6)
        );

        const res = await getDocs(blogCollection);
        return res.docs.map(mapBlogData);
    } catch (error) {
        console.error(error);
        return [];
    }
}