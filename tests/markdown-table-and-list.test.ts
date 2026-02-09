import { describe, it, expect } from "vitest";
import { markdownToHtml } from "@/lib/markdown";

describe("markdownToHtml - テーブル変換", () => {
  it("GFMテーブル構文が<table>タグに変換されること", async () => {
    const md = `
| Header1 | Header2 |
| --- | --- |
| Cell1 | Cell2 |
`;
    const html = await markdownToHtml(md);
    expect(html).toContain("<table>");
    expect(html).toContain("<th>");
    expect(html).toContain("<td>");
    expect(html).toContain("Header1");
    expect(html).toContain("Cell1");
  });

  it("1列テーブルが正しく変換されること", async () => {
    const md = `
| 定義 |
| --- |
| 内容テキスト |
`;
    const html = await markdownToHtml(md);
    expect(html).toContain("<table>");
    expect(html).toContain("定義");
    expect(html).toContain("内容テキスト");
  });
});

describe("markdownToHtml - リスト変換", () => {
  it("箇条書きが<ul><li>タグに変換されること", async () => {
    const md = `
- 項目1
- 項目2
- 項目3
`;
    const html = await markdownToHtml(md);
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>");
    expect(html).toContain("項目1");
  });

  it("番号付きリストが<ol><li>タグに変換されること", async () => {
    const md = `
1. 第一
2. 第二
3. 第三
`;
    const html = await markdownToHtml(md);
    expect(html).toContain("<ol>");
    expect(html).toContain("<li>");
    expect(html).toContain("第一");
  });
});
