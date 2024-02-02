"use client";
import useUser, { User } from '@/hooks/useUser';
import React, { FC } from 'react'
import { motion } from 'framer-motion';

interface Props {
    initUser: User;
}

const UserCard: FC<Props> = ({initUser}) => {
    const {user,loading} = useUser(initUser.id,initUser)
  return (
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 w-full min-w-56 max-w-[460px] border border-white/20 hover:bg-white/5 duration-200 p-4 rounded-xl group'>
        <div className='w-full h-fit flex gap-4 items-center select-none relative'>
                 <motion.img layout layoutId={user?.avatar} src={user?.avatar} alt={user?.avatar} className='w-24 h-24 rounded-xl' />
            <div className='flex flex-col gap-2'>
              <h3 className='text-2xl'>{user?.displayName}</h3>
              <h3 className='text-sm text-white/50 hover:text-blue-400 cursor-pointer duration-150'>@{user?.username}</h3>
            </div>
        </div>
    </div>
  )
}

export default UserCard