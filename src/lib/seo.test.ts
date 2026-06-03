import { describe, expect, it } from "vitest";
import {
  DEFAULT_SEO_TITLE,
  DEFAULT_SEO_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SEO_ROBOTS,
  SITE_ORIGIN,
} from "@/constants/seo";
import { getJobPositionRoute } from "@/constants/routes";
import {
  Seo,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildItemListJsonLd,
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  formatSeoTitle,
  getCanonicalUrl,
  stripMarkdown,
  toSeoDescription,
} from "./seo";

function getSeoChildren(element: ReturnType<typeof Seo>) {
  const props = (element as unknown as { props: { children: unknown } }).props;
  return (Array.isArray(props.children) ? props.children : [props.children]).flat();
}

describe("seo helpers", () => {
  it("상대 경로를 canonical URL로 변환한다", () => {
    expect(getCanonicalUrl("/cs/seo")).toBe(`${SITE_ORIGIN}/cs/seo`);
    expect(getCanonicalUrl(getJobPositionRoute("fe"))).toBe(`${SITE_ORIGIN}/job-positions?position=fe`);
  });

  it("서비스명 단독 제목은 기본 SEO 제목으로 변환한다", () => {
    expect(formatSeoTitle("하루한")).toBe(DEFAULT_SEO_TITLE);
    expect(formatSeoTitle("공통 CS")).toBe("공통 CS | 하루한");
  });

  it("markdown 문법을 검색 설명용 일반 텍스트로 정리한다", () => {
    expect(stripMarkdown("## 제목\n[링크](https://example.com)와 `코드`")).toBe("제목 링크와 코드");
  });

  it("긴 설명은 지정 길이에 맞춰 줄인다", () => {
    const description = toSeoDescription("가".repeat(200), 20);

    expect(description).toHaveLength(20);
    expect(description.endsWith("…")).toBe(true);
  });

  it("article JSON-LD에 핵심 URL과 제목을 포함한다", () => {
    const jsonLd = buildArticleJsonLd({
      title: "SEO 면접 노트",
      description: "검색 엔진 최적화 노트",
      path: "/cs/seo",
      keywords: ["SEO", "CS 면접"],
    });

    expect(jsonLd).toMatchObject({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "SEO 면접 노트",
      url: `${SITE_ORIGIN}/cs/seo`,
      mainEntityOfPage: `${SITE_ORIGIN}/cs/seo`,
      keywords: ["SEO", "CS 면접"],
      publisher: {
        logo: {
          url: DEFAULT_OG_IMAGE,
        },
      },
    });
  });

  it("site 기본 JSON-LD를 만든다", () => {
    expect(buildOrganizationJsonLd()).toMatchObject({
      "@type": "Organization",
      name: "하루한",
      url: SITE_ORIGIN,
      logo: DEFAULT_OG_IMAGE,
    });
    expect(buildWebSiteJsonLd()).toMatchObject({
      "@type": "WebSite",
      description: DEFAULT_SEO_DESCRIPTION,
      inLanguage: "ko-KR",
    });
    expect(buildWebPageJsonLd({ title: "공통 CS", description: "CS 노트", path: "/cs" })).toMatchObject({
      "@type": "WebPage",
      name: "공통 CS",
      url: `${SITE_ORIGIN}/cs`,
      isPartOf: {
        name: "하루한",
      },
    });
  });

  it("breadcrumb와 item list JSON-LD 순서를 유지한다", () => {
    const breadcrumb = buildBreadcrumbJsonLd([
      { name: "홈", path: "/" },
      { name: "공통 CS", path: "/cs" },
    ]);
    const itemList = buildItemListJsonLd([
      { name: "SEO", path: "/cs/seo", description: "검색 최적화" },
      { name: "CSR & SSR", path: "/cs/csr-ssr" },
    ]);

    expect(breadcrumb.itemListElement).toMatchObject([
      { position: 1, name: "홈" },
      { position: 2, name: "공통 CS" },
    ]);
    expect(itemList.itemListElement).toMatchObject([
      { position: 1, name: "SEO", url: `${SITE_ORIGIN}/cs/seo` },
      { position: 2, name: "CSR & SSR", url: `${SITE_ORIGIN}/cs/csr-ssr` },
    ]);
  });

  it("Seo 컴포넌트가 웹 메타 태그와 JSON-LD script를 반환한다", () => {
    const element = Seo({
      title: "공통 CS",
      description: "CS 면접 노트",
      path: "/cs",
      keywords: ["CS", "면접"],
      jsonLd: [
        { "@context": "https://schema.org", "@type": "WebPage", name: "공통 CS" },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", name: "breadcrumb" },
      ],
    });
    const children = getSeoChildren(element);

    expect(children).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "title" }),
        expect.objectContaining({ type: "meta", props: expect.objectContaining({ name: "description", content: "CS 면접 노트" }) }),
        expect.objectContaining({ type: "link", props: expect.objectContaining({ rel: "canonical", href: `${SITE_ORIGIN}/cs` }) }),
        expect.objectContaining({ type: "script", props: expect.objectContaining({ type: "application/ld+json" }) }),
      ])
    );
    expect(children.filter((child) => typeof child === "object" && child && "type" in child && child.type === "script")).toHaveLength(2);
  });

  it("Seo 컴포넌트는 선택 값이 없을 때 기본 이미지와 robots를 사용한다", () => {
    const element = Seo({
      title: "설정",
      description: "설정 화면",
      path: "/settings",
      robots: SEO_ROBOTS.NO_INDEX,
    });
    const children = getSeoChildren(element);

    expect(children).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "meta", props: expect.objectContaining({ name: "robots", content: SEO_ROBOTS.NO_INDEX }) }),
        expect.objectContaining({ type: "meta", props: expect.objectContaining({ property: "og:image", content: DEFAULT_OG_IMAGE }) }),
      ])
    );
  });
});
