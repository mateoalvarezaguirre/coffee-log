import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import {Comment} from "@/app/interfaces/Comment/Comment";
import {getUser} from "@/app/services/users/UserApi";
import {User} from "@/app/interfaces/User/User";
import {DocumentData, QueryDocumentSnapshot} from "@firebase/firestore";

const mapCommentData = (doc: QueryDocumentSnapshot<DocumentData, DocumentData>, user: User | null): Comment => ({
    uid: doc.id,
    blogId: doc.data().blogId,
    content: doc.data().content,
    userId: doc.data().userId,
    date: doc.data().createAt,
    totalLikes: doc.data().totalLikes,
    userImage: user?.photoURL || null,
    userName: user?.displayName || null
});


export const getTotalComments = async () => {
    try {
        const blogCollection = query(
            collection(db, "comments"),
            where("deletedAt", "==", null)
        );

        const res = await getDocs(blogCollection);
        return res.size;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export const createComment = async (comment: Comment) => {
    try {

        await addDoc(collection(db, 'comments'), {
            uid: comment.uid,
            blogId: comment.blogId,
            content: comment.content,
            userId: comment.userId,
            totalLikes: 0,
            createAt: new Date(),
            deletedAt: null
        })

    } catch (error) {
        console.error(error);
    }
}

export const getCommentsByBlogID = async (blogId: string) => {
    try {

        const commentCollection = query(
            collection(db, 'comments'),
            where('blogId', '==', blogId),
            where('deletedAt', '==', null),
            orderBy('createdAt', 'desc')
        )

        const res = await getDocs(commentCollection);

        if (! res.size) {
            return null;
        }

        return res.docs.map(async (collection) => {

            const user = await getUser(collection.data().userId);

            return mapCommentData(collection, user);
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}