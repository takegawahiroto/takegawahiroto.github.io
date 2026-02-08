import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, Category } from "./config";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Estimate reading time
      const words = content.split(/\s+/).length;
      const readTime = `${Math.max(1, Math.ceil(words / 200))} min`;

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? "",
        readTime,
        category: (data.category as Category) ?? "Software",
        content,
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}
