import PostFeed from "@/components/PostFeed";
import { Post } from "@/hooks/usePosts";
const loadPosts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?offset=${0}&limit=${10}`);
    const data = await response.json() as Post[];
    return {data};
    } catch (error) {
        return {error};         
    }
}
const loadMaxCount = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/count`);
    const data = await response.json() as {count:number};
    return {data:data.count};
  } catch (error) {
      return {error};       
  }
}


export default async function Home() {
  const {data, error} = await loadPosts();
  const {data:dataCount,error:countError} = await loadMaxCount();
  if(error || countError){
    return <div>Error loading posts</div>
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-4 w-full">
      <h1 className="text-6xl font-bold text-blue-500 mb-2">Posteer</h1>
      <h2 className="text-white/80 mb-12 text-lg">Infinite scroll demo</h2>
      <PostFeed initialCount={dataCount} initialPosts={data}/>
    </main>
  );
}
