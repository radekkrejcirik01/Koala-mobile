export interface PromptProps {
    isVisible: boolean;
    title: string;
    onPressOk: (text: string) => void;
    onClose: () => void;
}
