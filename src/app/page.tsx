import Link from "next/link";
import { INTERESTS, PROJECTS } from "@/lib/config";
import { getAllPosts } from "@/lib/posts";
import ProjectCard from "@/components/ProjectCard";
import BlogPostItem from "@/components/BlogPostItem";
import SectionHeader from "@/components/SectionHeader";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Gradient orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "8%",
            right: "12%",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "15%",
            left: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(240,171,252,0.08) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "40%",
            left: "45%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(103,232,249,0.06) 0%, transparent 65%)",
            filter: "blur(30px)",
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(167,139,250,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="max-w-[1200px] mx-auto px-10 relative z-10">
          {/* Category pills */}
          <div className="flex gap-2 mb-7 animate-fade-in-up opacity-0 stagger-1">
            {[
              {
                label: "Mathematics",
                c: "#f0abfc",
                bg: "rgba(240,171,252,0.06)",
                b: "rgba(240,171,252,0.15)",
              },
              {
                label: "AI",
                c: "#67e8f9",
                bg: "rgba(103,232,249,0.06)",
                b: "rgba(103,232,249,0.15)",
              },
              {
                label: "Software",
                c: "#fde68a",
                bg: "rgba(253,230,138,0.06)",
                b: "rgba(253,230,138,0.15)",
              },
            ].map((tag) => (
              <span
                key={tag.label}
                className="text-[11px] font-medium tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full"
                style={{
                  fontFamily: "var(--font-body)",
                  color: tag.c,
                  background: tag.bg,
                  border: `1px solid ${tag.b}`,
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <h1
            className="max-w-[800px] mb-7 animate-fade-in-up opacity-0 stagger-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 7vw, 88px)",
              fontWeight: 300,
              color: "#fafafa",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Exploring the
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #c4b5fd 0%, #67e8f9 50%, #f0abfc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              elegant structures
            </span>
            <br />
            behind intelligence
          </h1>

          <p
            className="max-w-[520px] mb-12 animate-fade-in-up opacity-0 stagger-3"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "var(--color-text-muted)",
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: "0.01em",
            }}
          >
            数学の美しさと、AIの可能性と、ソフトウェアの実践を
            ひとつの場所に。理論と実装の交差点を探求しています。
          </p>

          {/* Decorative line */}
          <div className="flex items-center gap-4 animate-fade-in-up opacity-0 stagger-4">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
              }}
            />
            <div
              className="w-[120px] h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(167,139,250,0.4), transparent)",
              }}
            />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
          <div
            className="w-5 h-8 rounded-[10px] flex justify-center pt-1.5"
            style={{ border: "1px solid rgba(167,139,250,0.2)" }}
          >
            <div
              className="w-0.5 h-2 rounded-sm"
              style={{ background: "rgba(167,139,250,0.5)" }}
            />
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section className="py-[100px] px-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 gap-20 items-start">
          <div>
            <span
              className="text-[11px] font-medium tracking-[0.15em] uppercase"
              style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-body)",
              }}
            >
              About
            </span>
            <h2
              className="mt-3 mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 40,
                fontWeight: 400,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              数学とコードで
              <br />
              世界を読み解く
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "var(--color-text-muted)",
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              情報幾何や位相的データ解析といった数学的フレームワークに魅かれ、それらを機械学習やソフトウェアシステムの設計に応用することに情熱を注いでいます。理論の美しさを損なわずに、実用的なツールへ昇華させること
              — それが探求のテーマです。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {INTERESTS.map((item) => (
              <div
                key={item.label}
                className="rounded-xl flex items-center gap-3 transition-all duration-300"
                style={{
                  padding: "18px 20px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    color: "var(--color-accent)",
                  }}
                >
                  {item.icon}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--color-text-secondary)",
                    fontWeight: 400,
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section className="py-[100px] px-10 max-w-[1200px] mx-auto">
        <SectionHeader
          label="Projects"
          title="Selected Works"
          right={
            <Link
              href="/projects"
              className="no-underline pb-0.5"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "var(--color-text-muted)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              View all →
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-5">
          {PROJECTS.slice(0, 4).map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      {/* ─── Recent Posts ─── */}
      {recentPosts.length > 0 && (
        <section className="py-[100px] px-10 max-w-[1200px] mx-auto">
          <SectionHeader
            label="Blog"
            title="Latest Writings"
            right={
              <Link
                href="/blog"
                className="no-underline pb-0.5"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--color-text-muted)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                View all →
              </Link>
            }
          />
          <div className="flex flex-col gap-1">
            {recentPosts.map((post) => (
              <BlogPostItem key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
