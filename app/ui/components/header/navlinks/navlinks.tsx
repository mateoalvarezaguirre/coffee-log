import Link from "next/link";

const links = [
    { name: 'Home', href: '/' },
    {
        name: 'Blogs',
        href: '/blogs',
    },
    { name: 'About', href: '/about' },
];

export default function NavLinks() {

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
        </>
    );
}