export const GAME_CONFIG = {
    NUM_LETTERS: 5,
    NUM_ROUNDS: 6,
};

export const SPECIAL_LABELS = {
    ENTER: 'Enter',
    DELETE: 'Backspace',
};

export const KEYBOARD_CONFIG = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
    [
        SPECIAL_LABELS.ENTER,
        'z',
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
        SPECIAL_LABELS.DELETE,
    ],
];

export const MESSAGES = [
    'INSANE',
    'INCREDIBLE',
    'AMAZING',
    'WELL DONE',
    'NOT BAD',
    'NEARLY',
];
export const STATUSES = {
    fail: 'fail',
    notInPlace: 'notInPlace',
    success: 'success',
};
