import UserCard from '@/components/UserCard';
import { User } from '@/hooks/useUser';
import { error } from 'console';
import Link from 'next/link';
import React from 'react'


const LoadUser = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user?id=${id}`);
        if(!response.ok) throw new Error("Failed to fetch user!");
        const data = await response.json() as User;
        return {data};
    } catch (error) {
        console.log(error)
        return { error: "Failed to fetch user!" };
    }
}


const UserPage = async ({
    params,
    searchParams,
  }: {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }) => {
    const {id} = params;
    const {data,error} = await LoadUser(id);
    if(error) return <div>{error}</div>
  return (
    <div className='w-full h-full'>
        <Link href='/'>
            <h1 className='text-xl text-white/90 cursor-pointer duration-150 p-2 m-2 rounded-md hover:bg-white/10 w-fit h-fit'>⬅️Back</h1>
        </Link>        
        <UserCard  initUser={data!} />
    </div>
  )
}

export default UserPage