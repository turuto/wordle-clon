export const checkWord = function (
    guess: string[],
    hiddenWord: string
): string[] {
    const hiddenWordArray = hiddenWord.split('');
    const result = guess.map((letter, index) => {
        if (hiddenWordArray[index] === letter) {
            return 'success';
        } else if (!hiddenWordArray.includes(letter)) {
            return 'fail';
        } else {
            // the letter is not in the place but present
            // but we need to mark it as notInPlace only
            // if there are more (not counting the ones marked as success)
            const ocurrencesInHiddenWord = hiddenWordArray.filter(
                (item) => item === letter
            ).length;
            const ocurrencesInGuess = guess.filter(
                (item) => item === letter
            ).length;
            if (ocurrencesInGuess === ocurrencesInHiddenWord) {
                return 'notInPlace';
            } else {
                return 'fail';
            }
        }
    });
    // console.log('HIDDEN', hiddenWordArray);
    // console.log('GUESS: ', guess);
    // console.log(result);
    return result;
};
