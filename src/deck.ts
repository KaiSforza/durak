import type * as t from './types'

export class Deck {
    /**
     * Sets up the deck for the players
     *
     * @param players - the number of players in the game
     * @param startingCard - what rank of card to start the deck from. default: 6
     * @param cardsPerPlayer - number of cards for each player. default: 6
     */
    deck: t.Card[]
    hands: t.Card[][]
    trumpCard: t.Card
    trump: t.Suit
    drawBelow: number
    finalTrumpLeft: boolean

    constructor(players: number, startingCard: t.Rank = 6, cardsPerPlayer: number = 6) {
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
        this.trumpCard = this.draw() as t.Card  // this should never be undefined, but...
        this.trump = this.trumpCard.suit
        this.drawBelow = cardsPerPlayer
        this.finalTrumpLeft = true
    }

    private createDeck(startingCard: t.Rank): t.Card[] {
        let c: t.Card[] = []

        let suits: t.Suit[] = ["spades", "clubs", "hearts", "diamonds"]
        for (let r = startingCard; r <= 14; r++) {
            for (let s of suits) {
                c.push({rank: r, suit: s})
            }
        }
        this.deck = c
        return this.deck
    }

    private deal(players: number, cardsPerPlayer: number): t.Card[][] {
        let cards: t.Card[][] = []
        let drawncard: t.MaybeCard
        for (let p = 0; p < players; p++) {
            cards.push([])
        }
        for(let c = 0; c < cardsPerPlayer; c++) {
            for (let p = 0; p < players; p++) {
                cards[p].push(this.draw() as t.Card)
            }
        }
        this.hands = cards
        return cards
    }

    private random(end: number): number {
        return Math.floor(Math.random() * end)
    }

    draw(): t.MaybeCard {
        if (this.deck.length > 0) {
            return this.deck.splice(this.random(this.deck.length), 1)[0]
        } else if (this.finalTrumpLeft) {
            this.finalTrumpLeft = false
            return this.trumpCard
        } else return null
    }
}