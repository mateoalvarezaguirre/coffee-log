"use client"

import React, { useState } from 'react'
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Dialog } from 'primereact/dialog';
import LoadingSpinner from '../../../shared/LoadingSpinner';


interface CommentActionsProps {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    canEdit: boolean;
    handleDelete: () => Promise<void>;
}

const CommentActions = ({ setIsEditing, canEdit, handleDelete }: CommentActionsProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    const handleEdit = () => {
        setIsOpen(false);
        setIsEditing(true);
    }

    const handleDeleteConfirmation = async () => {

        setDeleteLoading(true);

        await handleDelete();

        setDeleteLoading(false);
        setIsOpen(false);
        setDeleteModalOpen(false);
    }

    const deleteModal = (
        <div className="p-4 bg-foreground rounded-md shadow-md flex flex-col">
            <p className="m-0 text-gray-200">
                ¿Estás seguro de que deseas eliminar este comentario?
            </p>
            {
                deleteLoading ? (
                    <div className="w-full mt-4 flex justify-end">
                        <LoadingSpinner 
                        secondaryColor='foreground'
                        />
                    </div>
                ) : (
                    <div className="flex gap-4 mt-4 text-gray-200 self-end">
                        <button className="px-3 h-10 rounded-3xl border border-gray-200 flex items-center justify-center cursor-pointer" onClick={() => setDeleteModalOpen(false)}>Cancelar</button>
                        <button className="px-3 h-10 rounded-3xl flex items-center justify-center bg-background text-foreground cursor-pointer" onClick={handleDeleteConfirmation}>Eliminar</button>
                    </div>
                )
            }
        </div>
    );

    return (
        <div className='relative'>
            <div className='cursor-pointer' onClick={handleOpen}>
                <EllipsisVerticalIcon className="h-8 w-8 text-foreground" />
            </div>
            <div className={`absolute top-4 right-0 mt-5 mr-3 w-32 rounded-md shadow-lg transition transform ${isOpen ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 -z-10'
                }`}
                style={{ transitionDuration: '200ms' }}
            >
                <div className="py-1 bg-foreground rounded-md shadow-xs flex flex-col items-end">
                    {
                        canEdit && (
                            <button
                                className="px-4 py-2 text-sm text-gray-200 flex gap-3"
                                onClick={handleEdit}
                            >
                                <PencilSquareIcon className="h-5 w-5" />
                                Editar
                            </button>
                        )
                    }
                    <button
                        className="px-4 py-2 text-sm text-gray-200 flex gap-3"
                        onClick={() => setDeleteModalOpen(true)}
                    >
                        <TrashIcon className="h-5 w-5" />
                        Eliminar
                    </button>
                    <Dialog
                        visible={deleteModalOpen}
                        style={{ width: '32rem' }}
                        onHide={() => setDeleteModalOpen(false)}
                        content={deleteModal}
                    ></Dialog>
                </div>
            </div>
        </div>
    )
}

export default CommentActions