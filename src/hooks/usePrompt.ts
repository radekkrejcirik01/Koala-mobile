import { useCallback, useState } from 'react';

export const usePrompt = (
  defaultVisibility?: boolean
): {
  promptVisible: boolean;
  showPrompt: () => void;
  hidePrompt: () => void;
} => {
  const [promptVisible, setPromptVisible] = useState<boolean>(
    defaultVisibility || false
  );

  const showPrompt = useCallback(() => {
    setPromptVisible(true);
  }, []);

  const hidePrompt = useCallback(() => {
    setPromptVisible(false);
  }, []);

  return { promptVisible, showPrompt, hidePrompt };
};
