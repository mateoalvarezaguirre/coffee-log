import React from 'react'
import Header from '@/app/ui/components/header/header';
import Footer from '@/app/ui/components/footer/footer';

const AppLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default AppLayout