import PostFeed from "@/components/PostFeed";
import PostLoading from "@/components/PostLoading";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 w-full">
      <h1 className="text-6xl font-bold text-blue-500 mb-2">Posteer</h1>
      <h2 className="text-white/80 mb-12 text-lg">Infinite scroll demo</h2>
      <PostFeed/>
    </main>
  );
}
