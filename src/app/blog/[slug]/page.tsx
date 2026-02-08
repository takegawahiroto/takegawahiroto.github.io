import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { CATEGORY_COLORS } from "@/lib/config";
import { markdownToHtml } from "@/lib/markdown";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const catStyle = CATEGORY_COLORS[post.category];
  const htmlContent = await markdownToHtml(post.content);

  return (
    <article className="pt-32 pb-24 px-10 max-w-[800px] mx-auto min-h-screen">
      {/* Back link */}
      <Link
        href="/blog"
        className="no-underline inline-flex items-center gap-2 mb-12 transition-colors duration-200"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "var(--color-text-dim)",
        }}
      >
        ← Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: catStyle.color }}
          />
          <span
            className="text-[11px] font-medium tracking-[0.12em] uppercase"
            style={{
              fontFamily: "var(--font-body)",
              color: catStyle.color,
            }}
          >
            {post.category}
          </span>
        </div>

        <h1
          className="mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 400,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {post.title}
        </h1>

        <div className="flex items-center gap-6">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-ghost)",
            }}
          >
            {post.date}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-ghost)",
            }}
          >
            {post.readTime}
          </span>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-text-dim)",
                  background: "rgba(255,255,255,0.025)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-10"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, rgba(167,139,250,0.2), transparent)",
          }}
        />
      </header>

      {/* Content */}
      <div
        className="prose-custom"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
