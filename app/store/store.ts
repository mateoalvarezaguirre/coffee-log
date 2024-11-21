import { configureStore, UnknownAction } from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authSlice} from "@/app/store/slices/auth/authSlice";
import {AuthState} from '@/app/interfaces/Auth/Auth';
import { ThunkDispatch } from 'redux-thunk';

export interface AppStore {
    auth: AuthState
}

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, undefined, UnknownAction> & typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
