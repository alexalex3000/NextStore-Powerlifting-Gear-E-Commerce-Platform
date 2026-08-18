export const wordTrim = (word: string) => {
    const wordArr = word.trim().split(' ');
    return wordArr.join('')
}