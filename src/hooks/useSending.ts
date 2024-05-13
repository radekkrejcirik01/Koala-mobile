import { useState } from 'react';

export const useSending = (): {
    sending: boolean;
    sent: boolean;
    setSending: (value: boolean) => void;
    setSent: (value: boolean) => void;
} => {
    const [sending, setSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);

    return { sending, sent, setSending, setSent };
};
