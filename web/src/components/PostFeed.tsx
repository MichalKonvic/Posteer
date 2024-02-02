"use client";
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Posts from './Posts'
import usePosts from '@/hooks/usePosts';
import PostLoading from './PostLoading';

const PostFeed = () => {
    const {posts,loadMore,hasMore,reload} = usePosts();
  return (
        <InfiniteScroll
            className="flex flex-col gap-12 h-full w-full box-border"
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
                <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            }
        >
            <Posts posts={posts}/>
        </InfiniteScroll>

  )
  
}

export default PostFeed