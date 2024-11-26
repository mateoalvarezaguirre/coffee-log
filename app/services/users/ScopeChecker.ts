import {User} from "@/app/interfaces/User/User";

export const isAdminUser = (user: User) => {
    for (const scope of user.scopes) {
        if (scope === 'admin') {
            return true;
        }
    }
    return false;
}

export const isSuperUser = (user: User) => {
    for (const scope of user.scopes) {
        if (scope === 'super') {
            return true;
        }
    }
    return false;
}