"use client";
import React, { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Posts from './Posts'
import usePosts, { Post } from '@/hooks/usePosts';
import PostLoading from './PostLoading';

interface Props {
    initialPosts?: Post[];
    initialCount?: number;
}

const PostFeed:FC<Props> = ({initialCount,initialPosts}) => {
    const {posts,loadMore,hasMore,reload} = usePosts(initialCount,initialPosts);
  return (
    <InfiniteScroll
        dataLength={posts.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<PostLoading/>}
        endMessage={
            <p className="text-center text-gray-500 text-xl">Yay! You have seen it all</p>
        }
        refreshFunction={reload}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
            <h3 className='' style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
    >
        <></>
        <Posts posts={posts}/>
    </InfiniteScroll>

  )
  
}

export default PostFeed