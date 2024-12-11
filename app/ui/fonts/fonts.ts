import { Roboto_Mono, Poppins as PoppinsFont, Space_Mono } from 'next/font/google';

export const RobotoMono = Roboto_Mono({
    weight: ["400", "700"],
	subsets: ["latin"],
});

export const Poppins = PoppinsFont({
    weight: ["400", "700"],
    subsets: ["latin"],
})

export const SpaceMono = Space_Mono({
    weight: ["400", "700"],
    subsets: ["latin"],
})