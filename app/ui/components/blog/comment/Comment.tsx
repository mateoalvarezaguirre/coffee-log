"use client";

import { useEffect, useState, useRef } from 'react';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '@/app/store/store';
import { Comment as CommentInterface } from '@/app/interfaces/Comment/Comment';
import {createComment, deleteComment, getCommentReplies, likeUnlikeComment, updateComment} from '@/app/services/comment/CommentApi';
import { Toast } from 'primereact/toast';
import CommentActions from './comment-actions/CommentActions';
import LoadingSpinner from '../../shared/LoadingSpinner';

export interface CommentProps {
    comment: CommentInterface,
    replyEnabled?: boolean,
    removeComment?: (uid: string) => void
}

const Comment = ({ comment, replyEnabled, removeComment }: CommentProps) => {

    const toast = useRef<Toast>(null);

    const { user } = useAppSelector((state) => state.auth);

    const [replies, setReplies] = useState<CommentInterface[]>([]);

    const [liked, setLiked] = useState<boolean>(false);
    const [likeLoading, setLikeLoading] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(0);
    const [comments, setComments] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isNewResponseOpen, setIsNewResponseOpen] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
    const [showActions, setShowActions] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);

    useEffect(() => {

        if (!comment) {
            return;
        }

        setLikes(comment.totalLikes);

        if (user) {
            setLiked(comment.likes?.includes(user.uid) ?? false);

            if (comment.userId === user.uid || user.scopes.includes('admin')) {
                setShowActions(true);
            }

            if (comment.userId === user.uid) {
                setCanEdit(true);
            }
        }

        if (!replyEnabled) {
            return;
        }

        const getReplies = async () => {

            if (!comment.uid) {
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
        const newComment = document.getElementById('new-reply-' + comment.uid) as HTMLInputElement;

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
        setComments(comments + 1);

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

    const textareaRef = useRef(null);

    const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            autoResizeTextarea(textareaRef.current);
        }
    }, [isEditing]);

    const handleEdit = async () => {

        try {
            if (! comment.uid) {
                return;
            }
    
            const editCommentTextArea = document.getElementById('edit-comment') as HTMLTextAreaElement;
    
            if (!editCommentTextArea.value) {
                toast.current?.show({
                    severity: 'secondary',
                    summary: '¡Ups!',
                    detail: 'Debes escribir un comentario',
                    life: 5000
                });
                return;
            }
    
            setIsEditLoading(true);

            comment.content = editCommentTextArea.value;
    
            await updateComment(comment);
    
            toast.current?.show({
                severity: 'success',
                summary: '¡Excelente!',
                detail: 'Has actualizado tu comentario',
                life: 5000
            });
    
            setIsEditLoading(false);
            setIsEditing(false);
        } catch (error) {
            setIsEditLoading(false);

            toast.current?.show({
                severity: 'error',
                summary: '¡Ups!',
                detail: 'Ha ocurrido un error al editar tu comentario',
                life: 5000
            });

            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            if (!comment.uid) {
                return;
            }

            await deleteComment(comment.uid);

            removeComment?.(comment.uid);

        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: '¡Ups!',
                detail: 'Ha ocurrido un error al eliminar el comentario',
                life: 5000
            });

            console.error(error);
        }
    }

    const removeReply = (uid: string) => {
        setReplies((replies) => replies.filter((reply) => reply.uid !== uid));
        setComments(comments - 1);

        toast.current?.show({
            severity: 'success',
            summary: '¡Excelente!',
            detail: 'Has eliminado la respuesta',
            life: 5000
        });
    }


    return (
        <div className='flex flex-col items-end w-full'>
            <Toast ref={toast} />
            <div className='border border-foreground rounded-xl p-6 my-3 w-full shadow-lg'>
                <div className='flex justify-between'>
                    <div className='flex gap-4'>
                        <div
                            className={`rounded-full cursor-pointer object-cover w-11 h-11`}
                            style={{
                                backgroundImage: `url(${comment.userImage || '/profiles/profile1.webp'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                        <div>
                            <div className='font-semibold'>{comment.userName}</div>
                            <div className='text-gray-500'>Hace {getTime(comment.date)}</div>
                        </div>
                    </div>
                    {showActions && (
                        <CommentActions setIsEditing={setIsEditing} canEdit={canEdit} handleDelete={handleDelete}/>
                    )}
                </div>
                {!isEditing ? (
                    <div className='text-foreground mt-3'>
                        {comment.content}
                    </div>
                ) : (
                    <textarea
                        id='edit-comment'
                        ref={textareaRef}
                        className='w-full bg-transparent text-foreground mt-3 p-2 px-4 rounded-3xl border border-foreground outline-none placeholder-gray-500 resize-none overflow-hidden'
                        defaultValue={comment.content}
                        onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => autoResizeTextarea(e.target)}
                    />
                )}
                <div className='flex justify-between mt-3'>
                    <div className='flex gap-3'>
                        <div className='flex gap-2 items-center cursor-pointer' onClick={handleLike}>
                            {
                                likeLoading ? (
                                    <LoadingSpinner />
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
                                <div className='hover:underline cursor-pointer flex items-center' onClick={handleNewResponseOpen}>
                                    Responder
                                </div>
                            </>
                        )}
                    </div>
                    { (isEditing && !isEditLoading) && (
                        <div className='flex gap-3'>
                            <div className='px-3 h-10 rounded-3xl border border-foreground flex items-center justify-center cursor-pointer' onClick={() => setIsEditing(false)}>Cancelar</div>
                            <div className='px-3 h-10 rounded-3xl border border-foreground flex items-center justify-center bg-foreground text-gray-200 cursor-pointer' onClick={handleEdit}>Guardar</div>
                        </div>
                    )}
                    { isEditLoading && (
                        <LoadingSpinner />
                    )}
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out flex flex-col items-end gap-2 w-4/5 ${isNewResponseOpen ? 'max-h-96 mb-5' : 'max-h-0'}`}>
                <div className='flex gap-3 w-full'>
                    <div
                        className={`rounded-full cursor-pointer object-cover`}
                        style={{
                            backgroundImage: `url(${user?.photoURL || '/profiles/profile1.webp'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width: '30px',
                            height: '30px'
                        }}
                    />
                    <input type='text' id={`new-reply-${comment.uid}`} className='w-full h-8 bg-transparent text-foreground p-2 px-4 rounded-3xl border border-foreground outline-none placeholder-gray-500' placeholder='Escribe tu respuesta' />
                </div>
                <div className='flex gap-3'>
                    <div className='px-3 h-10 rounded-3xl border border-foreground flex items-center justify-center cursor-pointer' onClick={handleNewResponseOpen}>Cancelar</div>
                    <div className='px-3 h-10 rounded-3xl border border-foreground flex items-center justify-center bg-foreground text-gray-200 cursor-pointer' onClick={handleComment}>Enviar</div>
                </div>
            </div>
            <div className={`w-4/5 overflow-hidden transition-max-h duration-300 ease-in-out ${isOpen ? 'max-h-fit' : 'max-h-0'}`}>
                {replies.map((reply) => (
                    <Comment key={reply.uid} comment={reply} replyEnabled={false} removeComment={removeReply} />
                ))}
            </div>
        </div>
    )
}

export default Comment;