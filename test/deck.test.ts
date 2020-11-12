import {strictEqual} from "assert"
import { Deck } from "../src/deck"
import type { Card } from "../src/types"

suite("test different decks and draws", function() {
    test('card count', () => {
        const d1 = new Deck(4)
        strictEqual(d1.deck.length, 11)  // 36 - 24 = 12, minus one for final trump
        strictEqual(d1.hands.length, 4)
        strictEqual(d1.hands[0].length, 6)
        strictEqual(d1.hands[3].length, 6)
        strictEqual(d1.hands[2].length, 6)
    })

    test('full deal', () => {
        const d = new Deck(6, 6, 6) // 6 players means 36 cards of a 36 card deck.
        strictEqual(d.deck.length, 0)
        const DealerHand: Card[] = d.hands[d.hands.length - 1]
        strictEqual(DealerHand.length, 6)
        const LastCard: Card = DealerHand[DealerHand.length - 1]
        strictEqual(d.trumpCard, LastCard)
        strictEqual(d.finalTrumpLeft, false)
    })

    test('double deal', () => {
        // this should never happen, but just to test how we handle this
        const d = new Deck(4)
        strictEqual(d.deck.length, 11)
        const nh: Card[][] = d.deal(d.players, d.cardsPerPlayer)
        strictEqual(nh.flat().length, 12)  // 11 in deck + 1 final trump
    })

    test('not enough cards', () => {
        try {
            new Deck(10, 10)
        } catch(e) {
            strictEqual(e.__proto__.name, "Error")
        }
    })

    test('final trump test', () => {
        const d = new Deck(1, 10, 18) // 20 cards, 18 drawn, 1 trump set, 1 left
        const ftrump: Card = d.trumpCard
        strictEqual(typeof(d.draw()), 'object') // card drawn, should be a card
        strictEqual(d.draw(), ftrump) // card drawn, will be final trump
        strictEqual(d.draw(), undefined) // card draw attempt, fail
    })
})