import React from 'react'

const PostLoading = () => {
  return (
    <div className='flex flex-col gap-4 min-w-56 max-w-[460px] w-full border border-white/20 hover:bg-white/5 duration-200 p-4 rounded-xl group mx-auto'>
        <div className='w-full h-fit flex gap-4 items-center select-none'>
            <div className='rounded-full w-16 h-16 bg-zinc-800 animate-pulse' />
            <div className='flex flex-col'>
              <h3 className='text-base w-24 bg-zinc-800'></h3>
              <h3 className='text-sm w-24 bg-zinc-800'></h3>
            </div>
        </div>
        <h1 className='text-xl font-bold w-24 bg-zinc-800 h-8 rounded-md animate-pulse'></h1>
        <div className='text-white/90 w-full bg-transparent h-60 overflow-hidden text-ellipsis text-balance'>
            <div className='w-56 rounded-md bg-zinc-800 h-8 animate-pulse'></div>
        </div>
    </div>
  )
}

export default PostLoading