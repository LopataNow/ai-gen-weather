import { Button } from "@/components/ui/button";
import { getArticle } from "./calls/weather-article-gen";
import { unstable_cache } from "next/cache";
import Link from "next/link";

const getArticleCache = unstable_cache(
  async (style: string) => {
    return await getArticle(style).then(res=>res.data);
  },
  ['posts'],
  { revalidate: 3600 * 48, tags: ['posts'] }
)

export default async function Home(props: {
  searchParams?: Promise<{
    style?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const style = searchParams?.style || 'fantastic';
  const article = await getArticleCache(style);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center space-x-4 mb-4">
        <Link href="/?style=fantastic">
          <Button>fantastic</Button>
        </Link>
        <Link href="/?style=tabloids">
          <Button>tabloids</Button>
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">{article.headline}</h1>
        <h2 className="text-xl font-semibold mb-4">{article.subtitle}</h2>
        <section className="text-gray-700">{article.body}</section>
      </div>
    </div>
  );
}
