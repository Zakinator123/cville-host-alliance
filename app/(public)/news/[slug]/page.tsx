import { RichText } from "@/components/RichText";
import { getPostBySlug } from "@/lib/content";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">News</p>
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="text-muted-foreground">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString()
            : "Draft"}
        </p>
      </div>

      {post.content ? (
        <RichText value={post.content} />
      ) : (
        <p className="text-muted-foreground">Content coming soon.</p>
      )}
    </div>
  );
}
