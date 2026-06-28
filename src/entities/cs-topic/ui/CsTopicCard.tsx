import { CsTopicRow } from "@/entities/cs-topic/ui/CsTopicRow";
import type { CsTopicMeta } from "@/shared/types/cs";
import React from "react";

interface CsTopicCardProps {
  topic: CsTopicMeta;
}

const CsTopicCardInner = ({ topic }: Readonly<CsTopicCardProps>) => (
  <CsTopicRow topic={topic} variant="card" />
);

export const CsTopicCard = React.memo(CsTopicCardInner);
CsTopicCard.displayName = "CsTopicCard";
