import type * as t from './types'
import { fromCompare, Ord } from 'fp-ts/lib/Ord'

/**
 * @param card1 - the first card
 * @param card2 - the second card
 * @param trump - which suit is trump. Optional
 *
 * @returns Positive if the first card (`card1`) is greater,
 *          negative if the second card (`card2`) is greater,
 *          and `0` if they are equal rank. Any card can that is
 *          not trump can be beaten by any trump card. Trump cards
 *          are compared by subtracting rank, as are any non-trump
 *          cards. If no trump is specified, we just compare cards.
 */
export const cardCompare = (card1: t.Card, card2: t.Card, trump?: t.Suit): t.ordering => {
    if (trump) {
        if (card1.suit == trump && card2.suit != trump) {
            return 1
        } else if (card2.suit == trump && card1.suit != trump) {
            return -1
        }
    }
    return cardOrd.compare(card1, card2)
}

export const cardOrd = fromCompare((a: t.Card, b: t.Card) =>
    a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0
)

export function min<A>(O: Ord<A>): (x: A, y: A) => A {
    return (x, y) => (O.compare(x, y) === 1 ? y : x)
}

export function max<A>(O: Ord<A>): (x: A, y: A) => A {
    return (x, y) => (O.compare(x, y) === 1 ? x : y)
}

