import {strictEqual} from "assert"
import { Deck } from "../src/deck"
import type { Card } from "../src/types"

describe("test different decks and draws", function() {
    it('card count', () => {
        let d1 = new Deck(4)
        strictEqual(d1.deck.length, 11)  // 36 - 24 = 12, minus one for final trump
        strictEqual(d1.hands.length, 4)
        strictEqual(d1.hands[0].length, 6)
        strictEqual(d1.hands[3].length, 6)
        strictEqual(d1.hands[2].length, 6)
    })

    it('full deal', () => {
        let d = new Deck(6, 6, 6) // 6 players means 36 cards of a 36 card deck.
        strictEqual(d.deck.length, 0)
        let DealerHand: Card[] = d.hands[d.hands.length - 1]
        strictEqual(DealerHand.length, 6)
        let LastCard: Card = DealerHand[DealerHand.length - 1]
        strictEqual(d.trumpCard, LastCard)
        strictEqual(d.finalTrumpLeft, false)
    })

    it('double deal', () => {
        // this should never happen, but just to test how we handle this
        let d = new Deck(4)
        strictEqual(d.deck.length, 11)
        let nh: Card[][] = d.deal(d.players, d.cardsPerPlayer)
        strictEqual(nh.flat().length, 12)  // 11 in deck + 1 final trump
    })

    it('not enough cards', () => {
        try {
            let d2 = new Deck(10, 10)
        } catch(e) {
            strictEqual(e.__proto__.name, "Error")
        }
    })

    it('final trump test', () => {
        let d = new Deck(1, 10, 18) // 20 cards, 18 drawn, 1 trump set, 1 left
        let ftrump: Card = d.trumpCard
        strictEqual(typeof(d.draw()), 'object') // card drawn, should be a card
        strictEqual(d.draw(), ftrump) // card drawn, will be final trump
        strictEqual(d.draw(), undefined) // card draw attempt, fail
    })
})