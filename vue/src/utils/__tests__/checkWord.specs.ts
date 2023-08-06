import { checkWord } from '../checkWord';

describe('checkWord', () => {
    it('should return the correct result for a matching guess', () => {
        const guess = 'banana';
        const hidden = 'banana';
        const guessArr = guess.split('');
        const expectedResult = [
            'success',
            'success',
            'success',
            'success',
            'success',
            'success',
        ];

        expect(checkWord(guessArr, hidden)).toEqual(expectedResult);
    });
    it('should return all fails result for when no letters are included', () => {
        const guess = 'expse';
        const hidden = 'tilim';
        const guessArr = guess.split('');
        const expectedResult = ['fail', 'fail', 'fail', 'fail', 'fail'];

        expect(checkWord(guessArr, hidden)).toEqual(expectedResult);
    });
    it('should return  fails for a letter that is already in the place', () => {
        const guess = 'audio';
        const hidden = 'potro';
        const guessArr = guess.split('');
        const expectedResult = ['fail', 'fail', 'fail', 'fail', 'success'];

        expect(checkWord(guessArr, hidden)).toEqual(expectedResult);
    });
    it('should return notInPlace for a letter that is not in the place', () => {
        const guess = 'audio';
        const hidden = 'potre';
        const guessArr = guess.split('');
        const expectedResult = ['fail', 'fail', 'fail', 'fail', 'notInPlace'];

        expect(checkWord(guessArr, hidden)).toEqual(expectedResult);
    });
});
