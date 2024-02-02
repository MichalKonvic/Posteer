"use client";
import { useState,useEffect, useCallback } from "react";


export interface Post {
    id:string,
    user: {
        id:string,
        displayName:string,
        username:string,
        avatar:string,
    },
    title:string,
    content:string,
    createdAt:string,
    updatedAt:string,
}

const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [limit, setLimit] = useState<number>(10);
    const [offset, setOffset] = useState<number>(0);
    const [maxCount, setMaxCount] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const loadMaxCount = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/count`);
            const data = await response.json() as {count:number};
            setMaxCount(data.count);
        } catch (error) {
            console.error("Error loading max count");            
        }
        setIsLoading(false);
    }, []);
    const loadLocations = useCallback(async () => {
        if(limit + offset > maxCount) return;
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?offset=${offset}&limit=${limit}`);
            const data = await response.json();
            setPosts((prevPosts) => [...prevPosts, ...data]);
        } catch (error) {
            console.error("Error loading posts");              
        }
        setIsLoading(false);
    }, [offset,limit, maxCount]);
    useEffect(() => {
        loadMaxCount();
    }, [loadMaxCount]);
    useEffect(() => {
        loadLocations();
    }, [loadLocations]);

    // Checks if has more posts to load
    useEffect(() => {
        if(isLoading) return;
        if(offset + limit >= maxCount){
            setHasMore(false);
        }
    }, [offset, limit, maxCount,isLoading]);
    const loadMore = useCallback(() => {
        if(offset + limit < maxCount){
            setOffset((prevOffset) => prevOffset + limit);
        }else{
            setHasMore(false);
        }
    }, [offset, limit, maxCount]);

    const reload = useCallback(() => {
        setOffset(0);
        setPosts([]);
        setHasMore(true);
        (async () => {
            await loadMaxCount();
            await loadLocations();
        })();
    },[loadMaxCount,loadLocations])

    return {posts, isLoading, hasMore, loadMore,reload};
};
export default usePosts;