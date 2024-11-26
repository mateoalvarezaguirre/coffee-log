import {User} from "@/app/interfaces/User/User";
import {addDoc, collection, doc, getDocs, limit, orderBy, query, updateDoc, where} from "firebase/firestore";
import {db} from "@/app/firebase/firebaseConfig";

export const getUser = async (
    uid: string | undefined
): Promise<User | null> => {
    try {
        if (uid === undefined) return null;

        const userCollection = query(
            collection(db, "users"),
            where("uid", "==", uid),
            limit(1)
        );

        const res = await getDocs(userCollection);
        if (res.size) {
            const user = res.docs.map((c) => ({
                uid: c.data().uid,
                email: c.data().email,
                displayName: c.data().displayName,
                photoURL: c.data().photoURL,
                scopes: c.data().scopes,
            }));
            return user[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createUser = async (user: User): Promise<void> => {
    try {
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            scopes: user.scopes,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error(error);
    }
};

export const getUserScopes = async (user: User): Promise<string[]> => {
    try {
        const userCollection = query(
            collection(db, "users"),
            where("uid", "==", user.uid),
            limit(1)
        );

        const res = await getDocs(userCollection);
        if (res.size) {
            const scopes = res.docs.map((c) => c.data().scopes);
            return scopes[0];
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const updateUserScopes = async (
    user: User,
    scopes: string[]
): Promise<void> => {
    try {
        const userCollection = query(
            collection(db, "users"),
            where("uid", "==", user.uid),
            limit(1)
        );

        const res = await getDocs(userCollection);
        if (res.size) {
            const docId = res.docs[0].id;
            await updateDoc(doc(db, "users", docId), {
                scopes: scopes,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersCollection = query(
            collection(db, "users"),
            orderBy("createdAt", "desc")
        );

        const res = await getDocs(usersCollection);

        return res.docs.map((c) => ({
            uid: c.data().uid,
            email: c.data().email,
            displayName: c.data().displayName,
            photoURL: c.data().photoURL,
            scopes: c.data().scopes,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getTotalUsers = async (): Promise<number> => {
    try {
        const usersCollection = query(
            collection(db, "users")
        );

        const res = await getDocs(usersCollection);

        return res.size;
    } catch (error) {
        console.error(error);
        return 0;
    }
}