import { sendHaruhanChatMessage } from "@/api/haruhanChat";
import { useMutation } from "@tanstack/react-query";

export function useHaruhanChat() {
  return useMutation({
    mutationFn: (prompt: string) => sendHaruhanChatMessage(prompt),
  });
}
