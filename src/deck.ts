import type * as t from './types'

/**
 * Sets up the deck for the players
 *
 * @param players - the number of players in the game
 * @param startingCard - what rank of card to start the deck from. default: 6
 * @param cardsPerPlayer - number of cards for each player. default: 6
 */
export class Deck {
    readonly players: number
    readonly startingCard: t.Rank
    readonly cardsPerPlayer: number


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
        this.players = players
        this.startingCard = startingCard
        this.cardsPerPlayer = cardsPerPlayer

        let totalDealtCards: number = cardsPerPlayer * players
        let totalCards: number = 4 * (13 - (startingCard - 2))
        if (totalCards < totalDealtCards) {
            throw new Error("Not enough cards: decrease players, increase total cards, or lower cards per player.")
        }

        this.deck = this.createDeck(startingCard)
        this.hands = this.deal(players, cardsPerPlayer)
        let tc: t.MaybeCard = this.draw()
        if (tc !== undefined) {
            this.trumpCard = tc
            this.finalTrumpLeft = true
        } else {
            // If we have, say, 6 players in a normal deck, the final dealt card is dealt
            // this will be the dealers last card.
            let dealerHand = this.hands[players - 1]
            this.trumpCard = dealerHand[dealerHand.length - 1]
            this.finalTrumpLeft = false
        }
        this.trump = this.trumpCard.suit
        this.drawBelow = cardsPerPlayer

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

    deal(players: number, cardsPerPlayer: number): t.Card[][] {
        let cards: t.Card[][] = []
        let drawncard: t.MaybeCard
        for (let p = 0; p < players; p++) {
            cards.push([])
        }
        for(let c = 0; c < cardsPerPlayer; c++) {
            for (let p = 0; p < players; p++) {
                let curc: t.MaybeCard = this.draw()
                if (curc !== undefined) {
                    cards[p].push(curc)
                }
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
        } else return undefined
    }
}

export const deal = (deck: t.Card[], players: number, cardsPerPlayer: number) => {
    undefined
}

export const createDeck = (startingCard: t.Rank): t.Card[] => {
    let c: t.Card[] = []

    let suits: t.Suit[] = ["spades", "clubs", "hearts", "diamonds"]
    for (let r = startingCard; r <= 14; r++) {
        for (let s of suits) {
            c.push({rank: r, suit: s})
        }
    }
    return c
}