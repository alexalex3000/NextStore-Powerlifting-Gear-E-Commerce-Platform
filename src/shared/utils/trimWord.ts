export const trimWord = (word: string) => {
    const wordArr = word.trim().split(' ');
    return wordArr.join('').toLowerCase();
}