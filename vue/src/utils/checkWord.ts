export const checkWord = function (
    guess: string[],
    hiddenWord: string
): string[] {
    const hiddenWordArray = hiddenWord.split('');
    const result = guess.map((letter, index) => {
        console.log(letter);
        if (hiddenWordArray[index] === letter) {
            return 'success';
        } else if (!hiddenWordArray.includes(letter)) {
            console.log(letter, 'FAILL');
            return 'fail';
        } else {
            return 'notInPlace';
        }
    });

    return result;
};
