import {User} from '@/app/interfaces/User/User';

export interface AuthState {
	user: User | null;
	loading: boolean;
	error: string | null;
}