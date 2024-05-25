export function getGreeting(): string {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 0 && hours < 6) {
        return 'Good early morning';
    }
    if (hours >= 6 && hours < 12) {
        return 'Good morning';
    }
    if (hours >= 12 && hours < 18) {
        return 'Good afternoon';
    }
    if (hours >= 18 && hours < 21) {
        return 'Good evening';
    }
    return 'Good night';
}
