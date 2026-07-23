import { ensureGuestAccessToken } from "@/api/guestAuth";
import { useEffect } from "react";

export function GuestAuthBootstrap() {
  useEffect(() => {
    ensureGuestAccessToken().catch(() => {
      // 실패해도 앱 진입을 막지 않는다. 토큰이 필요한 화면에서 다시 시도한다.
    });
  }, []);

  return null;
}
