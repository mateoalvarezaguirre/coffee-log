import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/store/store";
import {PowerIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import {logout as sliceLogout} from "@/app/store/slices/auth/authSlice";
import {redirect} from "next/navigation";
import Link from "next/link";
import { useAuth } from '@/app/context/AuthContext';

const ProfileBox: React.FC = () => {

    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.auth);

    const { logout } = useAuth();

    if (!user) {
        return null;
    }

    const handleLogout = async () => {
        await logout();
        dispatch(sliceLogout());

        redirect('/');
    }

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <div className={`relative`}>
            <div onClick={toggleProfile}>
                <div
                    className={`rounded-full cursor-pointer`}
                    style={{
                        background: `url(${user.photoURL ?? '/profile.webp'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '50px',
                        height: '50px'
                    }}
                />
            </div>
            <div
                className={`absolute top-0 right-0 z-10 mt-12 w-[300px] rounded-md shadow-lg transition transform ${
                    isProfileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{transitionDuration: '200ms'}}
            >
                <div className="py-2">
                    <div className="w-full max-w-md py-4 px-4 rounded-lg shadow-md bg-gray-200 text-gray-200">
                        <Link href={'/'}>
                            <button
                                className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-foreground p-3 text-sm font-medium hover:bg-background hover:text-gray-800 md:flex-none md:justify-start md:p-2 md:px-3">
                                <UserCircleIcon className="w-6"/>
                                <div className="hidden md:block">Perfil</div>
                            </button>
                        </Link>
                        <div onClick={handleLogout} className={'mt-4'}>
                            <button
                                className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-foreground p-3 text-sm font-medium hover:bg-background hover:text-gray-800 md:flex-none md:justify-start md:p-2 md:px-3">
                                <PowerIcon className="w-6"/>
                                <div className="hidden md:block">Logout</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileBox;