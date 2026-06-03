import {
  DEFAULT_OG_IMAGE,
  DEFAULT_SEO_DESCRIPTION,
  DEFAULT_SEO_TITLE,
  SEO_ROBOTS,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/constants/seo";
import React from "react";
import { Platform } from "react-native";

export type JsonLd = Record<string, unknown>;

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  robots?: string;
  jsonLd?: JsonLd | JsonLd[];
};

export function getCanonicalUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, SITE_ORIGIN).toString();
}

export function formatSeoTitle(title: string) {
  return title === SITE_NAME ? DEFAULT_SEO_TITLE : `${title} | ${SITE_NAME}`;
}

export function stripMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[#>*_~|]/g, " ")
    .replace(/-{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function toSeoDescription(value: string, maxLength = 155) {
  const plainText = stripMarkdown(value);
  if (plainText.length <= maxLength) return plainText;

  return `${plainText.slice(0, maxLength - 1).trimEnd()}…`;
}

export function buildOrganizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: DEFAULT_OG_IMAGE,
  };
}

export function buildWebSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description: DEFAULT_SEO_DESCRIPTION,
    inLanguage: "ko-KR",
  };
}

export function buildWebPageJsonLd({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: getCanonicalUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
    inLanguage: "ko-KR",
  };
}

export function buildArticleJsonLd({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: getCanonicalUrl(path),
    mainEntityOfPage: getCanonicalUrl(path),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_OG_IMAGE,
      },
    },
    keywords,
    inLanguage: "ko-KR",
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

export function buildItemListJsonLd(items: { name: string; path: string; description?: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getCanonicalUrl(item.path),
      name: item.name,
      description: item.description,
    })),
  };
}

function serializeJsonLd(jsonLd: JsonLd) {
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}

export function Seo({
  title,
  description,
  path = "/",
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  type = "website",
  robots = SEO_ROBOTS.INDEX,
  jsonLd,
}: SeoProps) {
  if (Platform.OS !== "web") return null;

  const canonicalUrl = getCanonicalUrl(path);
  const fullTitle = formatSeoTitle(title);
  const jsonLdItems = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return React.createElement(
    React.Fragment,
    null,
    React.createElement("title", { key: "title" }, fullTitle),
    React.createElement("meta", { key: "description", name: "description", content: description }),
    keywords.length > 0
      ? React.createElement("meta", { key: "keywords", name: "keywords", content: keywords.join(", ") })
      : null,
    React.createElement("meta", { key: "robots", name: "robots", content: robots }),
    React.createElement("link", { key: "canonical", rel: "canonical", href: canonicalUrl }),
    React.createElement("meta", { key: "og:type", property: "og:type", content: type }),
    React.createElement("meta", { key: "og:url", property: "og:url", content: canonicalUrl }),
    React.createElement("meta", { key: "og:title", property: "og:title", content: fullTitle }),
    React.createElement("meta", { key: "og:description", property: "og:description", content: description }),
    React.createElement("meta", { key: "og:image", property: "og:image", content: image }),
    React.createElement("meta", { key: "og:site_name", property: "og:site_name", content: SITE_NAME }),
    React.createElement("meta", { key: "twitter:card", name: "twitter:card", content: "summary_large_image" }),
    React.createElement("meta", { key: "twitter:title", name: "twitter:title", content: fullTitle }),
    React.createElement("meta", { key: "twitter:description", name: "twitter:description", content: description }),
    React.createElement("meta", { key: "twitter:image", name: "twitter:image", content: image }),
    jsonLdItems.map((item, index) =>
      React.createElement("script", {
        key: `json-ld-${index}`,
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: serializeJsonLd(item) },
      })
    )
  );
}
