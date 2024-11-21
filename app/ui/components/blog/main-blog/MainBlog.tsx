import React from 'react'
import background from '@/public/blogs/latte-art.webp';
import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/app/interfaces/Blog/Blog';

const MainBlog = () => {

    const blog: Blog = {
        title: 'El Arte en Cada Taza: Guía Completa de Latte Art para Principiantes',
        subtitle: 'Aprende los fundamentos, técnicas y secretos del latte art para crear diseños impresionantes en tu café.',
        slug: 'el-arte-en-cada-taza-guia-completa-de-latte-art-para-principiantes',
        category: 'Latte Art',
        categorySlug: 'latte-art',
        date: '2021-09-01',
        readingTime: '5 min',
        content: 'Aprende los fundamentos, técnicas y secretos del latte art para crear diseños impresionantes en tu café. El latte art es una forma de arte que se ha vuelto muy popular en los últimos años. Se trata de crear diseños en la superficie de un café con leche, utilizando la crema de la leche como lienzo. En este artículo, te enseñaremos los fundamentos del latte art, las técnicas básicas que necesitas saber y algunos secretos para crear diseños impresionantes en tu café. ¡Vamos a empezar!'
    }

    return (
        <article className="flex flex-col items-start justify-end relative h-[60vh] sm:h-[85vh]"><div className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0 w-full"></div>
            <Image
                src={background}
                alt="Latter art"
                layout="fill"
                objectFit="cover"
                className="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent rounded-[1rem]"
            />
            <div className="w-full lg:w-3/4 p-6 sm:p-8 md:p-12  lg:p-16 flex flex-col items-start justify-center z-0 text-white">
                <Link
                    href={`/categories/${blog.categorySlug}`}
                    className="inline-block py-2 sm:py-3 px-6 sm:px-10  bg-dark text-light rounded-full capitalize font-semibold border-2 border-solid border-light hover:scale-105 transition-all ease duration-200 text-sm sm:text-base"
                >
                    {blog.category}
                </Link>
                <Link className="mt-6" href={`/blogs/${blog.slug}`}>
                    <h1 className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
                        <span className="bg-gradient-to-r from-accent to-accent dark:from-accentDark/50  dark:to-accentDark/50 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ">{blog.title}</span>
                    </h1>
                </Link>
                <p className="hidden  sm:inline-block mt-4 md:text-lg lg:text-xl font-in">{blog.subtitle}
                </p>
            </div>
        </article>
    )
};

export default MainBlog