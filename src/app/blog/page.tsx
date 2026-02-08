import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import SectionHeader from "@/components/SectionHeader";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="pt-32 pb-24 px-10 max-w-[1200px] mx-auto min-h-screen">
      <SectionHeader label="Blog" title="Writings & Notes" />
      <BlogList posts={posts} />
    </section>
  );
}
