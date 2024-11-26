import Link from "next/link";
import {useAppSelector} from "@/app/store/store";
import {isAdminUser} from "@/app/services/users/ScopeChecker";

const links = [
    { name: 'Home', href: '/' },
    {
        name: 'Blogs',
        href: '/blogs',
    },
    { name: 'Nosotros', href: '/about' },
];

export default function NavLinks() {

    const { user } = useAppSelector((state) => state.auth);

    const shouldShowDashboardLink = user && isAdminUser(user);

    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                    >
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
            {shouldShowDashboardLink && (
                <Link
                    href="/dashboard"
                >
                    <p className="hidden md:block">Dashboard</p>
                </Link>
            )}
        </>
    );
}