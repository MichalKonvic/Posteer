import { Post as PostI } from '@/hooks/usePosts'
import Image from 'next/image'
import React, { FC } from 'react'
interface Props {
    post: PostI
}

const Post:FC<Props> = ({post}) => {
  return (
    <div className='flex flex-col gap-4 w-full min-w-56 max-w-[460px] border border-white/20 hover:bg-white/5 duration-200 p-4 rounded-xl group'>
        <div className='w-full h-fit flex gap-4 items-center select-none'>
            <img src={post.user.avatar} alt={post.user.avatar} className='rounded-full w-16 h-16' />
            <div className='flex flex-col'>
              <h3 className='text-base'>{post.user.displayName}</h3>
              <h3 className='text-sm text-white/50 hover:text-blue-400 cursor-pointer duration-150'>@{post.user.username}</h3>
            </div>
        </div>
        <h1 className='text-xl font-bold text-white/95'>{post.title}</h1>
        <p className='text-white/90 h-60 w-full overflow-hidden text-ellipsis text-balance'>{post.content}</p>
    </div>
  )
}

export default Post