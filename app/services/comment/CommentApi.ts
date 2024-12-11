import { addDoc, collection, getDocs, orderBy, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
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
    date: doc.data().date,
    totalLikes: doc.data().totalLikes,
    likes: doc.data().likes || [],
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

        const newComment = await addDoc(collection(db, 'comments'), {
            blogId: comment.blogId,
            content: comment.content,
            userId: comment.userId,
            belongsToCommentUid: comment.belongsToCommentUid || null,
            totalLikes: 0,
            likes: [],
            date: comment.date,
            createdAt: new Date(),
            deletedAt: null
        });

        return newComment.id;

    } catch (error) {
        console.error(error);
    }
}

export const getCommentsByBlogID = async (blogId: string) => {
    try {
        const blogCollection = query(
            collection(db, "comments"),
            where("blogId", "==", blogId),
            where("belongsToCommentUid", "==", null),
            where("deletedAt", "==", null),
            orderBy("createdAt", "desc")
        );

        const res = await getDocs(blogCollection);

        const comments = res.docs.map(async (doc) => {
            const user = await getUser(doc.data().userId);
            return mapCommentData(doc, user);
        });

        return Promise.all(comments);

    } catch (error) {
        console.error(error);
        return [];
    }
}

export const likeUnlikeComment = async (commentId: string, userId: string) => {
    try {

        const commentRef = doc(db, 'comments', commentId);
        const comment = await getDoc(commentRef);

        if (!comment.exists()) {
            return;
        }

        const commentData = comment.data();

        if (!commentData.likes) {
            commentData.likes = [];
        }

        if (commentData.likes.includes(userId)) {
            commentData.likes = commentData.likes.filter((id: string) => id !== userId);
            commentData.totalLikes -= 1;
        } else {
            commentData.likes.push(userId);
            commentData.totalLikes += 1;
        }

        await updateDoc(commentRef, {
            totalLikes: commentData.totalLikes,
            likes: commentData.likes
        });

    } catch (error) {
        console.error(error);
    }
}

export const deleteComment = async (commentId: string) => {
    try {

        const commentRef = doc(db, 'comments', commentId);

        await updateDoc(commentRef, {
            deletedAt: new Date()
        });

    } catch (error) {
        console.error(error);
    }
}

export const updateComment = async (comment: Comment) => {
    try {

        if (! comment.uid) {
            return;
        }

        const commentRef = doc(db, 'comments', comment.uid);

        await updateDoc(commentRef, {
            content: comment.content
        });

    } catch (error) {
        console.error(error);
    }
}

export const getComment = async (commentId: string) => {
    try {

        const commentRef = doc(db, 'comments', commentId);
        const comment = await getDoc(commentRef);

        if (!comment.exists()) {
            return null;
        }

        const user = await getUser(comment.data().userId);

        return mapCommentData(comment, user);

    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getCommentReplies = async (commentId: string) => {
    try {
        const commentCollection = query(
            collection(db, "comments"),
            where("belongsToCommentUid", "==", commentId),
            where("deletedAt", "==", null),
            orderBy("createdAt", "asc")
        );

        const res = await getDocs(commentCollection);

        const comments = res.docs.map(async (doc) => {
            const user = await getUser(doc.data().userId);
            return mapCommentData(doc, user);
        });

        return Promise.all(comments);

    } catch (error) {
        console.error(error);
        return [];
    }
}