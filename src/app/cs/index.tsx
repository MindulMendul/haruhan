import { CsTopicCard } from "@/entities/cs-topic/ui/CsTopicCard";
import { Screen } from "@/shared/ui/Screen";
import { Section } from "@/shared/ui/Section";
import { PAGE_SEO } from "@/shared/config/seo";
import { COMMON_CS_TOPICS } from "@/entities/cs-topic/content";
import { Seo, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/shared/lib/seo";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function CsIndexScreen() {
  return (
    <>
      <Seo
        title={PAGE_SEO.CS_INDEX.title}
        description={PAGE_SEO.CS_INDEX.description}
        path={PAGE_SEO.CS_INDEX.path}
        keywords={[...PAGE_SEO.CS_INDEX.keywords]}
        jsonLd={[
          buildWebPageJsonLd({
            title: PAGE_SEO.CS_INDEX.title,
            description: PAGE_SEO.CS_INDEX.description,
            path: PAGE_SEO.CS_INDEX.path,
          }),
          buildBreadcrumbJsonLd([
            { name: PAGE_SEO.HOME.title, path: PAGE_SEO.HOME.path },
            { name: "공부", path: PAGE_SEO.CS_INDEX.path },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: PAGE_SEO.CS_INDEX.title }} />
      <Screen>
        <Section
          title="공통 CS"
          description="핵심 개념과 실전 질문을 문서로 정리했습니다. 각 카드를 눌러 자세한 내용을 확인하세요."
        >
          <View className="space-y-3">
            {COMMON_CS_TOPICS.map((topic) => (
              <CsTopicCard key={topic.id} topic={topic} />
            ))}
          </View>
        </Section>
      </Screen>
    </>
  );
}
