import { Alert, AppModal, Button, Screen, Section, useToast } from "@/components/ui";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function FeedbackDemoScreen() {
  const { toast } = useToast();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Screen>
      <Section title="Toast" description="짧은 팁, 저장 완료, 가벼운 안내에 사용합니다.">
        <View className="gap-2">
          <Button
            onPress={() =>
              toast({
                title: "면접 팁",
                description: "답변은 결론 → 근거 → 실무 경험 순서로 짧게 시작하면 좋아요.",
                variant: "warning",
              })
            }
          >
            팁 Toast 띄우기
          </Button>
          <Button
            variant="outline"
            onPress={() =>
              toast({
                title: "저장 완료",
                description: "설정이 다음 실행에도 유지됩니다.",
                variant: "success",
              })
            }
          >
            성공 Toast 띄우기
          </Button>
        </View>
      </Section>

      <Section title="Alert" description="페이지 안에 남아 있어야 하는 안내/경고에 사용합니다.">
        <View className="gap-3">
          <Alert title="정보" description="공통 CS와 포지션별 질문을 나눠 준비할 수 있어요." variant="info" />
          <Alert title="주의" description="실제 면접 답변은 본인의 경험과 연결해 준비해야 합니다." variant="warning" />
          <Alert title="위험" description="민감정보나 회사 내부 자료를 AI 프롬프트에 그대로 넣지 마세요." variant="destructive" />
        </View>
      </Section>

      <Section title="Modal" description="확인/취소가 필요한 작업이나 큰 안내에 사용합니다.">
        <Button onPress={() => setModalVisible(true)}>Modal 열기</Button>
      </Section>

      <AppModal
        visible={modalVisible}
        title="Modal 예시"
        description="사용자 확인이 필요한 흐름에서 사용할 수 있는 공통 모달입니다."
        onClose={() => setModalVisible(false)}
        footer={
          <>
            <Button variant="outline" className="flex-1" onPress={() => setModalVisible(false)}>
              취소
            </Button>
            <Button className="flex-1" onPress={() => setModalVisible(false)}>
              확인
            </Button>
          </>
        }
      >
        <Text className="text-sm leading-6 text-ink-600 dark:text-ink-300">
          지금은 데모 페이지지만, 이후 북마크 삭제/설정 초기화 같은 기능에 바로 붙일 수 있습니다.
        </Text>
      </AppModal>
    </Screen>
  );
}

