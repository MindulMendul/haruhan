import { convertQwertyToHangul, disassemble, getChoseong } from "es-hangul";

type SearchableItem = {
  title: string;
  subtitle?: string;
  cardSummary?: string;
  body?: string;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function toQwertyHangul(value: string) {
  try {
    return convertQwertyToHangul(value);
  } catch {
    return value;
  }
}

function getSearchNeedles(query: string) {
  const normalized = normalize(query);
  const qwertyConverted = normalize(toQwertyHangul(query));
  return Array.from(new Set([normalized, qwertyConverted].filter(Boolean)));
}

export function matchesSearchQuery(item: SearchableItem, query: string) {
  const needles = getSearchNeedles(query);
  if (needles.length === 0) return true;

  const haystack = normalize([item.title, item.subtitle, item.cardSummary, item.body].filter(Boolean).join(" "));
  const qwertyHaystack = normalize(toQwertyHangul(haystack));
  const disassembledHaystack = normalize(disassemble(haystack));
  const choseongHaystack = normalize(getChoseong(haystack));

  return needles.some((needle) => {
    const disassembledNeedle = normalize(disassemble(needle));
    const choseongNeedle = normalize(getChoseong(needle));

    return (
      haystack.includes(needle) ||
      qwertyHaystack.includes(needle) ||
      disassembledHaystack.includes(disassembledNeedle) ||
      choseongHaystack.includes(needle) ||
      (choseongNeedle.length > 0 && choseongHaystack.includes(choseongNeedle))
    );
  });
}

