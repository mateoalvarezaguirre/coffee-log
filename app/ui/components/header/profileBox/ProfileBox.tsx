import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/store/store";
import Image from "next/image";
import {PowerIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import {logout} from "@/app/store/slices/auth/authSlice";
import {redirect} from "next/navigation";
import Link from "next/link";

const ProfileBox: React.FC = () => {

    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.auth);

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        dispatch(logout());

        redirect('/');
    }

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <div className={`relative`}>
            <div onClick={toggleProfile}>
                <Image
                    className={`rounded-full cursor-pointer`}
                    src={user.photoURL ?? '/profile.webp'}
                    alt="profile"
                    width={50}
                    height={50}
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