"use client";

import { Provider } from 'react-redux';
import { store } from '@/app/store/store';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Providers = ({ children }: Props) => {
    return <Provider store={store}>{children}</Provider>;
};

export default Providers;