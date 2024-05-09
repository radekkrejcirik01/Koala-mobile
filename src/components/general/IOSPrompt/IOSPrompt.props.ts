export interface IOSPromptProps {
    title: string;
    onPressOK: (text: string) => void;
    onClose: () => void;
}
