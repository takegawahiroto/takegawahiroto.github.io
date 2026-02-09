import { describe, it, expect } from "vitest";
import { markdownToHtml } from "@/lib/markdown";

describe("markdownToHtml - h1変換", () => {
  it("# 見出しが<h1>タグに変換されること", async () => {
    const md = `# 見出しテスト`;
    const html = await markdownToHtml(md);
    expect(html).toContain("<h1>");
    expect(html).toContain("見出しテスト");
  });

  it("# 見出しと## 見出しが共存できること", async () => {
    const md = `# 大見出し\n\n本文\n\n## 小見出し`;
    const html = await markdownToHtml(md);
    expect(html).toContain("<h1>");
    expect(html).toContain("<h2>");
    expect(html).toContain("大見出し");
    expect(html).toContain("小見出し");
  });
});
