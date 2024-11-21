import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import { logout } from "./authSlice";
import {AppDispatch} from '@/app/store/store';
import {getUser, createUser} from '@/app/services/users/UserApi';

export const loginWithGoogle = async () => {
	const provider = new GoogleAuthProvider();

	const result = await signInWithPopup(auth, provider);
	const user = result.user;

	let localUser = await getUser(user.uid);

	if (localUser === null) {
		localUser = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			scopes: ['reader'],
		}

		await createUser(localUser);
	}

	return localUser;
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
	await signOut(auth);
	dispatch(logout());
};
