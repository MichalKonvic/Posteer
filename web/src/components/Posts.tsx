"use client";
import {Post as PostI} from '@/hooks/usePosts';
import React from 'react'
import Post from './Post';
import { FC } from 'react';

interface Props {
  posts: PostI[]
}

const Posts:FC<Props> = ({posts}) => {
  return posts.map((post) => <Post key={post.id} post={post} />)
}

export default Posts