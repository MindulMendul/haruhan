import { HaruhanChatTurn, sendHaruhanChatMessage } from "@/shared/api/haruhanChat";
import { useMutation } from "@tanstack/react-query";

interface SendHaruhanChatMessageVariables {
  prompt: string;
  history?: HaruhanChatTurn[];
}

export function useHaruhanChat() {
  return useMutation({
    mutationFn: ({ prompt, history }: SendHaruhanChatMessageVariables) => sendHaruhanChatMessage(prompt, history),
  });
}
