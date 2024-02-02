"use client";
import {Post as PostI} from '@/hooks/usePosts';
import React from 'react'
import Post from './Post';
import { FC } from 'react';

interface Props {
  posts: PostI[]
}

const Posts:FC<Props> = ({posts}) => {
  if(posts.length === 0) return null;
  return <div className='flex w-full flex-col gap-8 items-center'>
    {posts.map((post) => <Post key={post.id} post={post} />)}
  </div>
}

export default Posts