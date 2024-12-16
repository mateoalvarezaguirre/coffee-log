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
            <div className='max-w-screen-2xl mx-auto px-4'>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default AppLayout