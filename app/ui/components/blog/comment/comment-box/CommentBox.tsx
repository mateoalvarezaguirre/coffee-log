"use client";

import React, { useEffect, useState, useRef } from 'react';
import { SpaceMono } from '@/app/ui/fonts/fonts';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import Comment from '@/app/ui/components/blog/comment/Comment';
import { createComment, getCommentsByBlogID } from '@/app/services/comment/CommentApi';
import { Comment as CommentInterface } from '@/app/interfaces/Comment/Comment';
import {useAppSelector} from '@/app/store/store';
import { Toast } from 'primereact/toast';
import LoadingSpinner from '../../../shared/LoadingSpinner';
        

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

    const removeComment = (commentUid: string) => {
        setComments((comments) => comments.filter((comment) => comment.uid !== commentUid));

        toast.current?.show({
            severity: 'success',
            summary: '¡Excelente!',
            detail: 'Has eliminado el comentario',
            life: 5000
        });
    }

    return (
        <div className={`${SpaceMono.className} bg-transparent text-foreground p-3`}>
            <Toast ref={toast} />
            <div className='font-semibold text-lg'>Comentarios:</div>
            <div className='flex gap-3 mt-3'>
                <input type='text' className='w-full h-12 bg-transparent text-foreground p-2 px-4 rounded-3xl border border-foreground outline-none placeholder-gray-500' placeholder='Escribe tu comentario' id='new-comment' />
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className='rounded-full border border-foreground p-3 flex items-center justify-center w-12 h-12 cursor-pointer hover:bg-foreground hover:text-gray-200 transition-all duration-300' onClick={handleComment}>
                        <PaperAirplaneIcon className='h-6 w-6' />
                    </div>
                )}
            </div>
            <div className='flex flex-col items-end' id='comments-container'>
                {comments.map((comment) => (
                    <Comment key={comment.uid} comment={comment} replyEnabled={true} removeComment={removeComment} />
                ))}
            </div>
        </div>
    )
}

export default CommentBox