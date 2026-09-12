export function getFirstLetters(string: string) {
    const words = string.trim()
        .split("")
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("");
    return words;
}