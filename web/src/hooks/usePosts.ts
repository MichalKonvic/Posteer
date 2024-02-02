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

const usePosts = (initMaxCount?:number, initPosts?: Post[]) => {
    const [posts, setPosts] = useState<Post[]>(initPosts || []);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [limit, setLimit] = useState<number>(10);
    const [maxCount, setMaxCount] = useState<number>(initMaxCount || 0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const loadMaxCount = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/count`);
            const data = await response.json() as {count:number};
            setMaxCount(data.count);
            setHasMore(data.count > posts.length);
        } catch (error) {
            console.error("Error loading max count");            
        }
        setIsLoading(false);
    }, [posts.length]);
    const loadLocations = useCallback(async () => {
        if(posts.length === maxCount) return;
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?offset=${posts.length}&limit=${limit}`);
            const data = await response.json() as Post[];
            setPosts((prevPosts) => {
                const filteredPosts = data.filter((post) => !prevPosts.some((newPost:Post) => newPost.id === post.id));
                const joinedPosts = [...prevPosts, ...filteredPosts];
                // Determine if has more
                if(joinedPosts.length < maxCount){
                    setHasMore(true);
                }else{
                    setHasMore(false);
                }
                return [...joinedPosts]
            });
        } catch (error) {
            console.error("Error loading posts");              
        }
        setIsLoading(false);
    }, [posts.length,limit,maxCount]);
    
    useEffect(() => {
        loadMaxCount();
    }, [loadMaxCount]);

    // Initial load
    useEffect(() => {
        if(maxCount > 0 && posts.length === 0){
            loadLocations();
        }
    },[loadLocations,maxCount,posts.length])


    const loadMore = useCallback(() => {
        loadLocations();
    }, [loadLocations]);

    const reload = useCallback(() => {
        console.log("Reloading")
        setPosts([]);
        setMaxCount(0);
        setHasMore(true);
        (async () => {
            await loadMaxCount();
            await loadLocations();
        })
    },[loadLocations,loadMaxCount])

    return {posts, isLoading, hasMore, loadMore,reload};
};
export default usePosts;