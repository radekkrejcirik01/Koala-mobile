export function getGreeting(): string {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 0 && hours < 12) {
        return 'Good morning';
    }
    if (hours >= 12 && hours < 18) {
        return 'Good afternoon';
    }
    return 'Good evening';
}
