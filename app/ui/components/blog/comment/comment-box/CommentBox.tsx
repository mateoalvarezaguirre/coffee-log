"use client";

import React, { useEffect, useState, useRef } from 'react';
import { SpaceMono } from '@/app/ui/fonts/fonts';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import Comment from '@/app/ui/components/blog/comment/Comment';
import { createComment, getCommentsByBlogID } from '@/app/services/comment/CommentApi';
import { Comment as CommentInterface } from '@/app/interfaces/Comment/Comment';
import {useAppSelector} from '@/app/store/store';
import { Toast } from 'primereact/toast';
        

export interface CommentBoxProps {
    blogId: string
}

const CommentBox = ({ blogId }: CommentBoxProps) => {

    const toast = useRef<Toast>(null);

    const [comments, setComments] = useState<CommentInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!blogId) {
            return;
        }

        const getComments = async () => {
            const res = await getCommentsByBlogID(blogId);

            setComments(res);
        }

        getComments();
    }, [blogId]);

    const handleComment = async () => {

        if (!user) {
            toast.current?.show({
                severity: 'secondary',
                summary: '¡Ups!',
                detail: 'Debes iniciar sesión para comentar',
                life: 5000 
            });
            return;
        }

        if (loading) {
            return;
        }

        setLoading(true);

        const newCommentValue = (document.getElementById('new-comment') as HTMLInputElement).value;

        if (newCommentValue === '') {
            toast.current?.show({
                severity: 'secondary',
                summary: '¡Ups!',
                detail: 'Debes escribir un comentario',
                life: 5000 
            });
            setLoading(false);
            return;
        }

        const newComment: CommentInterface = {
            blogId: blogId,
            content: newCommentValue,
            userId: user.uid,
            date: new Date().toISOString(),
            totalLikes: 0,
            likes: [],
        };

        const newCommentUid = await createComment(newComment);

        newComment.uid = newCommentUid;

        newComment.userImage = user.photoURL || null;
        newComment.userName = user.displayName || null;

        setComments((comments) => [...comments, newComment]);

        (document.getElementById('new-comment') as HTMLInputElement).value = '';

        setLoading(false);
    }

    return (
        <div className={`${SpaceMono.className} bg-transparent text-foreground p-3`}>
            <Toast ref={toast} />
            <div className='font-semibold text-lg'>Comentarios:</div>
            <div className='flex gap-3 mt-3'>
                <input type='text' className='w-full h-12 bg-transparent text-foreground p-2 px-4 rounded-3xl border border-foreground outline-none placeholder-gray-500' placeholder='Escribe tu comentario' id='new-comment' />
                {loading ? (
                    <div role="status">
                        <svg aria-hidden="true" className="w-12 h-12 text-background animate-spin fill-foreground" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div className='rounded-full border border-foreground p-3 flex items-center justify-center w-12 h-12 cursor-pointer hover:bg-foreground hover:text-gray-200 transition-all duration-300' onClick={handleComment}>
                        <PaperAirplaneIcon className='h-6 w-6' />
                    </div>
                )}
            </div>
            <div className='flex flex-col items-end' id='comments-container'>
                {comments.map((comment) => (
                    <Comment key={comment.uid} comment={comment} replyEnabled={true} />
                ))}
            </div>
        </div>
    )
}

export default CommentBox