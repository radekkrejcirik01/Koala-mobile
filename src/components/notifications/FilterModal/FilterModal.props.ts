export interface FilterModalProps {
    isFiltered: boolean;
    onFriendPress: (userId: number, name: string) => void;
    onClearFilter: () => void;
}
