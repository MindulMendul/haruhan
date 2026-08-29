import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import React from "react";
import { View } from "react-native";
import { Text } from "./text";

const meta = {
  title: "UI/Text",
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="p">본문 텍스트입니다.</Text>
      <Text variant="muted">부가 설명(muted)</Text>
      <Text variant="lead">리드 문단</Text>
    </View>
  ),
};
