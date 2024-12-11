"use client";

import {useEffect, useState, useRef} from 'react';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useAppSelector } from '@/app/store/store';
import { Comment as CommentInterface } from '@/app/interfaces/Comment/Comment';
import { createComment, getCommentReplies, likeUnlikeComment } from '@/app/services/comment/CommentApi';
import { Toast } from 'primereact/toast';

export interface CommentProps {
    comment: CommentInterface,
    replyEnabled?: boolean
}

const Comment = ({ comment, replyEnabled }: CommentProps) => {

    const toast = useRef<Toast>(null);

    const { user } = useAppSelector((state) => state.auth);

    const [replies, setReplies] = useState<CommentInterface[]>([]);

    const [liked, setLiked] = useState<boolean>(false);
    const [likeLoading, setLikeLoading] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(0);
    const [comments, setComments] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isNewResponseOpen, setIsNewResponseOpen] = useState<boolean>(false)

    useEffect(() => {

        if (!comment) {
            return;
        }

        setLikes(comment.totalLikes);

        if (user) {
            setLiked(comment.likes?.includes(user.uid) ?? false);
        }

        if (! replyEnabled) {
            return;
        }

        const getReplies = async () => {

            if (! comment.uid) {
                return;
            }

            const res = await getCommentReplies(comment.uid);

            setReplies(res);
            setComments(res.length);
        }

        getReplies();
    }, [comment, replyEnabled, user]);


    const handleLike = async () => {

        if (!user) {
            toast.current?.show({
                severity: 'secondary',
                summary: '¡Ups!',
                detail: 'Debes iniciar sesión para dar like',
                life: 5000 
            });
            return;
        }

        if (!user || !comment.uid || likeLoading) {
            return;
        }

        setLikeLoading(true);

        await likeUnlikeComment(comment.uid, user.uid);

        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);

        setLikeLoading(false);
    }

    const handleResponsesOpen = () => {
        setIsOpen(!isOpen);
    }

    const handleNewResponseOpen = () => {

        if (!user) {
            toast.current?.show({
                severity: 'secondary',
                summary: '¡Ups!',
                detail: 'Debes iniciar sesión para responder',
                life: 5000 
            });
            return;
        }

        setIsNewResponseOpen(!isNewResponseOpen);
    }

    const handleComment = async () => {
        const newComment = document.getElementById('new-reply') as HTMLInputElement;

        if (!user) {
            toast.current?.show({
                severity: 'secondary',
                summary: '¡Ups!',
                detail: 'Debes iniciar sesión para responder',
                life: 5000 
            });
            return;
        }

        if (!newComment.value) {
            toast.current?.show({
                severity: 'secondary',
                summary: '¡Ups!',
                detail: 'Debes escribir un comentario',
                life: 5000 
            });
            return;
        }

        const newReply: CommentInterface = {
            blogId: comment.blogId,
            content: newComment.value,
            userId: user.uid,
            date: new Date().toISOString(),
            totalLikes: 0,
            likes: [],
            belongsToCommentUid: comment.uid
        }

        const newCommentUid = await createComment(newReply);

        newReply.uid = newCommentUid;
        newReply.userImage = user.photoURL;
        newReply.userName = user.displayName
        
        newComment.value = '';

        setReplies((replies) => [...replies, newReply]);

        setIsNewResponseOpen(false);
    }

    const getTime = (date: string) => {
        const now = new Date();
        const commentDate = new Date(date);

        const diff = now.getTime() - commentDate.getTime();
        const seconds = diff / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const months = days / 30;
        const years = months / 12;

        if (years >= 1) {
            return `${Math.floor(years)} años`;
        }

        if (months >= 1) {
            return `${Math.floor(months)} meses`;
        }

        if (days >= 1) {
            return `${Math.floor(days)} días`;
        }

        if (hours >= 1) {
            return `${Math.floor(hours)} horas`;
        }

        if (minutes >= 1) {
            return `${Math.floor(minutes)} minutos`;
        }

        return `${Math.floor(seconds)} segundos`;
    }

    return (
        <div className='flex flex-col items-end w-full'>
            <Toast ref={toast} />
            <div className='border border-foreground rounded-xl p-6 my-3 w-full shadow-lg'>
                <div className='flex gap-4'>
                    <Image
                        className={`rounded-full cursor-pointer object-cover`}
                        src={comment.userImage || '/profiles/profile1.webp'}
                        alt="profile picture."
                        width={50}
                        height={50}
                    />
                    <div>
                        <div className='font-semibold'>{comment.userName}</div>
                        <div className='text-gray-500'>Hace {getTime(comment.date)}</div>
                    </div>
                </div>
                <div className='text-foreground mt-3'>
                    {comment.content}
                </div>
                <div className='flex gap-3 mt-3'>
                    <div className='flex gap-2 items-center cursor-pointer' onClick={handleLike}>
                        {
                            likeLoading ? (
                                <div role="status">
                        <svg aria-hidden="true" className="w-6 h-6 text-background animate-spin fill-foreground" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                            ) : (
                                liked ? <HeartIconSolid className='h-6 w-6' /> : <HeartIcon className='h-6 w-6' />
                            )
                        }
                        <div>{likes}</div>
                    </div>
                    {replyEnabled && (
                        <>
                            <div className='flex gap-2 items-center cursor-pointer' onClick={handleResponsesOpen}>
                                <ChatBubbleLeftEllipsisIcon className='h-6 w-6' />
                                <div className='hover:underline'>{comments}</div>
                            </div>
                            <div className='hover:underline cursor-pointer' onClick={handleNewResponseOpen}>
                                Responder
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out flex flex-col items-end gap-2 w-4/5 ${isNewResponseOpen ? 'max-h-96 mb-5' : 'max-h-0'}`}>
                <div className='flex gap-3 w-full'>
                    <Image
                        className={`rounded-full cursor-pointer object-cover`}
                        src={user?.photoURL ?? '/profile.webp'}
                        alt="profile picture."
                        width={30}
                        height={30}
                    />
                    <input type='text' id='new-reply' className='w-full h-8 bg-transparent text-foreground p-2 px-4 rounded-3xl border border-foreground outline-none placeholder-gray-500' placeholder='Escribe tu respuesta' />
                </div>
                <div className='flex gap-3'>
                    <div className='px-3 h-10 rounded-3xl border border-foreground flex items-center justify-center cursor-pointer' onClick={handleNewResponseOpen}>Cancelar</div>
                    <div className='px-3 h-10 rounded-3xl border border-foreground flex items-center justify-center bg-foreground text-gray-200 cursor-pointer' onClick={handleComment}>Enviar</div>
                </div>
            </div>
            <div className={`w-4/5 overflow-hidden transition-max-h duration-300 ease-in-out ${isOpen ? 'max-h-fit' : 'max-h-0'}`}>
                {replies.map((reply) => (
                    <Comment key={reply.uid} comment={reply} replyEnabled={false} />
                ))}
            </div>
        </div>
    )
}

export default Comment;