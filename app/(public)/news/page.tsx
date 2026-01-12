import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllPosts } from "@/lib/sanity/queries";

export default async function NewsPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">News</p>
        <h1 className="text-3xl font-semibold">Updates and announcements</h1>
        <p className="text-muted-foreground">
          Hearings, votes, wins, and ways to help.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {(posts ?? []).map((post: { _id: string; title: string; slug: string; excerpt?: string; publishedAt?: string }) => (
          <Card key={post._id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : "Draft"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.excerpt ?? "Update from the alliance."}
              </p>
              <Link
                href={`/news/${post.slug}`}
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Read more
              </Link>
            </CardContent>
          </Card>
        ))}
        {(posts ?? []).length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>No posts yet</CardTitle>
              <CardDescription>
                News and updates will be posted here.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
