import { useCallback, useEffect, useRef } from 'react';
import { LiveService } from '@utils/general/LiveService';

// Typing is sent again at most this often while the user keeps typing
const TYPING_RESEND = 3000;
// Stopped after this long without a text change
const TYPING_IDLE = 3000;

// Tells the friend the user is typing in the chat with them
export const useTypingSender = (friendId: number) => {
  // When typing was last sent, 0 while not typing
  const lastSent = useRef<number>(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const stopTyping = useCallback(() => {
    clearTimeout(idleTimer.current);

    if (lastSent.current) {
      lastSent.current = 0;
      LiveService.sendTyping(friendId, false);
    }
  }, [friendId]);

  const onTyping = useCallback(
    (text: string) => {
      // The field was cleared
      if (!text) {
        stopTyping();
        return;
      }

      const now = Date.now();
      if (now - lastSent.current >= TYPING_RESEND) {
        lastSent.current = now;
        LiveService.sendTyping(friendId, true);
      }

      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(stopTyping, TYPING_IDLE);
    },
    [friendId, stopTyping]
  );

  // Leaving the chat
  useEffect(() => stopTyping, [stopTyping]);

  return { onTyping, stopTyping };
};
