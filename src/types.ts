/**
 * Card suits. The basic french cards.
 */
export type Suit = "spades" | "hearts" | "diamonds" | "clubs"

/**
 * The various card ranks. 2-10 are number cards, 11-13 are the Jack,
 * King, and Queen, 14 is the Ace.
 */
export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14

/**
 * A card.
 * @param Rank - the card number or face (2-14)
 * @param Suit - the card suit
 */
export type Card = {
    readonly rank: Rank
    readonly suit: Suit
}

// Convenience types
export type MaybeCard = Card | null

export type ordering = number
