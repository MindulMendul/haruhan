import { Badge, Card, Screen, Section } from "@/components/ui";
import { PAGE_SEO } from "@/constants/seo";
import { Seo, buildWebPageJsonLd } from "@/lib/seo";
import React from "react";
import { Text, View } from "react-native";

const PRIVACY_ITEMS = [
  {
    title: "수집하는 개인정보",
    body: [
      "하루한은 회원가입, 로그인, 결제, 위치 정보, 연락처, 사진, 마이크, 카메라 접근 기능을 제공하지 않습니다.",
      "앱 사용자가 이름, 이메일, 전화번호 등 개인을 직접 식별할 수 있는 정보를 입력하도록 요구하지 않습니다.",
    ],
  },
  {
    title: "기기에 저장되는 정보",
    body: [
      "사용자가 선택한 테마 설정은 다음 실행 시에도 유지되도록 사용자의 기기에만 저장됩니다.",
      "이 정보는 앱 표시 방식을 유지하기 위한 용도로만 사용되며 외부 서버로 전송하지 않습니다.",
    ],
  },
  {
    title: "서비스 운영 과정의 기술 정보",
    body: [
      "웹 버전은 서비스 안정성 확인을 위해 호스팅 사업자 또는 웹 분석 도구를 통해 접속 로그, 브라우저 정보, 기기 정보와 같은 기술 정보가 처리될 수 있습니다.",
      "이 정보는 서비스 품질 개선, 오류 분석, 보안 유지 목적으로만 사용됩니다.",
    ],
  },
  {
    title: "제3자 제공",
    body: ["하루한은 사용자의 개인정보를 판매하거나 제3자에게 제공하지 않습니다."],
  },
  {
    title: "아동의 개인정보",
    body: ["하루한은 만 13세 미만 아동을 대상으로 하지 않으며, 아동의 개인정보를 의도적으로 수집하지 않습니다."],
  },
  {
    title: "문의",
    body: ["개인정보 처리와 관련한 문의는 pencake33@naver.com 으로 연락해 주세요."],
  },
];

export default function PrivacyScreen() {
  return (
    <>
      <Seo
        title={PAGE_SEO.PRIVACY.title}
        description={PAGE_SEO.PRIVACY.description}
        path={PAGE_SEO.PRIVACY.path}
        jsonLd={buildWebPageJsonLd({
          title: PAGE_SEO.PRIVACY.title,
          description: PAGE_SEO.PRIVACY.description,
          path: PAGE_SEO.PRIVACY.path,
        })}
      />
      <Screen>
        <Card tone="inverted">
          <Badge variant="inverse">
            PRIVACY
          </Badge>
          <Text className="mt-5 text-[30px] font-extrabold leading-9 text-white">개인정보처리방침</Text>
          <Text className="mt-2 text-sm leading-6 text-ink-200 dark:text-ink-300">
            하루한은 개발자 면접 준비를 위한 개인 학습용 앱이며, 필요한 범위 안에서만 정보를 처리합니다.
          </Text>
        </Card>

        <Section title="기본 방침" description="시행일: 2026년 6월 6일">
          <Text className="text-sm leading-6 text-ink-600 dark:text-ink-200">
            하루한은 공통 CS 개념과 포지션별 면접 질문을 확인할 수 있는 학습 도구입니다. 본 방침은 하루한 앱과 웹 서비스에서
            개인정보와 관련 정보가 어떻게 처리되는지 설명합니다.
          </Text>
        </Section>

        {PRIVACY_ITEMS.map((item) => (
          <Section key={item.title} title={item.title}>
            <View className="gap-2">
              {item.body.map((paragraph) => (
                <Text key={paragraph} className="text-sm leading-6 text-ink-600 dark:text-ink-200">
                  {paragraph}
                </Text>
              ))}
            </View>
          </Section>
        ))}
      </Screen>
    </>
  );
}
