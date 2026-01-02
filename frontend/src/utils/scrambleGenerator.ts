const MOVES = ['R', 'L', 'U', 'D', 'F', 'B'] as const;
const MODIFIERS = ['', "'", '2'] as const;

type Move = typeof MOVES[number];

const OPPOSITES: Record<Move, Move> = {
    'R': 'L',
    'L': 'R',
    'U': 'D',
    'D': 'U',
    'F': 'B',
    'B': 'F'
};

const isOpposite = (move1: Move, move2: Move): boolean => {
    return OPPOSITES[move1] === move2;
};

export const generateScramble = (length: number = 20): string => {
    const scramble: string[] = [];
    let lastMove: Move | '' = '';
    let secondLastMove: Move | '' = '';

    for (let i = 0; i < length; i++) {
        let move: Move;
        do {
            move = MOVES[Math.floor(Math.random() * MOVES.length)];
        } while (
            move === lastMove ||
            (secondLastMove && lastMove && move === secondLastMove && isOpposite(move, lastMove))
            );

        const modifier = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
        scramble.push(move + modifier);

        secondLastMove = lastMove;
        lastMove = move;
    }

    return scramble.join(' ');
};