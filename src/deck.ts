export type Suit = "spades" | "hearts" | "diamonds" | "clubs"

export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14

export type ordering = number

export interface Card {
    rank: Rank
    suit: Suit
}

type MaybeCard = Card | null

export function cardCompare(card1: Card, card2: Card): ordering {
    return card1.rank - card2.rank
}

export function cardCompareTrump(card1: Card, card2: Card, trump: Suit = "spades"): ordering {
    if (card1.suit == trump && card2.suit != trump) {
        return 1
    } else if (card2.suit == trump && card1.suit != trump) {
        return -1
    } else return cardCompare(card1, card2)
}


export class Deck {
    deck: Card[]
    hands: Card[][]
    trumpCard: Card
    trump: Suit
    drawBelow: number
    finalTrumpLeft: boolean

    constructor(players: number, startingCard: Rank = 6, cardsPerPlayer: number = 6) {
        // * add all of the cards from the deck
        // * give each player 6 random cards
        // * pull random remaining card for trump
        let totalDealtCards: number = cardsPerPlayer * players
        let totalCards: number = 4 * (13 - (startingCard - 2))
        if (totalCards < (totalDealtCards + 1)) {
            throw new Error("Not enough cards: decrease players, increase total cards, or lower cards per player.")
        }
        this.deck = this.createDeck(startingCard)
        this.hands = this.deal(players, cardsPerPlayer)
        this.trumpCard = this.draw() as Card  // this should never be undefined, but...
        this.trump = this.trumpCard.suit
        this.drawBelow = cardsPerPlayer
        this.finalTrumpLeft = true
    }

    private createDeck(startingCard: Rank): Card[] {
        let c: Card[] = []

        let suits: Suit[] = ["spades", "clubs", "hearts", "diamonds"]
        for (let r = startingCard; r <= 14; r++) {
            for (let s of suits) {
                c.push({rank: r, suit: s})
            }
        }
        this.deck = c
        return this.deck
    }

    private deal(players: number, cardsPerPlayer: number): Card[][] {
        let cards: Card[][] = []
        let drawncard: MaybeCard
        for (let p = 0; p < players; p++) {
            cards.push([])
        }
        for(let c = 0; c < cardsPerPlayer; c++) {
            for (let p = 0; p < players; p++) {
                cards[p].push(this.draw() as Card)
            }
        }
        this.hands = cards
        return cards
    }

    private random(end: number): number {
        return Math.floor(Math.random() * end)
    }

    draw(): MaybeCard {
        if (this.deck.length > 0) {
            return this.deck.splice(this.random(this.deck.length), 1)[0]
        } else if (this.finalTrumpLeft) {
            this.finalTrumpLeft = false
            return this.trumpCard
        } else return null
    }
}