import { AuthState } from "@/app/interfaces/Auth/Auth";
import { User } from "@/app/interfaces/User/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/app/store/store";
import { loginWithGoogle } from '@/app/store/slices/auth/authActions';

interface exception {
	message: string;
}

const saveUserToLocalStorage = (user: User | null) => {
	if (user) {
		sessionStorage.setItem("user", JSON.stringify(user));
	} else {
		sessionStorage.removeItem("user");
	}
};

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, action: PayloadAction<User>) => {
			saveUserToLocalStorage(action.payload);
			state.user = action.payload;
			state.loading = false;
			state.error = null;
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.loading = false;
			state.error = null;
		},
		loginFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.user = null;
			state.error = null;
			saveUserToLocalStorage(null);
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } = authSlice.actions;

export const authWithGoogle = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(loginStart());

		const user = await loginWithGoogle();

		dispatch(loginSuccess(user));

	} catch (error) {
		const err = error as exception;
		dispatch(loginFailure(err.message));
	}
};



export const getUser = () => (dispatch: AppDispatch) => {
	dispatch(loginStart());

	const userData = sessionStorage.getItem("user");
	const user = userData ? JSON.parse(userData) : null;

	dispatch(setUser(user));

	return user;
};

export default authSlice.reducer;
