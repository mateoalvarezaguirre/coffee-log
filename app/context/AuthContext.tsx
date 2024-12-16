'use client';

import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from '../interfaces/User/User';
import { GoogleAuthProvider, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { getUser, createUser } from "@/app/services/users/UserApi";
import { auth as fbAuth } from "@/app/firebase/firebaseConfig";

interface AuthContextProps {
	auth: User | null;
	loading: boolean;
	loginWithGoogle: () => Promise<void>;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
	undefined
);

export const AuthProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [auth, setAuth] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const loginWithGoogle = async () => {
		setLoading(true);
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(fbAuth, provider);
		const user = result.user;

		let localUser = await getUser(user.uid);

		if (!localUser) {
			localUser = {
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL,
				scopes: ["reader"],
			};
			await createUser(localUser);
		}

		setAuth(localUser);
		setLoading(false);
	};

	const onAuthStateChanged = async (fbUser: unknown) => {
		if (fbUser) {

			const user = fbUser as FirebaseUser;

			let localUser = await getUser(user.uid);

			if (!localUser) {
				localUser = {
					uid: user.uid,
					email: user.email,
					displayName: user.displayName,
					photoURL: user.photoURL,
					scopes: ["reader"],
				};
				await createUser(localUser);
			}

			setAuth(localUser);
			setLoading(false);
		} else {
			setAuth(null)
			setLoading(false)
		}
	}

	const logout = async () => {
		await signOut(fbAuth);
		setAuth(null);
	};

	useEffect(() => {
		const listener = fbAuth.onAuthStateChanged( async (user) => {
			await onAuthStateChanged(user);
		});

		return () => listener();
	}, [])


	return (
		<AuthContext.Provider value={{ auth, loading, loginWithGoogle, logout }}>
			{children}
		</AuthContext.Provider>
	)
};

export const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth debe ser usado dentro de un AuthProvider");
	}
	return context;
};
