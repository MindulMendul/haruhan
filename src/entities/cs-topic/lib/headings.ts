export type WikiHeading = {
  id: string;
  level: number;
  title: string;
};

function cleanHeading(value: string) {
  return value.replace(/[#*_`]/g, "").trim();
}

/** 마크다운 본문에서 ##(h2), ###(h3) 제목만 추출해 목차 항목으로 만든다. */
export function getWikiHeadings(body: string): WikiHeading[] {
  const headings = body.split("\n").flatMap((line) => {
    const level = line.startsWith("### ") ? 3 : line.startsWith("## ") ? 2 : 0;
    if (level === 0) return [];

    const title = cleanHeading(line.slice(level + 1));
    if (!title) return [];

    return [{ level, title }];
  });

  return headings.map((heading, index) => ({
    id: `${index + 1}`,
    ...heading,
  }));
}
