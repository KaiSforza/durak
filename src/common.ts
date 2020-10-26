import type * as t from './types'

export function cardCompare(card1: t.Card, card2: t.Card): t.ordering {
    return card1.rank - card2.rank
}

export function cardCompareTrump(card1: t.Card, card2: t.Card, trump: t.Suit = "spades"): t.ordering {
    if (card1.suit == trump && card2.suit != trump) {
        return 1
    } else if (card2.suit == trump && card1.suit != trump) {
        return -1
    } else return cardCompare(card1, card2)
}
