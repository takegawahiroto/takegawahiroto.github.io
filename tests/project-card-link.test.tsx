import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/config";
import type { Project } from "@/lib/config";

afterEach(cleanup);

// ─── 1. コンポーネントのレンダリングテスト ───

describe("ProjectCard", () => {
  const projectWithLink: Project = {
    name: "Test Project",
    description: "A test project",
    tech: ["TypeScript"],
    icon: "∂",
    status: "Active",
    link: "https://github.com/example/test",
  };

  const projectWithoutLink: Project = {
    name: "No Link Project",
    description: "A project without link",
    tech: ["Python"],
    icon: "∀",
    status: "Beta",
  };

  it("linkがある場合、<a>タグでレンダリングされること", () => {
    render(<ProjectCard project={projectWithLink} />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/example/test");
  });

  it("linkがある場合、target='_blank' と rel='noopener noreferrer' が設定されること", () => {
    render(<ProjectCard project={projectWithLink} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("linkがない場合、<a>タグが存在しないこと", () => {
    render(<ProjectCard project={projectWithoutLink} />);
    const link = screen.queryByRole("link");
    expect(link).not.toBeInTheDocument();
  });

  it("linkの有無にかかわらず、プロジェクト名が表示されること", () => {
    const { unmount } = render(<ProjectCard project={projectWithLink} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    unmount();

    render(<ProjectCard project={projectWithoutLink} />);
    expect(screen.getByText("No Link Project")).toBeInTheDocument();
  });
});

// ─── 2. PROJECTS設定のリンクアクセシビリティテスト ───

describe("PROJECTS config links", () => {
  const projectsWithLinks = PROJECTS.filter((p) => p.link);

  it("linkが設定されているプロジェクトが存在すること", () => {
    expect(projectsWithLinks.length).toBeGreaterThan(0);
  });

  it.each(projectsWithLinks)(
    "$name のリンク ($link) にアクセスできること",
    async ({ link }) => {
      const res = await fetch(link!, { method: "HEAD", redirect: "follow" });
      expect(res.status).toBeGreaterThanOrEqual(200);
      expect(res.status).toBeLessThan(400);
    },
    10000,
  );
});
