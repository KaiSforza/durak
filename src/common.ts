import type * as t from './types'
/**
 * Some common functions we can use for working with cards.
 */

export function cardCompare(card1: t.Card, card2: t.Card): t.ordering {
    /**
     * @param card1 - the first card
     * @param card2 - the second card
     *
     * @returns Positive if the first card (`card1`) is greater,
     *          negative if the second card (`card2`) is greater,
     *          and `0` if they are equal rank.
     */
    return card1.rank - card2.rank
}

export function cardCompareTrump(card1: t.Card, card2: t.Card, trump: t.Suit = "spades"): t.ordering {
    /**
     * @param card1 - the first card
     * @param card2 - the second card
     * @param trump - which suit is trump. Default: `"spades"`
     *
     * @returns Positive if the first card (`card1`) is greater,
     *          negative if the second card (`card2`) is greater,
     *          and `0` if they are equal rank. Any card can that is
     *          not trump can be beaten by any trump card. Trump cards
     *          are compared with cardCompare, as are any non-trump cards.
     */
    if (card1.suit == trump && card2.suit != trump) {
        return 1
    } else if (card2.suit == trump && card1.suit != trump) {
        return -1
    } else return cardCompare(card1, card2)
}
