export function filterSelected(selected: number[], id: number): number[] {
    const array: number[] = selected;

    if (selected.includes(id)) {
        return array.filter((value) => value !== id);
    }

    array.push(id);
    return array;
}
