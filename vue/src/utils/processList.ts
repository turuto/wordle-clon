export const processList = function (rawList: string) {
    const tempWords = [...rawList.split(/\r?\n/)]; // array from line breaks
    // remove Diacritics
    const normalizedWords = tempWords.map(word =>
        word.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    );

    return [... new Set(normalizedWords)]; // get unique values
}