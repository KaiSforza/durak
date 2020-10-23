type Suit = "spades" | "hearts" | "diamonds" | "clubs"

type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14

type ordering = number
            // GT | EQ| LT

interface Card {
    rank: Rank
    suit: Suit
}

function cardCompare(card1: Card, card2: Card): ordering {
    return card1.rank - card2.rank
}

function cardCompareTrump(card1: Card, card2: Card, trump: Suit = "spades"): ordering {
    if (card1.suit == trump) {
        return 1
    } else if (card2.suit == trump) {
        return -1
    } else return cardCompare(card1, card2)
}


class Deck {
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
        this.deck = this.createDeck(startingCard)
        this.hands = this.deal(players, cardsPerPlayer)
        this.trumpCard = this.finalDraw()
        this.trump = this.trumpCard.suit
        this.drawBelow = cardsPerPlayer
        this.finalTrumpLeft = true
    }

    createDeck(startingCard: Rank): Card[] {
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

    random(end: number): number {
        return Math.floor(Math.random() * end)
    }

    draw(): Card | undefined {
        if (this.deck.length > 0) {
            return this.deck.splice(this.random(this.deck.length), 1)[0]
        } else if (this.finalTrumpLeft) {
            this.finalTrumpLeft = false
            return this.trumpCard
        } else return undefined
    }

    deal(players: number, cardsPerPlayer: number): Card[][] {
        let cards: Card[][] = []
        let drawncard: Card | undefined
        for(let c = 0; c < cardsPerPlayer; c++) {
            for (let p = 0; p < players; p++) {
                cards.push([])
                drawncard = this.draw()
                if (drawncard) {
                    cards[p].push(drawncard)
                }
            }
        }
        this.hands = cards
        return cards
    }

    finalDraw(): Card {
        let c: Card = this.draw()
        this.trumpCard = c
        return c
    }
}

let newdeck = new Deck(4)
console.log(newdeck.deck)
console.log(newdeck.hands)
console.log(newdeck.trumpCard)
console.log(`Total Cards: ${newdeck.deck.length + newdeck.hands.length * 6 + 1}`)