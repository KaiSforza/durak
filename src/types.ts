export type Suit = "spades" | "hearts" | "diamonds" | "clubs"

export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14

export type ordering = number

export interface Card {
    rank: Rank
    suit: Suit
}

export type MaybeCard = Card | null
