import { useCallback, useEffect, useState } from "react";
import { Post } from "./usePosts";

export type User = Post["user"];
const useUser = (id:string, initialUser?:User) => {
    const [user, setUser] = useState<User | null>(initialUser || null)
    const [loading, setLoading] = useState(true);
    const getUser = useCallback(async () => {
        if(!id) return;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user?id=${id}`);
            const data = await response.json() as User;
            setUser(data);
        } catch (e) {
            console.error("Unable to fetch user data!");
        }
        setLoading(false);
    }, [id]);
    useEffect(() => {
        if(!user)
            getUser();
    }, [getUser,user])
    return {
        user,
        loading,
        reload: getUser
    }
};
export default useUser;